import React from 'react';
import Link from 'next/link';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../styles/Returns.module.css';

export default function Returns() {
  const returnProcess = [
    {
      step: '01',
      title: 'Contact Us',
      description: 'Email our customer service team or use our contact form to initiate your return.',
      icon: '📧'
    },
    {
      step: '02',
      title: 'Receive Authorization',
      description: 'We\'ll provide a return authorization number and shipping instructions.',
      icon: '📋'
    },
    {
      step: '03',
      title: 'Package Item',
      description: 'Pack the item securely in its original packaging with all accessories.',
      icon: '📦'
    },
    {
      step: '04',
      title: 'Ship Back',
      description: 'Send the package using the provided shipping label (if applicable).',
      icon: '🚚'
    },
    {
      step: '05',
      title: 'Refund Processing',
      description: 'Once received, we process your refund within 3-5 business days.',
      icon: '💰'
    }
  ];

  const returnReasons = [
    {
      reason: 'Defective Product',
      description: 'Item arrived damaged or not working as described',
      eligible: true,
      conditions: 'Must be reported within 7 days of receipt'
    },
    {
      reason: 'Wrong Item Sent',
      description: 'We sent the wrong product or incorrect quantity',
      eligible: true,
      conditions: 'Full refund including shipping costs'
    },
    {
      reason: 'Changed Mind',
      description: 'No longer need the product',
      eligible: true,
      conditions: 'Within 30 days, unused, in original packaging'
    },
    {
      reason: 'Quality Issues',
      description: 'Product does not meet quality standards',
      eligible: true,
      conditions: 'Within warranty period, proof of defect required'
    }
  ];

  const warrantyInfo = [
    {
      type: 'Standard Warranty',
      duration: '30 Days',
      coverage: 'Manufacturing defects and functionality issues',
      conditions: 'Normal use, no physical damage or modifications'
    },
    {
      type: 'Extended Warranty',
      duration: 'Up to 1 Year',
      coverage: 'Manufacturing defects and functionality issues',
      conditions: 'Available for select products, additional cost'
    },
    {
      type: 'Repair Warranty',
      duration: '90 Days',
      coverage: 'Repair work performed by our technicians',
      conditions: 'Original repair must be performed by us'
    }
  ];

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase for unused items in original packaging. Return shipping costs are the responsibility of the buyer unless the item is defective or we made an error.'
    },
    {
      question: 'How long does a refund take?',
      answer: 'Once we receive your return, refunds are processed within 3-5 business days. The time for the refund to appear in your account depends on your payment method and bank.'
    },
    {
      question: 'Can I exchange an item?',
      answer: 'Yes, you can exchange items within 30 days. Contact us to arrange an exchange. If the exchange value is different, we\'ll process the difference accordingly.'
    },
    {
      question: 'What items cannot be returned?',
      answer: 'Custom orders, consumable items (thermal paste, adhesives), and items that have been used or damaged cannot be returned unless they are defective.'
    },
    {
      question: 'Do you offer warranties?',
      answer: 'Yes, all products come with a 30-day warranty covering manufacturing defects. Extended warranties are available for select products.'
    },
    {
      question: 'What if my item arrives damaged?',
      answer: 'If your item arrives damaged, contact us immediately with photos of the damage and packaging. We will arrange for a replacement or full refund at no cost to you.'
    }
  ];

  return (
    <Layout
      title="Returns & Warranty - Nexus Tech Hub | Return Policy & Warranty Information"
      description="Learn about our return policy, warranty coverage, and how to return items. 30-day returns and comprehensive warranty protection."
    >
      <div className={styles.returnsPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Returns & Warranty</span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1>Returns & Warranty</h1>
          <p>Hassle-free returns and comprehensive warranty coverage for your peace of mind</p>
        </div>

        {/* Return Policy Overview */}
        <div className={styles.policyOverview}>
          <div className={styles.container}>
            <div className={styles.policyGrid}>
              <div className={styles.policyCard}>
                <div className={styles.policyIcon}>↩️</div>
                <h3>30-Day Returns</h3>
                <p>Return unused items in original packaging within 30 days for a full refund.</p>
              </div>
              <div className={styles.policyCard}>
                <div className={styles.policyIcon}>🛡️</div>
                <h3>Warranty Coverage</h3>
                <p>All products come with 30-day warranty against manufacturing defects.</p>
              </div>
              <div className={styles.policyCard}>
                <div className={styles.policyIcon}>⚡</div>
                <h3>Fast Processing</h3>
                <p>Refunds processed within 3-5 business days of receiving your return.</p>
              </div>
              <div className={styles.policyCard}>
                <div className={styles.policyIcon}>💬</div>
                <h3>Expert Support</h3>
                <p>Our team is here to help with any return or warranty questions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className={styles.returnProcess}>
          <div className={styles.container}>
            <h2>How to Return an Item</h2>
            <div className={styles.processGrid}>
              {returnProcess.map((step, index) => (
                <div key={index} className={styles.processStep}>
                  <div className={styles.stepNumber}>{step.step}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Return Eligibility */}
        <div className={styles.eligibilitySection}>
          <div className={styles.container}>
            <h2>Return Eligibility</h2>
            <div className={styles.eligibilityGrid}>
              {returnReasons.map((item, index) => (
                <div key={index} className={styles.eligibilityCard}>
                  <div className={styles.eligibilityHeader}>
                    <h3>{item.reason}</h3>
                    <div className={`${styles.eligibilityStatus} ${item.eligible ? styles.eligible : styles.notEligible}`}>
                      {item.eligible ? '✓ Eligible' : '✗ Not Eligible'}
                    </div>
                  </div>
                  <p className={styles.eligibilityDescription}>{item.description}</p>
                  <div className={styles.eligibilityConditions}>
                    <strong>Conditions:</strong> {item.conditions}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Warranty Information */}
        <div className={styles.warrantySection}>
          <div className={styles.container}>
            <h2>Warranty Coverage</h2>
            <div className={styles.warrantyGrid}>
              {warrantyInfo.map((warranty, index) => (
                <div key={index} className={styles.warrantyCard}>
                  <div className={styles.warrantyHeader}>
                    <h3>{warranty.type}</h3>
                    <div className={styles.warrantyDuration}>{warranty.duration}</div>
                  </div>
                  <div className={styles.warrantyCoverage}>
                    <strong>Coverage:</strong> {warranty.coverage}
                  </div>
                  <div className={styles.warrantyConditions}>
                    <strong>Conditions:</strong> {warranty.conditions}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className={styles.notesSection}>
          <div className={styles.container}>
            <h2>Important Notes</h2>
            <div className={styles.notesGrid}>
              <div className={styles.notesCard}>
                <h3>📦 Packaging Requirements</h3>
                <ul>
                  <li>Use original packaging when possible</li>
                  <li>Secure all small parts and accessories</li>
                  <li>Include all manuals and documentation</li>
                  <li>Use adequate protective packaging</li>
                </ul>
              </div>
              <div className={styles.notesCard}>
                <h3>🚫 Non-Returnable Items</h3>
                <ul>
                  <li>Custom manufactured parts</li>
                  <li>Consumable items (thermal paste, adhesives)</li>
                  <li>Items damaged by misuse or accidents</li>
                  <li>Items beyond the return period</li>
                </ul>
              </div>
              <div className={styles.notesCard}>
                <h3>💰 Refund Methods</h3>
                <ul>
                  <li>Original payment method</li>
                  <li>Store credit (by request)</li>
                  <li>Bank transfer for international customers</li>
                  <li>Processing time: 3-5 business days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <div className={styles.container}>
            <h2>Returns & Warranty FAQs</h2>
            <div className={styles.faqGrid}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <div className={styles.container}>
            <h2>Need Help with a Return?</h2>
            <p>Our customer service team is here to assist you with any return or warranty questions.</p>
            <div className={styles.contactOptions}>
              <div className={styles.contactCard}>
                <h3>📧 Email Support</h3>
                <p>returns@nexustechhub.com</p>
                <p>Response within 24 hours</p>
                <Link href="/contact" className={styles.contactBtn}>
                  Start Return Process
                </Link>
              </div>
              <div className={styles.contactCard}>
                <h3>📞 Phone Support</h3>
                <p>+971 50 123 4567</p>
                <p>Mon-Fri 9AM-6PM GST</p>
                <a href="tel:+971501234567" className={styles.contactBtn}>
                  Call Now
                </a>
              </div>
              <div className={styles.contactCard}>
                <h3>💬 Live Chat</h3>
                <p>Available on website</p>
                <p>Mon-Fri 9AM-6PM GST</p>
                <button className={styles.contactBtn}>
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
