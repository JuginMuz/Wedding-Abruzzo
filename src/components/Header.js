import React from "react";
import { useTranslation } from "react-i18next";
import "./Header.css";

const Header = ({ onRSVPClick }) => {
  const { t, i18n } = useTranslation();

  // Set your wedding date here once
  const weddingDate = new Date("2026-09-05T00:00:00");

  // Locale-aware parts
  const monthLong = new Intl.DateTimeFormat(i18n.language, { month: "long" }).format(weddingDate);
  const day = new Intl.DateTimeFormat(i18n.language, { day: "2-digit" }).format(weddingDate);
  const year = new Intl.DateTimeFormat(i18n.language, { year: "numeric" }).format(weddingDate);

  // English usually shows a comma, many other locales don’t
  const isEnglish = i18n.language?.startsWith("en");
  const line1 = isEnglish ? `${day} ${monthLong}` : `${day} ${monthLong}`;

  return (
    <header className="wedding-header">
      <div className="header-inner">
        
        {/* Title */}
        <h1 className="header-title">{t("header.title")}</h1>

        <div className="header-details">
          {/* Left: Month on first line, Day + Year on second */}
          <div className="detail-left">
            {line1}
            <br />
            {year}
          </div>

          {/* Center: divider + RSVP button */}
          <div className="detail-center">
            <div className="detail-divider" />
            <button className="rsvp-button" onClick={onRSVPClick}>
              {t("header.rsvp")}
            </button>
          </div>

          {/* Right: City + Country (translated) */}
          <div className="detail-right">
            Abruzzo
            <br />
            {t("header.country")}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
