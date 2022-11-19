import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import {requestVerification} from "../features/user/userReducer";
const Pending = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState([
    {
      type: "select",
      id: "internship-type",
      options: ["Onsite", "Online"],
    },
    {
      type: "list",
      id: "duties",
      forInput: "Duties",
      value: "",
    },
    {
      type: "text",
      id: "company-name",
      forInput: "Company Name",
      value: "",
    },
    {
      type: "text",
      id: "company-address",
      forInput: "Company Address",
      value: "",
    },
    {
      type: "text",
      id: "supervisor",
      forInput: "Supervisor",
      value: "",
    },
    {
      type: "text",
      id: "supervisor-contact",
      forInput: "Supervisor Contact",
      value: "",
    },
    {
      type: "text",
      id: "required-hours",
      forInput: "Required Hours",
      value: "",
    },
    {
      type: "image",
      id: "valid-id",
      forInput: "",
      value: "",
    },
  ]);

  const renderInputs = () => {
    return form.map((item, index) => {
      const {type, id, value, forInput} = item;
      switch (type) {
        case "text":
          return (
            <div className="input-contain" key={index}>
              <input type={type} name={forInput} />
              <div className="placeholder-container">
                <label
                  htmlFor={id}
                  className={
                    forInput ? "placeholder-text active" : "placeholder-text"
                  }
                >
                  <div className="text">{forInput}</div>
                </label>
              </div>
            </div>
          );
        case "image":
          return (
            <div className="img-input" key={index}>
              <label htmlFor="valid-img">School ID</label>
              <input type="file" name="valid-img" id="valid-img" />
            </div>
          );
        case "select":
          const {options} = item;
          return <Select key={index} />;
        case "list":
          return (
            <div className="input-contain" key={index}>
              <input type={type} name={forInput} />
              <div className="placeholder-container">
                <label
                  htmlFor={id}
                  className={
                    forInput ? "placeholder-text active" : "placeholder-text"
                  }
                >
                  <div className="text">{forInput}</div>
                </label>
              </div>
            </div>
          );
      }
    });
  };

  return (
    <div className="pending">
      <p>Fill up few more details and you are ready!</p>
      <button onClick={() => setModalOpen(!isModalOpen)}>Verify Account</button>
      <div className="modal">
        <form>
          <h3>Internship Details</h3>
          {renderInputs()}
        </form>
      </div>
    </div>
  );
};

export default Pending;
