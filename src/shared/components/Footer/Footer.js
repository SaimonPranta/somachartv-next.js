import React from "react";
import "./style.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import { SITE_CONFIG } from "@/shared/constants/siteConfig";

const routes = [
  { route: "/", label: "Home" },
  { route: "/about-us", label: "About Us" },
  { route: "/contact", label: "Contact" }, 
  { route: "/privacy-policy", label: "Privacy Policy" },
  { route: "/terms-of-service", label: "Terms of Service" }, 
];

const socialList = [
  {
    svg: <FaFacebookF />,
    link: "https://www.facebook.com/somacharnews",
    color: "#216ed3",
    label: "Facebook",
  },
  {
    svg: <FaTwitter />,
    link: "https://twitter.com/somacharnews",
    color: "#1c9bf1",
    label: "Twitter",
  },
  {
    svg: <FaYoutube />,
    link: "https://www.youtube.com/@somacharnews",
    color: "#ff0000",
    label: "YouTube",
  },
  {
    svg: <FaInstagram />,
    link: "https://www.instagram.com/somacharnews",
    color: "#c038be",
    label: "Instagram",
  },
  {
    svg: <FaLinkedinIn />,
    link: "https://www.linkedin.com/in/somacharnews",
    color: "#0177b5",
    label: "LinkedIn",
  },
];

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container inner-container">
        {/* Social Media Links */}
        <div className="social-section">
          <h6>অনুসরণ করুন</h6>
          <div className="social-container">
            {socialList.map((socialInfo, index) => (
              <a
                key={index}
                href={socialInfo.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${socialInfo.label}`}
                style={{ background: socialInfo.color }}
              >
                {socialInfo.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="links-section">
          <nav className="links" aria-label="Footer Navigation">
            {routes.map((routeInfo, index) => (
              <Link
                key={index}
                href={routeInfo.route}
                title={`Navigate to ${routeInfo.label}`}
              >
                {routeInfo.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright Information */}
        <div className="copy-right">
          <p>
            স্বত্ব © ২০২৪ <strong>{SITE_CONFIG?.name?.bn}</strong>
          </p>
          <p>{`সম্পাদক ও প্রকাশক: ${SITE_CONFIG?.editorAndPublisher?.bn}`}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
