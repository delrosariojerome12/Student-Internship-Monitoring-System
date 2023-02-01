import React, { useState } from "react";
import { FaRegEdit, FaRegCheckCircle } from "react-icons/fa";

const Internship = () => {
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  const handleDetails = () => {
    setDetailsOpen(!isDetailsOpen);
  };

  return (
    <section className="coordinator-internship">
      {/* overlays */}

      {isDetailsOpen && (
        <div className="create-overlay">
          <div className="create-modal">
            <div className="create-container">
              <div className="top">
                <div className="left"></div>
                <div className="right">
                  <label htmlFor="">
                    <h4>
                      Title <b>(Company Name)</b>
                    </h4>
                    <input type="text" placeholder="Enter a company name" />
                  </label>
                </div>
              </div>
              <div className="text">
                <label htmlFor="">
                  <h5>Description</h5>
                  <textarea></textarea>
                </label>
              </div>
              <div className="btnContainer">
                <button className="back-btn" onClick={handleDetails}>
                  Back
                </button>
                <button className="next-btn">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="next-overlay">
        <div className="confirmation-modal">
          <div className="confirm-container">
            <div className="left">
              <span>
                <FaRegEdit />
              </span>
            </div>
            <div className="right">
              <h3>Jolirat</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
                quas et praesentium excepturi quod optio sint facilis magnam
                commodi accusantium iste, voluptate, veritatis rem quia dolor
                magni consectetur facere. Corporis eaque quo perspiciatis
                voluptatum dolorum dignissimos saepe voluptatem rem officiis
                iusto culpa assumenda, optio vel! At veniam architecto
                recusandae tenetur accusantium ducimus quia quis fuga sequi ipsa
                dolorum magni ipsum molestias enim quasi itaque illum assumenda,
                quisquam quo, quaerat praesentium modi ad eveniet pariatur! Eos
                itaque a reprehenderit voluptas, saepe inventore. Dolorem
                laboriosam deserunt facere iure quaerat, esse cupiditate
                deleniti enim fugiat veniam a eius obcaecati quibusdam mollitia
                error numquam debitis reprehenderit recusandae tempore quam fuga
                voluptatum ullam. Eaque cupiditate molestiae obcaecati aliquid,
                voluptatem assumenda similique facere eligendi! Labore incidunt
                doloribus perspiciatis a, ratione velit sint fuga impedit dolore
                voluptates corporis ipsa magni molestiae nam iusto. Corrupti
                eius nisi quibusdam recusandae sapiente expedita tempore,
                commodi soluta minima ipsum, ipsa eveniet, nostrum odit aliquid
                sunt. Aut ex inventore consectetur vitae quo illum aliquam,
                obcaecati odit eius sint quos eligendi tenetur dolorem
                laudantium repudiandae nesciunt omnis, neque recusandae porro
                eum eveniet minima aspernatur! Doloremque vero delectus, quasi,
                et hic blanditiis ipsam quos voluptates laborum earum
                aspernatur. Omnis inventore voluptatibus quisquam est nemo.
              </p>
            </div>
            <div className="btnContainer">
              <button className="back">Back</button>
              <button className="confirm">Confirm</button>
            </div>
          </div>
        </div>
      </div>

      <div className="success-overlay">
        <div className="success-modal">
          <div className="success-icons">
            <span>
              <FaRegCheckCircle />
            </span>
            <h3>Successfully Added!</h3>
            <div className="return">
              <button className="return-btn">Return</button>
            </div>
          </div>
        </div>
      </div>

      <div className="view-overlay">
        <div className="view-modal">
          <div className="view-container">
            <div className="left">
              <span>
                <FaRegEdit />
              </span>
            </div>
            <div className="right">
              <h3>Jolirat</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
                quas et praesentium excepturi quod optio sint facilis magnam
                commodi accusantium iste, voluptate, veritatis rem quia dolor
                magni consectetur facere. Corporis eaque quo perspiciatis
                voluptatum dolorum dignissimos saepe voluptatem rem officiis
                iusto culpa assumenda, optio vel! At veniam architecto
                recusandae tenetur accusantium ducimus quia quis fuga sequi ipsa
                dolorum magni ipsum molestias enim quasi itaque illum assumenda,
                quisquam quo, quaerat praesentium modi ad eveniet pariatur! Eos
                itaque a reprehenderit voluptas, saepe inventore. Dolorem
                laboriosam deserunt facere iure quaerat, esse cupiditate
                deleniti enim fugiat veniam a eius obcaecati quibusdam mollitia
                error numquam debitis reprehenderit recusandae tempore quam fuga
                voluptatum ullam. Eaque cupiditate molestiae obcaecati aliquid,
                voluptatem assumenda similique facere eligendi! Labore incidunt
                doloribus perspiciatis a, ratione velit sint fuga impedit dolore
                voluptates corporis ipsa magni molestiae nam iusto. Corrupti
                eius nisi quibusdam recusandae sapiente expedita tempore,
                commodi soluta minima ipsum, ipsa eveniet, nostrum odit aliquid
                sunt. Aut ex inventore consectetur vitae quo illum aliquam,
                obcaecati odit eius sint quos eligendi tenetur dolorem
                laudantium repudiandae nesciunt omnis, neque recusandae porro
                eum eveniet minima aspernatur! Doloremque vero delectus, quasi,
                et hic blanditiis ipsam quos voluptates laborum earum
                aspernatur. Omnis inventore voluptatibus quisquam est nemo.
              </p>
            </div>
            <div className="btnContainer">
              <button className="back">Back</button>
            </div>
          </div>
        </div>
      </div>

      {/* page-content */}

      <form action="">
        <input type="text" />
      </form>

      <div className="btn-container">
        <button className="create" onClick={handleDetails}>
          Create
        </button>
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
      </div>

      <div className="bottom">
        <div className="img-container">
          <span>
            <FaRegEdit />
          </span>
        </div>
        <div className="internship-details">
          <div className="title">
            <h4>Jolirat</h4>
            <span>
              <FaRegEdit />
            </span>
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

export default Internship;
