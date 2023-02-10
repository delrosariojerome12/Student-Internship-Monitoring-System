import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {HiMenu} from "react-icons/hi";

import logo from "../assets/img/landingPage/Logo.png";
import landingImg from "../assets/img/landingPage/landing-image.png";
import landingBg from "../assets/img/landingPage/landing-bg.png";

// feature images
import featureImg1 from "../assets/img/landingPage/imageFeature1.png";
import featureImg2 from "../assets/img/landingPage/imageFeature2.png";
import featureImg3 from "../assets/img/landingPage/imageFeature3.png";
import mainMockup from "../assets/img/landingPage/MainMockup.png";
import mockupImage from "../assets/img/landingPage/imageLowerContainer.png";
// Footer
import socialIcon1 from "../assets/img/landingPage/ICON SOCIALS/FB.png";
import socialIcon2 from "../assets/img/landingPage/ICON SOCIALS/INSTA.png";
import socialIcon3 from "../assets/img/landingPage/ICON SOCIALS/LINKIN.png";
import socialIcon4 from "../assets/img/landingPage/ICON SOCIALS/TWITTER.png";
import {useCallback} from "react";

import {useSelector} from "react-redux";

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
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.user);

  const handleResize = useCallback(() => {
    setNavbarOpen(false);
  }, []);

  const handleNavbar = useCallback(() => {
    setNavbarOpen(!isNavbarOpen);
  }, [isNavbarOpen]);

  useEffect(() => {
    if (isNavbarOpen) {
      window.addEventListener("resize", () => {
        handleResize();
      });
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isNavbarOpen, handleResize]);

  return (
    <section className="landing-page">
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo.png " />
          <h2>SIMS</h2>
        </div>
        <div
          className={
            isNavbarOpen ? "link-container active-drop" : "link-container"
          }
        >
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
            {user ? (
              <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            ) : (
              authLinks.map((item, index) => {
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
              })
            )}
          </ul>
        </div>
        <span
          className={isNavbarOpen ? "menu-icon active" : "menu-icon"}
          onClick={handleNavbar}
        >
          <HiMenu />
        </span>
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
            <div className="bg3">
              <img className="landingImg" src={landingImg} alt="" />
              <img className="landingBg" src={landingBg} alt="" />
            </div>
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
            <div className="text-container">
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
            <div className="mobile-img">
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
