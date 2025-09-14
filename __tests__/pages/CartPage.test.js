// Mock fetch before importing the component
const mockFetch = jest.fn();
global.fetch = mockFetch;

import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../../pages/cart';

// Mock cart items
const mockCartItems = [
  {
    id: 1,
    name: 'iPhone 13 Screen Replacement',
    price: 89.99,
    quantity: 2,
    image_url: '/images/products/iphone-13-screen.jpg',
    slug: 'iphone-13-screen',
    total: 179.98
  },
  {
    id: 2,
    name: 'iPhone 13 Battery',
    price: 49.99,
    quantity: 1,
    image_url: '/images/products/iphone-13-battery.jpg',
    slug: 'iphone-13-battery',
    total: 49.99
  },
];

// Mock getServerSideProps
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/cart',
  }),
}));

// Mock Layout component
jest.mock('../../components/Layout/Layout', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="layout">{children}</div>,
}));

describe('Cart Page', () => {
  beforeEach(() => {
    // Reset mocks
    mockFetch.mockClear();

    // Mock fetch for API calls - return cart data as a Promise
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        cart: {
          items: mockCartItems,
          item_count: mockCartItems.length,
          subtotal: mockCartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
        }
      }),
    });
  });

  it('renders cart items correctly', async () => {
    await act(async () => {
      render(<Cart />);
    });

    // Wait for cart data to load
    await waitFor(() => {
      expect(screen.getByText('iPhone 13 Screen Replacement')).toBeInTheDocument();
    }, { timeout: 5000 });

    // Check if cart items are rendered
    expect(screen.getByText('iPhone 13 Battery')).toBeInTheDocument();

    // Check if quantities are correct
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    // Check if prices are correct
    expect(screen.getByText('$89.99')).toBeInTheDocument();
    expect(screen.getAllByText('$49.99')).toHaveLength(2); // Price and total for the same item

    // Check if item totals are correct
    expect(screen.getByText('$179.98')).toBeInTheDocument(); // 2 * 89.99
    expect(screen.getAllByText('$229.97')).toHaveLength(2); // Subtotal appears twice in summary
  });

  it('allows updating item quantity', async () => {
    const user = userEvent.setup();
    render(<Cart />);

    // Wait for cart data to load
    await waitFor(() => {
      expect(screen.getByText('iPhone 13 Screen Replacement')).toBeInTheDocument();
    });

    // Find quantity buttons (the component uses + and - buttons, not inputs)
    const increaseButtons = screen.getAllByText('+');

    // Increase quantity of first item
    await user.click(increaseButtons[0]);

    // Check if fetch was called with correct data
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/cart', expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({
          itemId: mockCartItems[0].id,
          quantity: 3,
        }),
      }));
    });
  });

  it('allows removing items from cart', async () => {
    const user = userEvent.setup();
    render(<Cart />);

    // Wait for cart data to load
    await waitFor(() => {
      expect(screen.getByText('iPhone 13 Screen Replacement')).toBeInTheDocument();
    });

    // Find remove buttons
    const removeButtons = screen.getAllByText(/remove/i);

    // Click remove button for first item
    await user.click(removeButtons[0]);

    // Check if fetch was called with correct data
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/cart', expect.objectContaining({
        method: 'DELETE',
        body: JSON.stringify({
          itemId: mockCartItems[0].id,
        }),
      }));
    });
  });

  it('shows empty cart message when no items', async () => {
    // Mock fetch for empty cart
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        cart: {
          items: [],
          item_count: 0,
          subtotal: 0
        }
      }),
    });

    render(<Cart />);

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    // Check if continue shopping button is shown
    const continueShoppingButton = screen.getByText(/continue shopping/i);
    expect(continueShoppingButton).toBeInTheDocument();
    expect(continueShoppingButton.closest('a')).toHaveAttribute('href', '/products');
  });

  it('allows proceeding to checkout', async () => {
    const user = userEvent.setup();
    const mockRouter = { push: jest.fn() };
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue(mockRouter);

    render(<Cart />);

    // Wait for cart data to load
    await waitFor(() => {
      expect(screen.getByText('iPhone 13 Screen Replacement')).toBeInTheDocument();
    });

    // Find checkout button
    const checkoutButton = screen.getByText(/proceed to checkout/i);

    // Click checkout button
    await user.click(checkoutButton);

    // Check if router.push was called with correct path
    expect(mockRouter.push).toHaveBeenCalledWith('/checkout');
  });
});
