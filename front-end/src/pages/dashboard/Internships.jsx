import React, {useState, useEffect} from "react";
import {BiSearchAlt} from "react-icons/bi";
import {TbArrowsSort} from "react-icons/tb";
import {MdFilterList} from "react-icons/md";
import {FaArrowRight, FaArrowUp} from "react-icons/fa";
import pic from "../../assets/img/bg.png";
import {useSelector, useDispatch} from "react-redux";

const Internships = () => {
  useEffect(() => {}, []);

  return (
    <section className="internship-container-intern">
      <header></header>
      <div className="btn-contoller"></div>
      <div className="content"></div>
    </section>
  );
};

export default Internships;
