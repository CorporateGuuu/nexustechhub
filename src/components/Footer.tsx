export default function Footer() {
  const footerLinks = {
    about: [
      { href: '/about', label: 'About Us' },
      { href: '/blog', label: 'Blog' },
      { href: '/quality-standards', label: 'Quality Standards' },
      { href: '/return-policy', label: 'Return Policy' },
      { href: '/privacy-policy', label: 'Privacy Policy' }
    ],
    services: [
      { href: '/my-account', label: 'My Account' },
      { href: '/lcd-buyback', label: 'LCD Buyback' },
      { href: '/pre-owned-devices', label: 'Pre-Owned Devices' }
    ],
    support: [
      { href: '/contact', label: 'Contact Us' },
      { href: '#', label: 'Live Chat' },
      { href: 'tel:+18885558324', label: '1-888-555-TECH' },
      { href: 'https://wa.me/18885558324', label: 'WhatsApp' },
      { href: 'mailto:sales@nexustechhub.com', label: 'Email' }
    ]
  };

  const socialLinks = [
    { href: '#', icon: 'fab fa-facebook' },
    { href: '#', icon: 'fab fa-instagram' },
    { href: '#', icon: 'fab fa-youtube' },
    { href: '#', icon: 'fab fa-linkedin' },
    { href: '#', icon: 'fab fa-twitter' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-5">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              Nexus<span className="text-blue-500">T</span>ech Hub
            </div>
            <p className="mb-4"><strong>United States</strong></p>
            <p className="mb-4">English | USD</p>
            {/* Payment icons placeholder */}
            <div className="flex space-x-2">
              <div className="w-10 h-6 bg-gray-700 rounded"></div>
              <div className="w-10 h-6 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-5">About</h5>
            <ul className="space-y-2">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors block py-0.5">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-5">Services</h5>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors block py-0.5">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-5">Support</h5>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors block py-0.5"
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <div className="flex justify-center items-center mb-4 space-x-4">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} className="text-gray-400 hover:text-white text-xl transition-colors">
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            © 2025 Nexus Tech Hub. All trademarks are property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
