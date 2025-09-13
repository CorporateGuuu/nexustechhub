# 🚀 Setup Netlify Environment Variables for Nexus TechHub

## Step 1: Get Your Stripe Webhook Secret

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter endpoint URL: `https://nexustechhub.netlify.app/api/stripe/webhook`
4. Select these events:
   - checkout.session.completed
   - checkout.session.expired
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - charge.succeeded
   - charge.failed
   - refund.created
   - customer.created
   - invoice.payment_succeeded
   - invoice.payment_failed
5. Click "Add endpoint"
6. Copy the webhook signing secret (starts with `whsec_`)

## Step 2: Add Environment Variables to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Navigate to: Sites → nexustechhub → Site settings → Environment variables
3. Click "Add variable" for each of the following:

### Required Variables (Copy from Scripts/netlify-env-vars.txt):

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[YOUR_STRIPE_PUBLISHABLE_KEY]
STRIPE_SECRET_KEY=***
STRIPE_WEBHOOK_SECRET=[PASTE_YOUR_WEBHOOK_SECRET_HERE]
NEXTAUTH_SECRET=[YOUR_NEXTAUTH_SECRET]
NEXTAUTH_URL=https://nexustechhub.netlify.app
BUSINESS_NAME=Nexus Tech Hub
BUSINESS_EMAIL=admin@nexustechhub.ae
BUSINESS_PHONE=+971585531029
BUSINESS_WHATSAPP=https://wa.me/971585531029
BUSINESS_CURRENCY=AED
BUSINESS_COUNTRY=AE
NEXT_PUBLIC_VAPID_PUBLIC_KEY=[YOUR_VAPID_PUBLIC_KEY]
VAPID_PRIVATE_KEY=[YOUR_VAPID_PRIVATE_KEY]
VAPID_SUBJECT=mailto:admin@nexustechhub.ae
```

## Step 3: Trigger New Deployment

1. Go to Deploys tab in Netlify
2. Click "Trigger deploy" → "Deploy site"
3. Wait 3-5 minutes for deployment to complete

## Step 4: Verify Setup

After deployment, run the test script:

```bash
node Scripts/test-webhook-endpoint.js
```

Expected results:
- ✅ Webhook endpoint accessible
- ✅ Signature verification working
- ✅ Event processing functional

## Troubleshooting

If tests still fail:
1. Check Netlify deploy logs for errors
2. Verify STRIPE_WEBHOOK_SECRET is correct
3. Ensure all variables are added without extra spaces
4. Clear Netlify cache and redeploy if needed
