import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TbArrowsSort } from "react-icons/tb";
import { MdFilterList } from "react-icons/md";

const InternshipsComponents = () => {
  return (
    <section className="internship">
      <header>
        <h2>Looking for Internship?</h2>
        <p>
          Are you finding a hard time looking for internship? We got you! SIMS
          is here to assist you in finding an internship that suits your chosen
          fieldsh
        </p>
      </header>
      <div className="mid">
        <div className="left">
          <button className="sort-by">
            <span>
              <TbArrowsSort />
            </span>
            Sort-by
          </button>
          <button className="filter">
            <span>
              <MdFilterList />
            </span>
            Filter
          </button>
        </div>
        <div className="right">
          <span>
            <BiSearchAlt />
          </span>
          <input placeholder="Search" type="text" />
        </div>
      </div>
      <div className="bottom">
        <div className="main-content">
          <div className="left-img"></div>
          <div className="right-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            repellat dolores id saepe qui. Ad ullam a sed! Praesentium omnis
            minus aliquam facere eum odio dolor saepe, modi dicta illo natus!
            Atque, obcaecati sint! Quam qui, maiores ex molestias expedita velit
            labore ab deleniti quos laudantium quo, odio aspernatur harum!
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipsComponents;
