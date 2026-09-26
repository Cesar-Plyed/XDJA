import { FC, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/contactSection.scss';

const ContactSection: FC = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `*New Project Inquiry*\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    const waLink = `https://wa.me/+15743046758?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <h2 className="contact__title">{t('contact.title')}</h2>
        <p className="contact__subtitle">{t('contact.subtitle')}</p>

        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__item">
              <h3 className="contact__item-title">{t('contact.phone')}</h3>
              <a href="tel:+15743046758" className="contact__link">
                +1 (574) 304-6758
              </a>
            </div>
            <div className="contact__item">
              <h3 className="contact__item-title">{t('contact.email')}</h3>
              <a href="mailto:xdjaconstructionllc@gmail.com" className="contact__link">
                xdjaconstructionllc@gmail.com
              </a>
            </div>
            <div className="contact__item">
              <h3 className="contact__item-title">{t('contact.whatsapp')}</h3>
              <a
                href="https://wa.me/+15743046758"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
              >
                {t('contact.whatsapp')}
              </a>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label htmlFor="name" className="contact__label">
                {t('contact.form_name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="contact__input"
                required
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="email" className="contact__label">
                {t('contact.form_email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="contact__input"
                required
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="phone" className="contact__label">
                {t('contact.form_phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="contact__input"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="message" className="contact__label">
                {t('contact.form_project')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="contact__textarea"
                rows={5}
                required
              />
            </div>
            <button type="submit" className="contact__submit">
              {t('contact.form_submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
