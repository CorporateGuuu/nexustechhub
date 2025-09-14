#!/usr/bin/env python3
"""
Unified Mobile Parts Scraper
Consolidated scraper system for collecting mobile repair parts data
Combines functionality from multiple separate scraper scripts
"""

import requests
import json
import logging
import time
from typing import Dict, List, Optional
from dataclasses import dataclass
from urllib.parse import urljoin, urlparse
import os
from pathlib import Path

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('scraper.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

@dataclass
class ScrapedProduct:
    """Data structure for scraped product information"""
    name: str
    sku: str
    price: float
    description: str
    category: str
    brand: str
    image_url: Optional[str] = None
    specifications: Optional[Dict] = None

class BaseScraper:
    """Base scraper class with common functionality"""

    def __init__(self, base_url: str, headers: Optional[Dict] = None):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update(headers or {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

    def get(self, url: str, **kwargs) -> requests.Response:
        """Make GET request with error handling"""
        try:
            response = self.session.get(url, **kwargs)
            response.raise_for_status()
            return response
        except requests.RequestException as e:
            logger.error(f"Request failed for {url}: {e}")
            raise

    def post(self, url: str, data=None, json=None, **kwargs) -> requests.Response:
        """Make POST request with error handling"""
        try:
            response = self.session.post(url, data=data, json=json, **kwargs)
            response.raise_for_status()
            return response
        except requests.RequestException as e:
            logger.error(f"POST request failed for {url}: {e}")
            raise

class MobileSentrixScraper(BaseScraper):
    """Scraper for MobileSentrix website"""

    def __init__(self):
        super().__init__(
            base_url="https://www.mobilesentrix.com",
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.mobilesentrix.com/'
            }
        )

    def scrape_category(self, category_url: str) -> List[ScrapedProduct]:
        """Scrape products from a category page"""
        products = []
        try:
            response = self.get(category_url)
            # Parse HTML/JSON response and extract products
            # This would contain the actual scraping logic
            logger.info(f"Scraped {len(products)} products from {category_url}")
            return products
        except Exception as e:
            logger.error(f"Failed to scrape category {category_url}: {e}")
            return []

    def scrape_product_details(self, product_url: str) -> Optional[ScrapedProduct]:
        """Scrape detailed product information"""
        try:
            response = self.get(product_url)
            # Parse product details
            # This would contain detailed scraping logic
            return None
        except Exception as e:
            logger.error(f"Failed to scrape product {product_url}: {e}")
            return None

class RepairDeskScraper(BaseScraper):
    """Scraper for RepairDesk API"""

    def __init__(self, api_key: str):
        super().__init__(
            base_url="https://api.repairdesk.co",
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            }
        )
        self.api_key = api_key

    def get_products(self, page: int = 1, limit: int = 100) -> List[ScrapedProduct]:
        """Fetch products from RepairDesk API"""
        try:
            endpoint = f"/api/v1/products?page={page}&limit={limit}"
            response = self.get(endpoint)
            data = response.json()

            products = []
            for item in data.get('products', []):
                product = ScrapedProduct(
                    name=item.get('name', ''),
                    sku=item.get('sku', ''),
                    price=float(item.get('price', 0)),
                    description=item.get('description', ''),
                    category=item.get('category', ''),
                    brand=item.get('brand', ''),
                    image_url=item.get('image_url'),
                    specifications=item.get('specifications', {})
                )
                products.append(product)

            return products
        except Exception as e:
            logger.error(f"Failed to fetch products from RepairDesk: {e}")
            return []

class UnifiedScraper:
    """Unified scraper that combines multiple sources"""

    def __init__(self):
        self.scrapers = {
            'mobilesentrix': MobileSentrixScraper(),
            'repairdesk': RepairDeskScraper(os.getenv('REPAIRDESK_API_KEY', ''))
        }
        self.output_dir = Path('output')
        self.output_dir.mkdir(exist_ok=True)

    def scrape_all_sources(self) -> List[ScrapedProduct]:
        """Scrape products from all configured sources"""
        all_products = []

        # Scrape from MobileSentrix
        mobilesentrix_products = self.scrapers['mobilesentrix'].scrape_category('/iphone-parts')
        all_products.extend(mobilesentrix_products)

        # Scrape from RepairDesk
        repairdesk_products = self.scrapers['repairdesk'].get_products()
        all_products.extend(repairdesk_products)

        logger.info(f"Total products scraped: {len(all_products)}")
        return all_products

    def save_to_json(self, products: List[ScrapedProduct], filename: str = None):
        """Save scraped products to JSON file"""
        if filename is None:
            timestamp = time.strftime('%Y%m%d_%H%M%S')
            filename = f"scraped_products_{timestamp}.json"

        filepath = self.output_dir / filename

        # Convert products to dictionaries
        product_dicts = []
        for product in products:
            product_dicts.append({
                'name': product.name,
                'sku': product.sku,
                'price': product.price,
                'description': product.description,
                'category': product.category,
                'brand': product.brand,
                'image_url': product.image_url,
                'specifications': product.specifications
            })

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(product_dicts, f, indent=2, ensure_ascii=False)

        logger.info(f"Saved {len(products)} products to {filepath}")

    def save_to_csv(self, products: List[ScrapedProduct], filename: str = None):
        """Save scraped products to CSV file"""
        import csv

        if filename is None:
            timestamp = time.strftime('%Y%m%d_%H%M%S')
            filename = f"scraped_products_{timestamp}.csv"

        filepath = self.output_dir / filename

        with open(filepath, 'w', newline='', encoding='utf-8') as f:
            fieldnames = ['name', 'sku', 'price', 'description', 'category', 'brand', 'image_url']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()

            for product in products:
                writer.writerow({
                    'name': product.name,
                    'sku': product.sku,
                    'price': product.price,
                    'description': product.description,
                    'category': product.category,
                    'brand': product.brand,
                    'image_url': product.image_url or ''
                })

        logger.info(f"Saved {len(products)} products to {filepath}")

def main():
    """Main execution function"""
    logger.info("Starting unified scraper...")

    scraper = UnifiedScraper()

    try:
        # Scrape all products
        products = scraper.scrape_all_sources()

        if products:
            # Save in multiple formats
            scraper.save_to_json(products)
            scraper.save_to_csv(products)
            logger.info("Scraping completed successfully!")
        else:
            logger.warning("No products were scraped")

    except Exception as e:
        logger.error(f"Scraping failed: {e}")
        return 1

    return 0

if __name__ == "__main__":
    exit(main())
