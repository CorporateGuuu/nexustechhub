import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductPage from '../../pages/products/[slug]';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { slug: 'iphone-13-screen-replacement' },
    push: jest.fn(),
    pathname: '/products/iphone-13-screen-replacement',
  }),
}));

// Mock product data
const mockProduct = {
  id: 1,
  name: 'iPhone 13 Screen Replacement',
  price: 89.99,
  description: 'High-quality replacement screen for iPhone 13',
  image_url: '/images/products/iphone-13-screen.jpg',
  slug: 'iphone-13-screen-replacement',
  category_id: 1,
  stock_quantity: 15,
  sku: 'IPH13-SCR-001',
  discount_percentage: 0,
  is_featured: true,
  is_new: false,
  categories: { name: 'iPhone Parts', slug: 'iphone-parts' },
  product_images: [
    { image_url: '/images/products/iphone-13-screen.jpg', is_primary: true, display_order: 1 }
  ],
  product_specifications: [{
    screen_size: '6.1 inches',
    resolution: '2532 x 1170',
    technology: 'Super Retina XDR OLED'
  }],
  reviews: [
    { id: 1, rating: 5, title: 'Great product', comment: 'Works perfectly', created_at: '2024-01-01' },
    { id: 2, rating: 4, title: 'Good quality', comment: 'Satisfied with purchase', created_at: '2024-01-02' }
  ]
};

// Mock Supabase
jest.mock('../../lib/db', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: mockProduct, error: null }))
        }))
      }))
    }))
  }
}));

describe('Product Page', () => {
  beforeEach(() => {
    // Mock fetch for API calls
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );
  });

  it('renders product details correctly', async () => {
    render(<ProductPage />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: mockProduct.name })).toBeInTheDocument();
    });

    // Check if product details are rendered
    expect(screen.getByText('AED 89.99')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText('✅ In Stock (15 available)')).toBeInTheDocument();

    // Check if product image is rendered
    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining(mockProduct.image_url));
  });

  it('allows changing quantity and adding to cart', async () => {
    // Mock alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const user = userEvent.setup();
    render(<ProductPage />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: mockProduct.name })).toBeInTheDocument();
    });

    // Find quantity buttons and add to cart button
    const increaseButton = screen.getByText('+');
    const addToCartButton = screen.getByText('Add to Cart');

    // Increase quantity
    await user.click(increaseButton);

    // Click add to cart button
    await user.click(addToCartButton);

    // Check if alert was called
    expect(alertMock).toHaveBeenCalledWith('Added 2 iPhone 13 Screen Replacement(s) to cart');

    alertMock.mockRestore();
  });

  it('shows related products section', async () => {
    render(<ProductPage />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: mockProduct.name })).toBeInTheDocument();
    });

    // Check if related products section is rendered
    expect(screen.getByText('Related Products')).toBeInTheDocument();
    expect(screen.getByText('Check out similar products in the iPhone Parts category')).toBeInTheDocument();
  });
});
