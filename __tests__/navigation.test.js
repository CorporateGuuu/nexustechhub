import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

describe('Navigation Links', () => {
  it('header navigation links have correct hrefs', () => {
    render(<Header />);

    // Check main navigation links (mobile menu contains these)
    const homeLink = screen.getByText(/Home/i).closest('a');
    const productsLink = screen.getByText(/Products/i).closest('a');
    const categoriesLink = screen.getByText(/Categories/i).closest('a');
    const lcdBuybackLink = screen.getByText(/LCD Buyback/i).closest('a');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toHaveAttribute('href', '/products');
    expect(categoriesLink).toHaveAttribute('href', '/categories');
    expect(lcdBuybackLink).toHaveAttribute('href', '/lcd-buyback');

    // Check cart link in mobile menu
    const cartLink = screen.getByText('Cart').closest('a');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('footer navigation links have correct hrefs', () => {
    render(<Footer />);

    // Check shop links (these are in the footer)
    const iphonePartsLink = screen.getByText(/iPhone Parts/i).closest('a');
    const samsungPartsLink = screen.getByText(/Samsung Parts/i).closest('a');
    const ipadPartsLink = screen.getByText(/iPad Parts/i).closest('a');
    const macbookPartsLink = screen.getByText(/MacBook Parts/i).closest('a');
    const repairToolsLink = screen.getByText(/Repair Tools/i).closest('a');

    expect(iphonePartsLink).toHaveAttribute('href', '/products/iphone');
    expect(samsungPartsLink).toHaveAttribute('href', '/products/samsung');
    expect(ipadPartsLink).toHaveAttribute('href', '/products/ipad');
    expect(macbookPartsLink).toHaveAttribute('href', '/products/macbook');
    expect(repairToolsLink).toHaveAttribute('href', '/products/tools');

    // Check information links
    const aboutUsLink = screen.getByText(/About Us/i).closest('a');
    const lcdBuybackLink = screen.getByText(/LCD Buyback/i).closest('a');
    const tradeOffLink = screen.getByText(/Trade-Off/i).closest('a');
    const financingLink = screen.getByText(/Financing/i).closest('a');
    const applePartsLink = screen.getByText(/Apple Parts Program/i).closest('a');

    expect(aboutUsLink).toHaveAttribute('href', '/about');
    expect(lcdBuybackLink).toHaveAttribute('href', '/lcd-buyback');
    expect(tradeOffLink).toHaveAttribute('href', '/trade-off');
    expect(financingLink).toHaveAttribute('href', '/finance');
    expect(applePartsLink).toHaveAttribute('href', '/gapp');
  });

  it('renders clickable navigation links in header', () => {
    render(<Header />);

    // Check that navigation links are present and clickable
    const productsLink = screen.getByText(/Products/i).closest('a');
    const categoriesLink = screen.getByText(/Categories/i).closest('a');
    const cartLink = screen.getByText('Cart').closest('a');

    expect(productsLink).toBeInTheDocument();
    expect(categoriesLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();

    // Links should have proper href attributes
    expect(productsLink).toHaveAttribute('href', '/products');
    expect(categoriesLink).toHaveAttribute('href', '/categories');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('renders clickable navigation links in footer', () => {
    render(<Footer />);

    // Check that footer links are present and clickable
    const aboutUsLink = screen.getByText(/About Us/i).closest('a');
    const iphonePartsLink = screen.getByText(/iPhone Parts/i).closest('a');
    const financingLink = screen.getByText(/Financing/i).closest('a');

    expect(aboutUsLink).toBeInTheDocument();
    expect(iphonePartsLink).toBeInTheDocument();
    expect(financingLink).toBeInTheDocument();

    // Links should have proper href attributes
    expect(aboutUsLink).toHaveAttribute('href', '/about');
    expect(iphonePartsLink).toHaveAttribute('href', '/products/iphone');
    expect(financingLink).toHaveAttribute('href', '/finance');
  });
});
