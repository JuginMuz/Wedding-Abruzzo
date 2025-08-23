import React, { useState, useRef } from "react";
import './i18n';
import { useTranslation } from 'react-i18next';
import Navbar from "./components/Navbar";
import foto from "./assets/foto.jpg";
import toast from "./assets/toast.jpg";
import location from "./assets/location.jpeg";
import './App.css';
import Header from "./components/Header";
import RSVPForm from './components/RSVPForm';
import Footer from "./components/Footer";

function App() {

  const [section, setSection] = useState("home");
  const rsvpRef = useRef(null);


  const showAndScrollToRSVP = () => {
  setSection("rsvp");

  // Delay the scroll slightly so the section is visible before scrolling
  setTimeout(() => {
    if (rsvpRef.current) {
      rsvpRef.current.scrollIntoView({ behavior: "smooth" });
    }
   }, 200);
  };

  const { t, i18n } = useTranslation();


  return (
    <div className="App">

      <div className="language-switcher" role="navigation" aria-label="Language switcher">
        <button
          type="button"
          className={i18n.language?.startsWith('it') ? 'active' : ''}
          onClick={() => i18n.changeLanguage('it')}
        >
          IT
        </button>
        <button
          type="button"
          className={i18n.language?.startsWith('en') ? 'active' : ''}
          onClick={() => i18n.changeLanguage('en')}
        >
          EN
        </button>
      </div>


      <div className="background-wrapper">
        <div className="main-content">
          <Header onRSVPClick={showAndScrollToRSVP}/>
          
          <Navbar currentSection={section} onSelect={setSection} />

          <div className="content-sections">
            <section className="home-section" style={{ display: section === "home" ? "block" : "none" }}>
              <h3>{t('home.title')}</h3>
              <img src={foto} alt=""/>
            </section>

            <section className="ourday-section" style={{ display: section === "our-day" ? "block" : "none" }}>
              <h3 dangerouslySetInnerHTML={{ __html: t('ourday.title') }} />
              {t('ourday.p1')} <br></br><br></br>
              {t('ourday.p2')} <br></br><br></br>
              <img src={toast} alt=""/><br></br>
              {t('ourday.p3')}<br></br><br></br>
              {t('ourday.p4')}
            </section>

            <section className="travel-section" style={{ display: section === "travel" ? "block" : "none" }}>
              <h3>{t('travel.locationTitle')}</h3>
              <img src={location} alt="" /><br></br>
              {t('travel.locationP1')}<br></br><br></br>
              {t('travel.locationP2')}

              <h3>{t('travel.infoTitle')}</h3>
              {t('travel.infoP1')}<br></br><br></br>
              {t('travel.infoP2')}
            </section>

            <section className="gifts-section" style={{ display: section === "gifts" ? "block" : "none" }}>
              <h3>{t('gifts.title')}</h3>
              {t('gifts.p1')}<br></br><br></br><br></br>
              {t('gifts.p2')}<br></br><br></br><br></br>
              {t('gifts.p3')}<br></br><br></br><br></br>

              {t('gifts.accountHolder')}<br></br>
              {t('gifts.iban')}<br></br>
              {t('gifts.bic')}<br></br>
              {t('gifts.description')}
            </section>

            <section className="qa-section" style={{ display: section === "qa" ? "block" : "none" }}>

              <h3>{t('qa.q1.title')}</h3>
              <p>{t('qa.q1.body')}</p>

              <h3>{t('qa.q2.title')}</h3>
              <p>{t('qa.q2.body')}</p>

              <h3>{t('qa.q3.title')}</h3>
              <p>{t('qa.q3.body')}</p>

              <h3>{t('qa.q4.title')}</h3>
              <p>{t('qa.q4.body')}</p>

              <h3>{t('qa.q5.title')}</h3>
              <p>{t('qa.q5.body')}</p>

              <h3>{t('qa.q6.title')}</h3>
              <p>{t('qa.q6.body')}</p>

              <h3>{t('qa.q7.title')}</h3>
              <p>{t('qa.q7.body')}</p>

            </section>

            <section className="rsvp-section" id="rsvp" ref={rsvpRef} style={{ display: section === "rsvp" ? "block" : "none" }}>
              <RSVPForm />
            </section>
          </div>

          <Footer />
          
        </div> 
      </div> 
    </div>
  );
}

export default App;
