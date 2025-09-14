import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

// Mock all the complex components to avoid dependencies
jest.mock('../components/SEOHead', () => {
  return jest.fn(() => null);
});

jest.mock('../components/Hero', () => {
  return jest.fn(() => <div data-testid="mock-hero">Hero Section</div>);
});

jest.mock('../components/FeaturedProducts/FeaturedProducts', () => {
  return jest.fn(({ title }) => <div data-testid="mock-featured-products">{title || 'Featured Products'}</div>);
});

jest.mock('../components/WhatsAppButton', () => {
  return jest.fn(() => <div data-testid="mock-whatsapp">WhatsApp Button</div>);
});

jest.mock('../components/QuickInquiry', () => {
  return jest.fn(() => <div data-testid="mock-inquiry">Quick Inquiry</div>);
});

jest.mock('../components/Testimonials', () => {
  return jest.fn(() => <div data-testid="mock-testimonials">Testimonials</div>);
});

jest.mock('../components/MediaGallery/MediaGallery', () => {
  return jest.fn(() => <div data-testid="mock-gallery">Media Gallery</div>);
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/',
  })),
}));

describe('Landing Page', () => {
  test('renders the landing page with all main sections', () => {
    render(<Home />);

    // Check that main sections are rendered
    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-featured-products')).toHaveLength(3); // Featured, New Arrivals, Best Sellers
    expect(screen.getByTestId('mock-whatsapp')).toBeInTheDocument();
    expect(screen.getByTestId('mock-inquiry')).toBeInTheDocument();
    expect(screen.getByTestId('mock-testimonials')).toBeInTheDocument();
  });

  test('renders genuine parts program banner', () => {
    render(<Home />);

    // Check that the genuine parts program banner is rendered
    expect(screen.getByText('Introducing the Genuine Parts Program!')).toBeInTheDocument();
    expect(screen.getByText(/Genuine Parts Program/i)).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  test('renders product sections with correct titles', () => {
    render(<Home />);

    // Check that all three product sections are rendered
    const featuredProducts = screen.getAllByTestId('mock-featured-products');
    expect(featuredProducts).toHaveLength(3);

    // Check that the correct titles are rendered
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
    expect(screen.getByText('New Arrivals')).toBeInTheDocument();
    expect(screen.getByText('Best Sellers')).toBeInTheDocument();
  });
});
