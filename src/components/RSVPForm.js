import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import '../App.css';

function RSVPForm() {
  const { t } = useTranslation();
  const [isAttending, setIsAttending] = useState(null);
  const [guestCount, setGuestCount] = useState(0);
  const [guestNames, setGuestNames] = useState([]);
  const [hasDiet, setHasDiet] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const formRef = useRef();

  const handleAttendanceChange = (e) => {
    const value = e.target.value === 'yes';
    setIsAttending(value);
    setGuestCount(0);
    setGuestNames([]);
    setHasDiet(false);
    setThankYou(false);
  };

  const handleGuestCountChange = (e) => {
    const val = e.target.value;
    const count = val === '' ? 0 : parseInt(val, 10);
    setGuestCount(count);
    setGuestNames(Array(count).fill(''));
  };

  const handleGuestNameChange = (index, value) => {
    const updatedNames = [...guestNames];
    updatedNames[index] = value;
    setGuestNames(updatedNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_vbvmp2a',
        'template_uwucw3h',
        formRef.current,
        'yL0eTB9XYb4nHqG7y'
      )
      .then(() => setThankYou(true))
      .catch((error) => console.error('EmailJS Error:', error));
  };

  return (
    <form className="rsvp-form" onSubmit={handleSubmit} ref={formRef}>
      <h3>{t('rsvp.title')}</h3>

      {/* Keep hidden field in English for consistent EmailJS data */}
      <input type="hidden" name="is_attending" value={isAttending ? 'Yes' : 'No'} />

      
        <label><strong>{t('rsvp.attendanceQuestion')}</strong></label>
        <label>
          <input
            type="radio"
            name="attendance"
            value="yes"
            onChange={handleAttendanceChange}
            required
          />{' '}
          {t('rsvp.yesCantWait')}
        </label>
        <label>
          <input
            type="radio"
            name="attendance"
            value="no"
            onChange={handleAttendanceChange}
          />{' '}
          {t('rsvp.noCantMakeIt')}
        </label>
      

      {isAttending === true && (
        <div className="attending-section">
          <label><strong>{t('rsvp.guestCountQuestion')}</strong></label>
          <select value={guestCount || ''} onChange={handleGuestCountChange}>
            <option value="">{t('rsvp.select')}</option>
            {[...Array(6)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <input type="hidden" name="guest_count" value={guestCount} readOnly />

          <div className="guest-names-grid">
            {guestNames.map((name, i) => (
              <div className="guest-input" key={i}>
                <label>{t('rsvp.guestName', { index: i + 1 })}</label>
                <input
                  type="text"
                  name="guest_names"
                  value={name}
                  onChange={(e) => handleGuestNameChange(i, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          <label><strong>{t('rsvp.dietQuestion')}</strong></label>
          <label>
            <input
              type="radio"
              name="dietOption"
              onChange={() => setHasDiet(false)}
            />{' '}
            {t('rsvp.no')}
          </label>
          <label>
            <input
              type="radio"
              name="dietOption"
              onChange={() => setHasDiet(true)}
            />{' '}
            {t('rsvp.yes')}
          </label>

          {hasDiet && (
            <div>
              <label>{t('rsvp.dietSpecify')}</label>
              <input type="text" name="diet" />
            </div>
          )}

          <label><strong>{t('rsvp.songPrompt')}</strong></label>
          <input type="text" name="song_request" placeholder={t('rsvp.optional')} />

          <label><strong>{t('rsvp.notesPrompt')}</strong></label>
          <textarea name="notes" rows="4" placeholder={t('rsvp.optional')}></textarea>

          <label><strong>{t('rsvp.emailOptional')}</strong></label>
          <input type="email" name="email" placeholder={t('rsvp.optional')} />
        </div>
      )}

      {isAttending === false && (
        <div className="not-attending-section">
          <label><strong>{t('rsvp.notAttendingNamePrompt')}</strong></label>
          <input type="text" name="guest_names" required />
        </div>
      )}

      <button type="submit">{t('rsvp.submit')}</button>

      {thankYou && (
        <p className="thank-you">
          {isAttending ? t('rsvp.thankYouAttending') : t('rsvp.thankYouNotAttending')}
        </p>
      )}
    </form>
  );
}

export default RSVPForm;
