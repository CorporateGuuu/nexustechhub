import React from 'react';
import styles from './Testimonials.module.css';

const testimonialsData = [
  {
    id: 1,
    name: 'Ahmed Al Mansoori',
    title: 'Professional Repair Technician',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    testimonial: 'Nexus TechHub provides the best genuine parts with fast delivery. My customers are always satisfied with the quality.',
  },
  {
    id: 2,
    name: 'Fatima Al Zahra',
    title: 'Mobile Repair Shop Owner',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    testimonial: 'The customer support and product range at Nexus TechHub is unmatched. Highly recommended for repair professionals.',
  },
  {
    id: 3,
    name: 'Mohammed Al Farsi',
    title: 'Independent Repair Specialist',
    photo: 'https://randomuser.me/api/portraits/men/56.jpg',
    testimonial: 'I trust Nexus TechHub for all my iPhone and Samsung parts. Their genuine parts program is a game changer.',
  },
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials} aria-labelledby="testimonials-heading">
      <div className={styles.container}>
        <h2 id="testimonials-heading" className={styles.heading}>What Our Customers Say</h2>
        <div className={styles.testimonialsGrid}>
          {testimonialsData.map(({ id, name, title, photo, testimonial }) => (
            <article key={id} className={styles.testimonialCard}>
              <img src={photo} alt={`Photo of ${name}`} className={styles.photo} />
              <blockquote className={styles.quote}>"{testimonial}"</blockquote>
              <p className={styles.customerName}>{name}</p>
              <p className={styles.customerTitle}>{title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
