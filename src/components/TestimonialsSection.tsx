import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/testimonialsSection.scss';

const TestimonialsSection: FC = () => {
  const { t } = useI18n();

  const testimonials = [
    {
      id: 1,
      author: t('testimonials.testimonial1_author'),
      role: t('testimonials.testimonial1_role'),
      text: t('testimonials.testimonial1_text'),
      rating: 5,
    },
    {
      id: 2,
      author: t('testimonials.testimonial2_author'),
      role: t('testimonials.testimonial2_role'),
      text: t('testimonials.testimonial2_text'),
      rating: 5,
    },
    {
      id: 3,
      author: t('testimonials.testimonial3_author'),
      role: t('testimonials.testimonial3_role'),
      text: t('testimonials.testimonial3_text'),
      rating: 5,
    },
  ];

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <h2 className="testimonials__title">{t('testimonials.title')}</h2>
        <div className="testimonials__grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-card__rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="testimonial-card__star">★</span>
                ))}
              </div>
              <p className="testimonial-card__text">"{testimonial.text}"</p>
              <div className="testimonial-card__author">
                <p className="testimonial-card__name">{testimonial.author}</p>
                <p className="testimonial-card__role">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
