import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/ASSETS MAIN LANDING PAGE/LANDING IMAGE/Logo.png";
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
  return (
    <section className="landing-page">
      <nav>
        {/* Icons and SIMS */}
        <div className="icon">
          <img src={Logo} alt="Logo.png" />
          <h1>SIMS</h1>
        </div>
        {/* LINKS */}
        <ul className="links">
          {links.map((item, index) => {
            const { path, link } = item;
            return (
              <Link key={index} to={path}>
                {link}
              </Link>
            );
          })}
        </ul>
        <ul className="auth-links">
          {authLinks.map((item, index) => {
            const { path, link } = item;
            return (
              <Link key={index} to={path}>
                {link}
              </Link>
            );
          })}
        </ul>
      </nav>
      <section className="contents"></section>
      <footer></footer>
    </section>
  );
};

export default LandingPage;
