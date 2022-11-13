import React from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/img/landingPage/Logo.png";
import landingImg from "../assets/img/landingPage/landing-image.png";
import landingBg from "../assets/img/landingPage/landing-bg.png";

// feature images
import featureImg1 from "../assets/img/landingPage/imageFeature1.png";
import featureImg2 from "../assets/img/landingPage/imageFeature2.png";
import featureImg3 from "../assets/img/landingPage/imageFeature3.png";
// import featureBg from "../assets/img/landingPage/featureBg.png";
import mainMockup from "../assets/img/landingPage/MainMockup.png";
import mockupImage from "../assets/img/landingPage/imageLowerContainer.png";
// Footer
import socialIcon1 from "../assets/img/landingPage/ICON SOCIALS/FB.png";
import socialIcon2 from "../assets/img/landingPage/ICON SOCIALS/INSTA.png";
import socialIcon3 from "../assets/img/landingPage/ICON SOCIALS/LINKIN.png";
import socialIcon4 from "../assets/img/landingPage/ICON SOCIALS/TWITTER.png";

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
        <div className="icon">
          <img src={logo} alt="Logo.png " />
          <h2>SIMS</h2>
        </div>
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
            <h3>Student Internship Monitoring System</h3>
            <p>A web application</p>
            <p>
              that helps OJT coordinators and students monitor the progress of
              the latter's internship performance and status including the
              number of rendered hours, Daily Time Record, weekly accomplishment
              reports, and other necessary documents.
            </p>

            <div className="darkbg"></div>
            <div className="darkbg2"></div>
          </div>
          <div className="img-container">
            <img className="landingImg" src={landingImg} alt="" />
            <img className="landingBg" src={landingBg} alt="" />
          </div>
        </div>
        <div className="feature-contents">
          <div className="feature-Content-Img">
            <div className="img-features">
              <img src={featureImg1} alt="" />
            </div>
            <div className="img-features">
              <img src={featureImg2} alt="" />
            </div>
            <div className="img-features">
              <img src={featureImg3} alt="" />
            </div>
          </div>
        </div>
        <div className="mockup-contents">
          <div className="card">
            <div className="text">
              <p>Do you need assistance with your internship?</p>
              <p>
                We've got you covered! SIMS is an easy-to-use online application
                designed just for your needs!
              </p>
              <p>
                Support you in managing your internship fast, efficiently, and
                without trouble.
              </p>
              <div className="img-con">
                <img src={mockupImage} alt="" />
              </div>
            </div>
            <div className="img-con">
              <img src={mainMockup} alt="" />
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer-content">
          <div className="icon">
            <img src={logo} alt="Logo.png " />
            <h2>SIMS</h2>
          </div>
          <div className="socials-img">
            <img src={socialIcon1} alt="" />
            <img src={socialIcon2} alt="" />
            <img src={socialIcon3} alt="" />
            <img src={socialIcon4} alt="" />
          </div>
        </div>
      </footer>
    </section>
  );
};

export default LandingPage;
