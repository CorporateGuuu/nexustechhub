import React from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Al-Rashid",
      role: "Repair Shop Owner",
      location: "Dubai, UAE",
      quote: "Nexus TechHub has been our go-to supplier for over 2 years. Their parts are consistently high quality and their shipping is lightning fast.",
      stars: 5
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Electronics Technician",
      location: "Abu Dhabi, UAE",
      quote: "As someone who repairs my own devices, I can't recommend Nexus TechHub enough. Their detailed guides and quality parts have saved me hundreds of dollars.",
      stars: 5
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      role: "Mobile Repair Specialist",
      location: "Sharjah, UAE",
      quote: "The genuine Apple parts program is a game-changer. My customers trust the repairs more knowing we use authentic components.",
      stars: 5
    }
  ];

  return (
    <section className={styles.testimonials}>
      <div className="container">
        <h2 className={styles.title}>What Our Customers Say</h2>
        <p className={styles.subtitle}>Don't just take our word for it - hear from our satisfied customers</p>

        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonial}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < testimonial.stars ? styles.starFilled : styles.starEmpty}>★</span>
                ))}
              </div>
              <blockquote className={styles.quote}>"{testimonial.quote}"</blockquote>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <div className={styles.avatarPlaceholder}>
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>{testimonial.name}</div>
                  <div className={styles.role}>{testimonial.role}</div>
                  {testimonial.location && <div className={styles.location}>{testimonial.location}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
