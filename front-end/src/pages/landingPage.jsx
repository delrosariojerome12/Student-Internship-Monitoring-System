import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";

import logo from "../assets/img/landingPage/Logo.png";
import landingImg from "../assets/img/landingPage/landing-image.png";
import landingBg from "../assets/img/landingPage/landing-bg.png";

// feature images
import featureImg1 from "../assets/img/landingPage/imageFeature1.png";
import featureImg2 from "../assets/img/landingPage/imageFeature2.png";
import featureImg3 from "../assets/img/landingPage/imageFeature3.png";
import mainMockup from "../assets/img/landingPage/MainMockup.png";
import mockupImage from "../assets/img/landingPage/imageLowerContainer.png";

// id photos
import ivanImage from "../assets/img/landingPage/idPhotos/ivan.svg";
import jeromeImage from "../assets/img/landingPage/idPhotos/jerome.svg";
import jericoImage from "../assets/img/landingPage/idPhotos/jerico.svg";
import jakeImage from "../assets/img/landingPage/idPhotos/jake.svg";
import jezreelImage from "../assets/img/landingPage/idPhotos/jezreel.svg";
import diosaImage from "../assets/img/landingPage/idPhotos/diosa.svg";

// Footer
import socialIcon1 from "../assets/img/landingPage/ICON SOCIALS/FB.png";
import socialIcon2 from "../assets/img/landingPage/ICON SOCIALS/INSTA.png";
import socialIcon3 from "../assets/img/landingPage/ICON SOCIALS/LINKIN.png";
import socialIcon4 from "../assets/img/landingPage/ICON SOCIALS/TWITTER.png";
import { useCallback } from "react";

import { useSelector } from "react-redux";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { IconContext } from "react-icons";
import { FaArrowUp } from "react-icons/fa";

const links = [
  {
    link: "How it Works?",
    path: "/how-it-works",
  },
  {
    link: "Testimonial",
    path: "feature-Content-Img",
  },
  {
    link: "FAQ",
    path: "faq",
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
const handleScroll = (path) => {
  const featureContent = document.getElementById(path);
  featureContent.scrollIntoView({ behavior: "smooth", block: "center" });
};
const teamMembers = [
  {
    name: "Ivan Cedie C. Batario",
    position: "Backend Developer",
    image: ivanImage,
  },
  {
    name: "Jerome D. Ramos",
    position: "Lead Developer",
    image: jeromeImage,
  },
  {
    name: "Jerico B. Balisi",
    position: "Frontend Developer",
    image: jericoImage,
  },
  {
    name: "Diosa D. Tadiosa",
    position: "Documentation/Tester",
    image: diosaImage,
  },
  {
    name: "Jake A. Bristol",
    position: "UI/UX System Designer",
    image: jakeImage,
  },
  {
    name: "Jezreel Dannah D. Menor",
    position: "Documentation/Tester",
    image: jezreelImage,
  },
];

const displayTeam = () => {
  return (
    <div className="the-team-container">
      <div className="text-container-top">
        <p>The Team</p>
      </div>

      <div className="members-container">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className={`member-img${member.image ? "2" : "1"}`}
          >
            {member.image && <img src={member.image} alt="" />}
            <p className="member-name">{member.name}</p>
            <p className="member-position">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false); // Add new state variable
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const handleResize = useCallback(() => {
    setNavbarOpen(false);
  }, []);

  const handleNavbar = useCallback(() => {
    setNavbarOpen(!isNavbarOpen);
  }, [isNavbarOpen]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (isNavbarOpen) {
      window.addEventListener("resize", () => {
        handleResize();
      });
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isNavbarOpen, handleResize]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <IconContext.Provider value={{ className: "icons", color: "#ffff" }}>
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
                const { path, link } = item;
                return (
                  <a key={index} onClick={() => handleScroll(path)}>
                    {link}
                  </a>
                );
              })}
            </ul>
            <ul className="auth-links">
              {user ? (
                <button onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
              ) : (
                authLinks.map((item, index) => {
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
                })
              )}
            </ul>
            {showBackToTop && (
              <button
                className={showBackToTop ? "back-to-top active" : "back-to-top"}
                onClick={handleScrollToTop}
              >
                <FaArrowUp />
              </button>
            )}
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
                number of rendered hours, Daily Time Record, weekly
                accomplishment reports, and other necessary documents.
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
          <div className="feature-contents" id="feature-Content-Img">
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

          <div className="mockup-contents" id="faq">
            <div className="card">
              <div className="text-container">
                <p>Do you need assistance with your internship?</p>
                <p>
                  We've got you covered! SIMS is an easy-to-use online
                  application designed just for your needs!
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

          <div className="main-carousel">
            <div className="text-container-left">
              <p> SIMS</p>
              <p>Frequently Ask Questions</p>
              <p>
                These are the common questions that people often ask. These
                serve as a roadmap for our system.
              </p>
            </div>
            <div className="slides">
              <div className="content">
                <div className="img"></div>
              </div>
              <div className="content">
                <div className="img"></div>
              </div>
              <div className="content">
                <div className="img"></div>
              </div>
              <button className="btn-prev">
                <FaChevronLeft />
              </button>
              <button className="btn-next">
                <FaChevronRight />
              </button>
            </div>
          </div>
          {displayTeam()}
          <div className="aboutUs-container">
            <div className="aboutUs-contents">
              <div className="aboutUs-Text">
                <p>About Us</p>
                <p>
                  As former intern students, we are concerned about the upcoming
                  interns because, through our experience, we all know the
                  struggles they can experience. As a result, our group decided
                  to create a system that can assist the future intern students
                  and make it a lot easier for them, especially tracking their
                  performance during their internship, because this is the most
                  important part of the internship. Each one of us gathers our
                  ideas to come up with the possible features that we can put on
                  the system that will surely benefit the intern students.
                </p>
              </div>
              <div className="getStarted">
                {/* <div className="getStarted-content"> */}
                <div className="getStarted-P">
                  <p>Ready to get started?</p>
                  <p>
                    Discover a quick and simple approach to organize your time
                    and provide guidance throughout your internship.
                  </p>
                </div>
                <button
                  className="btn-CreateAcc"
                  onClick={() => {
                    navigate("/account/signup");
                  }}
                >
                  Create Account
                </button>
                {/* </div> */}
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
    </IconContext.Provider>
  );
};

export default LandingPage;
