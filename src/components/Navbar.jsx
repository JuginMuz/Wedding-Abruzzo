import { useTranslation } from "react-i18next";
import "./Navbar.css";

const Navbar = ({ currentSection, onSelect }) => {
  const { t } = useTranslation();

  // IDs stay the same for app logic; labels come from i18n
  const items = [
    { id: "home",    label: t("nav.home") },
    { id: "our-day", label: t("nav.ourDay") },
    { id: "travel",  label: t("nav.travel") },
    { id: "gifts",   label: t("nav.gifts") },
    { id: "qa",      label: t("nav.qa") },
    { id: "rsvp",    label: t("nav.rsvp") },
  ];

  return (
    <nav className="navbar" aria-label="Main navigation">
      {items.map((item) => (
        <button
          key={item.id}
          className={`nav-link ${currentSection === item.id ? "active" : ""}`}
          onClick={() => onSelect(item.id)}
          aria-current={currentSection === item.id ? "page" : undefined}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
