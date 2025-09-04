import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Finance.module.css';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '../components/animations/FadeIn';
import SlideIn from '../components/animations/SlideIn';
import StaggerList from '../components/animations/StaggerList';

export default function FinancePage() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  const faqs = [
    {
      question: "How does the application process work?",
      answer: "Credit Key's application process is simple and does not affect your personal credit. Applications are online through any of our partner merchants. You provide details about yourself and your business. Most customers are approved in seconds."
    },
    {
      question: "Are there any setup charges or ongoing fees?",
      answer: "No, Credit Key does not change any setup fees. If you choose to go beyond 30 days, you can be approved as low as 1% per month."
    },
    {
      question: "Will my application impact my FICO/credit score?",
      answer: "Applying for Credit Key is a \"soft inquiry.\" This does not impact your FICO®/credit score."
    },
    {
      question: "How do I apply and how long will the application process take?",
      answer: "Applications are made right on our Apply Now page, or through our partner merchant sites. The application typically only takes a few minutes. Most applicants are approved in seconds through our secure process."
    },
    {
      question: "How are repayments made?",
      answer: "Your repayments will be made through your bank account. You will be given instructions to setup your bank on your CreditKey.com dashboard upon your application being approved. An automatic bill payment will be issued and scheduled to transfer the funds on a predetermined date to pay a recurring bill. Automatic bill payments are routine payments, until the balance is paid off."
    },
    {
      question: "What can I buy?",
      answer: "We are able to process most business expenses with the exception of invoices for the following expenses: + Payments to existing lending/financing companies (other lines of credit, business rent/mortgage, etc.) + Open financing bills (credit cards, business loans, etc.) + Subscription services + Payments for payroll or independent contractors + Illegal products or services + Personal use or payments to related entities We are able to finance any business purchases that you are making to a vendor for equipment, products or consumables. If you need to make a business purchase for a merchant not already partnered with Credit Key, please submit a Credit Key Anywhere request."
    },
    {
      question: "How can I increase my credit limit?",
      answer: "We're able to see if you qualify for this increased line of credit so you can place your order but we need a bit of information from you (required by our banking partner, Lead Bank). If you can provide us with the below, we'll be able to review and see if you qualify for the increase: + Additional amount you are requesting ($5k more, $10k more, etc) + Business operating bank statements for the most recent 3 months Please email your bank statements to support@mdtstech.store Once received, please allow 1-2 business days for our team to review for an enhancement."
    },
    {
      question: "Can I pay off my Credit Key loan early?",
      answer: "Absolutely. You are able to pay off your Credit Key loan at any time, with no fees or penalties for early repayment."
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Financing Options | MDTS - Midas Technical Solutions</title>
        <meta name="description" content="Explore financing options for your business purchases at MDTS. We offer 0% financing for 30 days through Credit Key." />
      </Head>

      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <FadeIn delay={0.2} direction="up">
            <section className={styles.heroSection}>
              <div className={styles.heroContent}>
                <SlideIn delay={0.4} direction="left" distance={40}>
                  <div className={styles.heroText}>
                    <div className={styles.logoContainer}>
                      <img
                        src="/images/finance/credit-key-logo.png"
                        alt="Credit Key Logo"
                        className={styles.creditKeyLogo}
                        onError={(e) => e.target.src = '/images/placeholder.svg'}
                      />
                    </div>
                    <h1>We Accept <span>Credit Key</span></h1>
                    <h2>0% Financing for 30 Days</h2>
                    <p>Fast, frictionless B2B Buy Now, Pay Later solutions.</p>
                    <p>We connect you to the resources you need to help your business flourish.</p>
                    <p>Credit Key delivers better business credit through a real-time proprietary B2B credit and payment option that can be used to make your payments online.</p>
                    <div className={styles.heroCta}>
                      <a href="https://www.creditkey.com/support" className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                        Contact Credit Key Support
                      </a>
                      <a href="https://www.creditkey.com/app/apply/mdts-tech" className={styles.primaryButton} target="_blank" rel="noopener noreferrer">
                        Apply Now
                      </a>
                    </div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.6} direction="right" distance={40}>
                  <div className={styles.heroImage}>
                    <img
                      src="/images/finance/banner-img-1.png"
                      alt="Credit Key Financing"
                      onError={(e) => e.target.src = '/images/placeholder.svg'}
                    />
                  </div>
                </SlideIn>
              </div>
            </section>
          </FadeIn>

          {/* Benefits Section */}
          <FadeIn delay={0.3} direction="up">
            <section id="benefits" className={styles.benefitsSection}>
              <FadeIn delay={0.1} direction="up">
                <h2>Buy Now Pay Later for B2B</h2>
                <p>A true BNPL option offering instant credit decisions, installments up to 12 months, and point-of-sale integrations.</p>
              </FadeIn>

              <StaggerList
                staggerDelay={0.15}
                initialDelay={0.2}
                animationType="slide"
                direction="up"
                className={styles.benefitsGrid}
              >
                <div className={styles.benefitCard}>
                  <h3>Up to</h3>
                  <div className={styles.benefitValue}>$50,000</div>
                  <p>Credit line</p>
                </div>
                <div className={styles.benefitCard}>
                  <h3>0% for</h3>
                  <div className={styles.benefitValue}>30</div>
                  <p>Days</p>
                </div>
                <div className={styles.benefitCard}>
                  <h3>Fees starting at</h3>
                  <div className={styles.benefitValue}>1%</div>
                  <p>Monthly, after 30 days</p>
                </div>
                <div className={styles.benefitCard}>
                  <h3>Approvals in</h3>
                  <div className={styles.benefitValue}>5</div>
                  <p>Minutes</p>
                </div>
              </StaggerList>
            </section>
          </FadeIn>

          {/* How It Works Section */}
          <FadeIn delay={0.4} direction="up">
            <section id="how-it-works" className={styles.howItWorksSection}>
              <FadeIn delay={0.1} direction="up">
                <h2>How Credit Key Works?</h2>
              </FadeIn>
              <StaggerList
                staggerDelay={0.2}
                initialDelay={0.2}
                animationType="slide"
                direction="up"
                className={styles.stepsContainer}
              >
                <div className={styles.step}>
                  <div className={styles.stepImage}>
                    <img
                      src="/images/finance/step-1.png"
                      alt="Fill out Application"
                      onError={(e) => e.target.src = '/images/placeholder.svg'}
                    />
                  </div>
                  <h3>Fill out Application</h3>
                  <p>Fill out a short application that takes 2 minutes to complete. Receive an instant credit decision</p>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepImage}>
                    <img
                      src="/images/finance/step-2.png"
                      alt="Check out"
                      onError={(e) => e.target.src = '/images/placeholder.svg'}
                    />
                  </div>
                  <h3>Check out</h3>
                  <p>View payment options and choose your preferred plan.</p>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepImage}>
                    <img
                      src="/images/finance/step-3.png"
                      alt="Order Placed!"
                      onError={(e) => e.target.src = '/images/placeholder.svg'}
                    />
                  </div>
                  <h3>Order Placed!</h3>
                  <p>Enjoy your purchase! You can log into your account to view purchase history and upcoming payments.</p>
                </div>
              </StaggerList>
            </section>
          </FadeIn>

          {/* FAQ Section */}
          <FadeIn delay={0.5} direction="up">
            <section id="faq" className={styles.faqSection}>
              <FadeIn delay={0.1} direction="up">
                <h2>FAQs</h2>
              </FadeIn>
              <StaggerList
                staggerDelay={0.1}
                initialDelay={0.2}
                animationType="slide"
                direction="left"
                className={styles.accordionContainer}
              >
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`${styles.accordionItem} ${activeAccordion === index ? styles.active : ''}`}
                  >
                    <button
                      className={styles.accordionHeader}
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={activeAccordion === index}
                      aria-controls={`faq-content-${index}`}
                    >
                      {faq.question}
                      <span className={styles.accordionIcon} aria-hidden="true">
                        {activeAccordion === index ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={`faq-content-${index}`}
                      className={styles.accordionContent}
                      style={{
                        maxHeight: activeAccordion === index ? '500px' : '0',
                        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </StaggerList>
            </section>
          </FadeIn>

          {/* CTA Section */}
          <FadeIn delay={0.6} direction="up">
            <section className={styles.ctaSection}>
              <div className={styles.ctaContent}>
                <SlideIn delay={0.2} direction="up" distance={30}>
                  <div className={styles.ctaLogo}>
                    <img
                      src="/images/finance/credit-key-full-logo.png"
                      alt="Credit Key Logo"
                      onError={(e) => e.target.src = '/images/placeholder.svg'}
                    />
                  </div>
                </SlideIn>
                <FadeIn delay={0.3} direction="up">
                  <h2>Buy What You Need, Pay Over Time</h2>
                </FadeIn>
                <StaggerList
                  staggerDelay={0.1}
                  initialDelay={0.4}
                  animationType="fade"
                  className={styles.ctaFeatures}
                >
                  <span>Up to $50k*</span>
                  <span>0% for 30 days</span>
                  <span>Instant credit decisions</span>
                </StaggerList>
                <FadeIn delay={0.6} direction="up">
                  <p className={styles.disclaimer}>*Subject to credit approval</p>
                  <a
                    href="https://www.creditkey.com/app/apply/mdts-tech"
                    className={styles.ctaButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now
                  </a>
                </FadeIn>
              </div>
            </section>
          </FadeIn>
        </div>
      </main>
    </Layout>
  );
}
