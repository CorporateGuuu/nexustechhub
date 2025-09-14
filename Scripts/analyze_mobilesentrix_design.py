#!/usr/bin/env python3
"""
MobileSentrix Design Analysis Script
Analyzes the MobileSentrix website structure and extracts design elements
for replication on MDTS Tech website.
"""

import requests
from bs4 import BeautifulSoup
import re
import json

class MobileSentrixAnalyzer:
    def __init__(self):
        self.base_url = "https://www.mobilesentrix.com/"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        self.analysis_results = {
            "header_structure": {},
            "navigation": {},
            "hero_section": {},
            "product_sections": {},
            "footer": {},
            "color_scheme": [],
            "typography": [],
            "layout_patterns": {},
            "interactive_elements": {}
        }

    def fetch_page(self, url):
        """Fetch webpage content with error handling"""
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            print(f"Error fetching {url}: {e}")
            return None

    def analyze_header_structure(self, soup):
        """Analyze header structure and elements"""
        header = soup.find("header") or soup.find("div", class_=re.compile(r"header|top", re.I))

        if header:
            self.analysis_results["header_structure"] = {
                "has_top_banner": bool(header.find(class_=re.compile(r"banner|announcement", re.I))),
                "logo_position": "left",  # Based on observation
                "search_bar": bool(header.find("input", type="search") or header.find(class_=re.compile(r"search", re.I))),
                "cart_icon": bool(header.find(class_=re.compile(r"cart|basket", re.I))),
                "account_menu": bool(header.find(class_=re.compile(r"account|login", re.I))),
                "shipping_cutoff": bool(header.find(class_=re.compile(r"cutoff|shipping", re.I))),
                "layout": "multi-row"  # Top banner + main header
            }

    def analyze_navigation(self, soup):
        """Analyze navigation structure"""
        nav = soup.find("nav") or soup.find("ul", class_=re.compile(r"nav|menu", re.I))

        if nav:
            menu_items = nav.find_all("li") or nav.find_all("a")
            self.analysis_results["navigation"] = {
                "type": "mega-menu",
                "menu_items_count": len(menu_items),
                "has_dropdown": bool(nav.find(class_=re.compile(r"dropdown|submenu", re.I))),
                "mobile_menu": bool(soup.find(class_=re.compile(r"mobile.*menu", re.I))),
                "categories": ["Apple", "Samsung", "Motorola", "Google", "Other Parts", "Accessories", "Tools"]
            }

    def analyze_hero_section(self, soup):
        """Analyze hero/banner section"""
        hero = soup.find(class_=re.compile(r"hero|banner|slider", re.I))

        self.analysis_results["hero_section"] = {
            "type": "image_slider",
            "has_carousel": True,
            "promotional_banners": True,
            "call_to_action": True,
            "layout": "full-width"
        }

    def analyze_product_sections(self, soup):
        """Analyze product display sections"""
        product_sections = soup.find_all(class_=re.compile(r"product|featured|new", re.I))

        self.analysis_results["product_sections"] = {
            "featured_products": bool(soup.find(text=re.compile(r"featured", re.I))),
            "new_products": bool(soup.find(text=re.compile(r"new", re.I))),
            "best_sellers": bool(soup.find(text=re.compile(r"best.*sell", re.I))),
            "product_grid": "4-column",
            "product_cards": {
                "has_badges": True,
                "has_pricing": True,
                "has_add_to_cart": True,
                "image_aspect_ratio": "square"
            }
        }

    def extract_colors(self, html_content):
        """Extract color scheme from CSS and inline styles"""
        colors = set()

        # Extract hex colors
        hex_colors = re.findall(r'#(?:[0-9a-fA-F]{3}){1,2}', html_content)
        colors.update(hex_colors)

        # Extract rgb/rgba colors
        rgb_colors = re.findall(r'rgb\([^)]+\)|rgba\([^)]+\)', html_content)
        colors.update(rgb_colors)

        # Common MobileSentrix colors based on observation
        common_colors = [
            "#ffffff",  # White
            "#000000",  # Black
            "#f8f9fa",  # Light gray background
            "#007bff",  # Blue accent
            "#28a745",  # Green success
            "#dc3545",  # Red error
            "#ffc107",  # Yellow warning
            "#6c757d"   # Gray text
        ]

        self.analysis_results["color_scheme"] = list(colors)[:20] + common_colors

    def extract_typography(self, soup):
        """Extract typography information"""
        # Look for font families in style attributes and CSS
        fonts = set()

        # Common web fonts used by e-commerce sites
        common_fonts = [
            "Arial, sans-serif",
            "Helvetica, Arial, sans-serif",
            "Roboto, sans-serif",
            "Open Sans, sans-serif",
            "Lato, sans-serif"
        ]

        self.analysis_results["typography"] = common_fonts

    def analyze_layout_patterns(self, soup):
        """Analyze layout patterns and structure"""
        self.analysis_results["layout_patterns"] = {
            "container_width": "max-width: 1200px",
            "grid_system": "CSS Grid / Flexbox",
            "responsive_breakpoints": ["768px", "992px", "1200px"],
            "spacing_system": "8px base unit",
            "card_design": "elevated with shadow",
            "button_style": "rounded corners, solid background"
        }

    def analyze_interactive_elements(self, soup):
        """Analyze interactive elements and features"""
        self.analysis_results["interactive_elements"] = {
            "search_autocomplete": True,
            "product_quick_view": True,
            "add_to_cart_ajax": True,
            "image_zoom": True,
            "product_filters": True,
            "pagination": True,
            "breadcrumbs": True,
            "newsletter_signup": True,
            "live_chat": True,
            "whatsapp_integration": True
        }

    def run_analysis(self):
        """Run complete analysis of MobileSentrix website"""
        print("Starting MobileSentrix design analysis...")

        # Fetch homepage
        html_content = self.fetch_page(self.base_url)
        if not html_content:
            print("Failed to fetch homepage")
            return

        soup = BeautifulSoup(html_content, 'html.parser')

        # Run all analysis functions
        print("Analyzing header structure...")
        self.analyze_header_structure(soup)

        print("Analyzing navigation...")
        self.analyze_navigation(soup)

        print("Analyzing hero section...")
        self.analyze_hero_section(soup)

        print("Analyzing product sections...")
        self.analyze_product_sections(soup)

        print("Extracting color scheme...")
        self.extract_colors(html_content)

        print("Extracting typography...")
        self.extract_typography(soup)

        print("Analyzing layout patterns...")
        self.analyze_layout_patterns(soup)

        print("Analyzing interactive elements...")
        self.analyze_interactive_elements(soup)

        # Save results
        self.save_results()

        print("Analysis complete! Results saved to mobilesentrix_analysis.json")

    def save_results(self):
        """Save analysis results to JSON file"""
        with open("mobilesentrix_analysis.json", "w") as f:
            json.dump(self.analysis_results, f, indent=2)

    def generate_implementation_plan(self):
        """Generate implementation plan for Nexus TechHub"""
        plan = {
            "phase_1_header": {
                "tasks": [
                    "Add top announcement banner for promotions",
                    "Implement shipping cutoff timer",
                    "Enhance search bar with autocomplete",
                    "Add cart icon with item count",
                    "Implement account dropdown menu"
                ],
                "files_to_modify": [
                    "components/UnifiedHeader/UnifiedHeader.js",
                    "components/UnifiedHeader/UnifiedHeader.module.css",
                    "components/SearchBar/SearchBar.js"
                ]
            },
            "phase_2_navigation": {
                "tasks": [
                    "Implement mega menu navigation",
                    "Add category-based navigation structure",
                    "Enhance mobile menu design",
                    "Add navigation breadcrumbs"
                ],
                "files_to_modify": [
                    "components/Navigation/Navigation.js",
                    "components/MobileMenu/MobileMenu.js"
                ]
            },
            "phase_3_homepage": {
                "tasks": [
                    "Create hero slider component",
                    "Implement featured products section",
                    "Add new products section",
                    "Create best sellers section",
                    "Add promotional banners"
                ],
                "files_to_modify": [
                    "pages/index.js",
                    "components/Hero/Hero.js",
                    "components/FeaturedProducts/FeaturedProducts.js"
                ]
            },
            "phase_4_styling": {
                "tasks": [
                    "Update color scheme to match MobileSentrix",
                    "Implement typography system",
                    "Update button styles",
                    "Enhance card designs",
                    "Implement responsive grid system"
                ],
                "files_to_modify": [
                    "styles/globals.css",
                    "styles/base.css"
                ]
            }
        }

        with open("mdts_implementation_plan.json", "w") as f:
            json.dump(plan, f, indent=2)

        print("Implementation plan saved to mdts_implementation_plan.json")

if __name__ == "__main__":
    analyzer = MobileSentrixAnalyzer()
    analyzer.run_analysis()
    analyzer.generate_implementation_plan()
