import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../../components/Header/Header';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

describe('Header Component', () => {
  it('renders the logo and navigation links', () => {
    render(<Header />);

    // Check if logo is rendered
    expect(screen.getByAltText(/Nexus TechHub Logo/i)).toBeInTheDocument();

    // Check if navigation links are rendered (mobile menu contains these)
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    expect(screen.getByText(/LCD Buyback/i)).toBeInTheDocument();
  });

  it('has working navigation links', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    // Get all navigation links
    const homeLink = screen.getByText(/Home/i);
    const productsLink = screen.getByText(/Products/i);
    const categoriesLink = screen.getByText(/Categories/i);
    const lcdBuybackLink = screen.getByText(/LCD Buyback/i);
    
    // Check if links have correct href attributes
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(productsLink.closest('a')).toHaveAttribute('href', '/products');
    expect(categoriesLink.closest('a')).toHaveAttribute('href', '/categories');
    expect(lcdBuybackLink.closest('a')).toHaveAttribute('href', '/lcd-buyback');
    
    // Test clicking on links
    await user.click(homeLink);
    await user.click(productsLink);
    await user.click(categoriesLink);
    await user.click(lcdBuybackLink);
  });

  it('renders mobile menu button', () => {
    render(<Header />);

    // Check if mobile menu button is rendered (specifically the open menu button)
    const menuButton = screen.getByLabelText('Menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('renders mobile navigation menu', () => {
    render(<Header />);

    // Check if mobile menu is rendered with navigation links
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();

    // Check if cart link has correct href
    const cartLink = screen.getByText('Cart').closest('a');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
});
