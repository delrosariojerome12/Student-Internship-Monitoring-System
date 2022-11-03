import React from "react";
import {Link, useNavigate} from "react-router-dom";

import logo from "../assets/img/landingPage/Logo.png";
import landingImg from "../assets/img/landingPage/landing-image.png";
import landingBg from "../assets/img/landingPage/landing-bg.png";

const links = [
  {
    link: "How it Works?",
    path: "/how-it-works",
  },
  {
    link: "Testimonial",
    path: "/testimonials",
  },
  {
    link: "FAQ",
    path: "/faqs",
  },
  {
    link: "About Us ",
    path: "/about-us",
  },
];
const authLinks = [
  {
    link: "Signup",
    path: "/account/signup",
  },
  {
    link: "Login",
    path: "/account/login",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <section className="landing-page">
      <nav>
        {/* Icons and SIMS */}
        <div className="icon">
          <img src={logo} alt="Logo.png " />
          <h1>SIMS</h1>
        </div>
        {/* LINKS */}
        <ul className="links">
          {links.map((item, index) => {
            const {path, link} = item;
            return (
              <Link key={index} to={path}>
                {link}
              </Link>
            );
          })}
        </ul>
        <ul className="auth-links">
          {authLinks.map((item, index) => {
            const {path, link} = item;
            return (
              <button
                onClick={() => {
                  navigate(path);
                }}
                key={index}
              >
                {link}
              </button>
            );
          })}
        </ul>
      </nav>
      <section className="contents">
        <div className="landing-contents">
          <div className="text">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
              iste repellendus illum molestiae aspernatur reiciendis nemo
              nesciunt, iure voluptates? Maiores exercitationem nihil numquam
              quod ipsum sequi, fugit eum placeat officia!
            </p>
          </div>
          <div className="img-container">
            <img src={landingImg} alt="" />
          </div>
        </div>
        <div className="feature-contents"></div>
        <div className="mockup-contents"></div>
      </section>
      <footer></footer>
    </section>
  );
};

export default LandingPage;
