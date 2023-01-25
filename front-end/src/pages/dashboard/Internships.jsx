import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TbArrowsSort } from "react-icons/tb";
import { MdFilterList } from "react-icons/md";

const Internships = () => {
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
        <div className="img-container"></div>
        <div className="internship-details">
          <div className="title">
            <h4>Jolirat</h4>
          </div>
          <div className="internship-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              accusantium mollitia, sequi culpa, explicabo ducimus, doloremque
              aliquid illum voluptas beatae non deleniti doloribus dolor nostrum
              earum ab numquam ipsa nulla consequatur eius unde? Adipisci,
              accusantium? Laboriosam, non eligendi, nihil dolor, consequuntur
              ipsam voluptatem ut explicabo debitis fugit necessitatibus?
              Expedita iste voluptatum eaque magni, tempore officia ex ea quasi
              deserunt modi illum accusantium vero at assumenda repellat natus
              tenetur reprehenderit maiores ducimus neque iusto ipsam quo sint
              corrupti. Consequuntur aperiam tenetur soluta nobis omnis nulla
              ducimus nesciunt, repellendus consectetur aliquid similique nam.
              Molestias repellendus harum adipisci temporibus aliquid quasi
              debitis accusamus.
            </p>
          </div>
          <div className="viewMore">
            <button className="viewMore-btn">View More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Internships;
