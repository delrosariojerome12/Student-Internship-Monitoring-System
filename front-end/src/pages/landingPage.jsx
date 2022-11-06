import React from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/img/landingPage/Logo.png";
import landingImg from "../assets/img/landingPage/landing-image.png";
import landingBg from "../assets/img/landingPage/landing-bg.png";

import landingBgDark from "../assets/img/landingPage/darkBg.png";
import landingBgDark2 from "../assets/img/landingPage/darkBg2.png";
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
        {/* Icons and SIMS */}
        <div className="icon">
          <img src={logo} alt="Logo.png " />
          <h2>SIMS</h2>
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
            <p>A web-based system</p>
            <p>
              that monitors the progress of student’s internship performance and
              state. The essence of this system is to provide clear and valid
              data; those includes the number of rendered hours, the time-in and
              time-outs, over-times, daily and weekly accomplishment tasks. The
              system's h1 point is making it easy for students to gather the
              necessary documents for their narrative report. On the other side,
              OJT coordinator have his own interface in the system by which he
              can see that current state of his students.
            </p>
            <p> Beneficiaries: • Students • OJT Coordinators</p>
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
            {/* <div className="feature-BG"></div> */}
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
          <div className="mockup-bg1">
            <div className="mockup-inner-content">
              <div className="text-mockup">
                <h1>Do you need assistance with your internship?</h1>
                <p>
                  We've got you covered! SIMS is an easy-to-use online
                  application designed just for your needs!
                </p>
                <p>
                  Support you in managing your internship fast, efficiently, and
                  without trouble.
                </p>
                <img src={mockupImage} alt="" />
              </div>
              <div className="mockup-inner"></div>
            </div>
            <div className="mockup-bg2"></div>
            <div className="mockup-image1">
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
            <div className="social">
              <img src={socialIcon1} alt="" />
            </div>
            <div className="social">
              <img src={socialIcon2} alt="" />
            </div>
            <div className="social">
              <img src={socialIcon3} alt="" />
            </div>
            <div className="social">
              <img src={socialIcon4} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default LandingPage;
