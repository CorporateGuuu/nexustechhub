# Nexus Tech Hub - Authentication & Payment Setup Guide

This guide covers the complete setup for user authentication and Stripe payment processing in the Nexus Tech Hub e-commerce platform.

## 🚀 Quick Start

### Prerequisites

```

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org)
- [Stripe Documentation](https://stripe.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [SendGrid Documentation](https://sendgrid.com/docs)

## 🤝 Support

For issues with authentication or payments:
1. Check the troubleshooting section above
2. Review Stripe and Supabase documentation
3. Contact the development team
- Node.js 18+ installed
- Supabase account and project
- Stripe account (for payments)

### 1. Install Dependencies
```bash
cd nexus-techhub-fresh
npm install next-auth @auth/prisma-adapter stripe
```

### 2. Environment Configuration

Update your `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3005
NEXTAUTH_SECRET=your_nextauth_secret_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration (Optional)
SENDGRID_API_KEY=SG.your_sendgrid_api_key
```

## 🔐 Authentication Setup

### NextAuth.js Configuration

The authentication system uses NextAuth.js with Supabase as the provider. Key features:

- **User Registration & Login**: Complete signup/signin flow
- **Session Management**: JWT-based sessions with role-based access
- **Guest Checkout**: Support for unauthenticated users
- **Profile Management**: User profile updates and management

### Database Schema

The authentication system requires these tables in Supabase:

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User addresses (for shipping/billing)
CREATE TABLE user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('shipping', 'billing')),
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  phone TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  session_id TEXT, -- For guest orders
  stripe_session_id TEXT UNIQUE,
  order_number TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  shipping_address JSONB,
  billing_address JSONB,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  product_data JSONB, -- Snapshot of product data at time of order
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Authentication Flow

1. **Registration**: Users create accounts via `/auth/signup`
2. **Login**: Users authenticate via `/auth/signin`
3. **Session**: JWT tokens manage user sessions
4. **Guest Access**: Unauthenticated users can browse and add to cart
5. **Checkout**: Authentication required for checkout

### User Roles

- **User**: Standard customer access
- **Admin**: Full access to admin panel (future feature)

## 💳 Stripe Payment Setup

### Stripe Configuration

1. **Create Stripe Account**: Sign up at [stripe.com](https://stripe.com)
2. **Get API Keys**:
   - Test Publishable Key: `pk_test_...`
   - Test Secret Key: `sk_test_...`
3. **Configure Webhooks** (for production):
   - Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`

### Payment Flow

1. **Cart Review**: Users review items in cart
2. **Authentication**: Login required for checkout
3. **Order Creation**: Stripe checkout session created
4. **Payment Processing**: Secure Stripe-hosted checkout
5. **Order Confirmation**: Success/cancel pages
6. **Webhook Processing**: Order status updates

### Checkout Features

- **Secure Checkout**: PCI-compliant Stripe Checkout
- **Multiple Currencies**: USD, EUR, GBP support
- **Tax Calculation**: Automatic tax calculation
- **Shipping Options**: Configurable shipping rates
- **Discount Codes**: Promotion code support
- **Address Collection**: Shipping and billing addresses

### Webhook Handling

Create `/pages/api/webhooks/stripe.js`:

```javascript
import { buffer } from 'micro';
import { stripe } from '../../../lib/stripe';
import { supabase } from '../../../lib/supabase';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;

        // Update order status in database
        await supabase
          .from('orders')
          .update({
            status: 'processing',
            payment_status: 'paid',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_session_id', session.id);

        // Send confirmation email
        // await sendOrderConfirmation(session.customer_email, session.id);

        break;

      case 'payment_intent.payment_failed':
        // Handle failed payments
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}
```

## 📧 Email Configuration (Optional)

### SendGrid Setup

1. **Create SendGrid Account**: Sign up at [sendgrid.com](https://sendgrid.com)
2. **Generate API Key**: Create an API key with full access
3. **Verify Domain**: Set up domain authentication for production

### Email Templates

The system supports automated emails for:
- Order confirmations
- Shipping notifications
- Password resets
- Account verification

## 🔧 Development Setup

### Running the Application

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run database migrations
# (Run the SQL files in database/ directory in Supabase)

# Start development server
npm run dev
```

### Testing Payments

Use Stripe test cards for development:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Require Authentication**: `4000 0025 0000 3155`

## 🚀 Production Deployment

### Environment Variables

For production, update these variables:
```env
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Security Considerations

1. **HTTPS Required**: Stripe requires HTTPS in production
2. **Webhook Verification**: Always verify webhook signatures
3. **API Key Security**: Never expose secret keys in client-side code
4. **Rate Limiting**: Implement rate limiting on API endpoints
5. **Input Validation**: Validate all user inputs server-side

### Monitoring & Analytics

- **Stripe Dashboard**: Monitor payments and transactions
- **Supabase Logs**: Monitor database queries and errors
- **NextAuth Logs**: Monitor authentication events
- **Error Tracking**: Implement error tracking (Sentry, etc.)

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Errors**:
   - Check Supabase configuration
   - Verify JWT secrets match
   - Ensure database tables exist

2. **Payment Errors**:
   - Verify Stripe keys are correct
   - Check webhook endpoints
   - Ensure HTTPS in production

3. **Cart Issues**:
   - Check localStorage for cart_session_id
   - Verify Supabase connection
   - Check cart table permissions

### Debug Mode

Enable debug logging:
```env
NEXTAUTH_DEBUG=true
STRIPE_DEBUG=true
---

**Note**: This setup provides a complete e-commerce authentication and payment system. Always test thoroughly in development before deploying to production.
