/** @format */

import React, { useCallback, useEffect, useState } from "react";
import Internship from "../../components/coordinator/Internship";
import { useSelector, useDispatch } from "react-redux";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../serverError";
import {
  getAllInternship,
  updateInternship,
  deleteInternship,
  handleEdit,
  handleView,
  createInternship,
  handleMessage,
} from "../../features/coordinator/internship";
import { handleAdd } from "../../features/coordinator/internship";
import CreatableSelect from "react-select/creatable";

import { storage } from "../../Firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

import noImageDark from "../../assets/img/noimageDark.svg";
import NoDocumentSvg from "../../assets/img/waiting.svg";

import ViewModal from "../../components/coordinator/ViewModal";
import EditModal from "../../components/coordinator/EditModal";

const Internships = React.memo(() => {
  const {
    internships,
    isLoading,
    isError,
    isEditOpen,
    isViewOpen,
    isAddOpen,
    requestMessage,
    isMessageOpen,
    selectedInternship,
  } = useSelector((state) => state.internship);
  const dispatch = useDispatch();

  const [form, setForm] = useState([
    {
      type: "text",
      id: "company-name",
      forInput: "Company Name",
      value: "",
      isError: false,
      errorMessage: "Atleast 2 characters and max of 75",
      isDisabled: false,
      code: "companyName",
    },
    {
      type: "text",
      id: "company-address",
      code: "companyAddress",
      forInput: "Company Address",
      value: "",
      isError: false,
      errorMessage: "Atleast 5 characters and max of 100",
      isDisabled: false,
    },
    {
      type: "text",
      id: "supervisor",
      code: "supervisor",
      forInput: "Supervisor",
      value: "",
      isError: false,
      errorMessage: "Atleast 2 characters and  max of 50",
      isDisabled: false,
    },
    {
      type: "text",
      id: "supervisor-contact",
      code: "supervisorContact",
      forInput: "Supervisor Contact",
      value: "",
      isError: false,
      errorMessage: "This phone number format is not recognized.",
      isDisabled: false,
    },
    {
      type: "email",
      id: "email",
      code: "email",
      forInput: "Email",
      value: "",
      isError: false,
      errorMessage: "Please provide valid email.",
      isDisabled: false,
    },
    {
      type: "list",
      id: "duties",
      forInput: "Duties",
      value: "",
      isDisabled: false,
      code: "typeOfWork",
      valuePlaceholder: {
        value: "Duties",
        label: "Duties",
      },
      optionItems: [
        {
          value: "Encoding",
          label: "Encoding",
        },
        {
          value: "Paper Works",
          label: "Paper Works",
        },
        {
          value: "Sofware Development",
          label: "Sofware Development",
        },
        {
          value: "Hardware Related",
          label: "Hardware Related",
        },
        {
          value: "Not specified",
          label: "Not specified",
        },
      ],
    },
    {
      type: "image",
      id: "logo",
      code: "logo",
      forInput: "Logo",
      value: "",
      isError: false,
      errorMessage: "",
      isDisabled: false,
      name: "",
      link: "",
    },
    {
      type: "textArea",
      id: "description",
      forInput: "Description",
      value: "",
      isError: false,
      errorMessage: "Atleast 20 characters and max of 100",
      isDisabled: false,
      code: "description",
      minLength: 20,
      maxLength: 100,
    },
  ]);
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    dispatch(getAllInternship());
  }, []);

  if (!internships) {
    return <Bouncing />;
  }
  if (isLoading) {
    return <Bouncing />;
  }
  if (isError) {
    return <ServerError />;
  }

  const renderInternship = () => {
    if (internships.length > 0) {
      return (
        <div className="content">
          {internships.map((item, index) => (
            <Internship key={index} internship={item} editForm={editForm} />
          ))}
          <div className={isMessageOpen ? "message-con active" : "message-con"}>
            <p>{requestMessage}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="no-internship">
        <h3>
          No existing <b>internships</b> at the moment.
        </h3>
        <img src={NoDocumentSvg} alt="no-internship" />
      </div>
    );
  };

  const checkCompletion = () => {
    let numOfErrors = 0;
    let numOfValues = 0;

    form.forEach((item) => {
      item.isError && numOfErrors++;
      item.value && numOfValues++;
    });

    const lengthForms = form.length;

    if (numOfErrors === 0 && numOfValues - 1 === lengthForms - 1) {
      setComplete(true);
    } else {
      setComplete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const clearValue = () => {
    const newForm = form.map((item) => {
      return item.type === "image"
        ? {
            ...item,
            value: "",
            isDisabled: false,
            name: "",
            link: "",
          }
        : item.type === "list"
        ? {
            ...item,
            isDisabled: false,
            valuePlaceholder: {
              value: "Duties",
              label: "Duties",
            },
            value: "",
          }
        : { ...item, value: "" };
    });
    setForm(newForm);
    setComplete(false);
  };
  const convertForm = (form) => {
    const newData = form.map((input) => {
      const { code, value, name } = input;
      if (name) {
        return {
          code,
          value,
          name,
        };
      }
      return {
        code,
        value,
      };
    });

    const newObject = Object.assign(
      {},
      ...newData.map((item) =>
        !item.name
          ? { [item.code]: item.value }
          : { [item.code]: { link: item.value, name: item.name } }
      )
    );

    return newObject;
  };

  const handleOnChange = (value, index) => {
    const newForm = [...form];
    const inputField = newForm[index].id;
    switch (inputField) {
      case "company-name":
        value.length >= 2 && value.length <= 75
          ? (newForm[index].isError = false)
          : (newForm[index].isError = true);
        newForm[index].value = value;
        setForm(newForm);
        checkCompletion();
        return;
      case "company-address":
        value.length >= 5 && value.length <= 100
          ? (newForm[index].isError = false)
          : (newForm[index].isError = true);
        newForm[index].value = value;
        setForm(newForm);
        checkCompletion();
        return;
      case "supervisor":
        value.length >= 2 && value.length <= 50
          ? (newForm[index].isError = false)
          : (newForm[index].isError = true);
        newForm[index].value = value;
        setForm(newForm);
        checkCompletion();
        return;
      case "supervisor-contact":
        newForm[index].value = value;
        const passwordRegex = /^(09|\+639)\d{9}$/;
        let isConctactValid = passwordRegex.test(value);
        if (isConctactValid) {
          newForm[index].isError = false;
        } else {
          newForm[index].isError = true;
        }
        setForm(newForm);
        checkCompletion();
        return;
      case "logo":
        if (value) {
          const { name, type } = value;
          if (!type.includes("image")) {
            newForm[index].isError = true;
            newForm[index].errorMessage = "Invalid file type";
            newForm[index].value = "";
            setForm(newForm);
          } else {
            const imageName = `images/validID/${v4() + name}`;
            const imageRef = ref(storage, imageName);

            uploadBytes(imageRef, value)
              .then((res) => {
                getDownloadURL(res.ref)
                  .then((url) => {
                    newForm[index].isError = false;
                    newForm[index].link = url;
                    newForm[index].value = url;
                    newForm[index].name = imageName;
                    newForm[index].isDisabled = true;
                    setForm(newForm);
                    checkCompletion();
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        }
        return;
      case "description":
        if (
          value.length >= newForm[index].minLength &&
          value.length <= newForm[index].maxLength
        ) {
          newForm[index].isError = false;
        } else {
          newForm[index].isError = true;
        }

        newForm[index].value = value;
        setForm(newForm);
        checkCompletion();
        return;
      case "email":
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = emailRegex.test(value);
        isValid
          ? (newForm[index].isError = false)
          : (newForm[index].isError = true);

        newForm[index].value = value.slice(0).toLowerCase();
        setForm(newForm);
        checkCompletion();
        return;
      default:
        newForm[index].value = value;
        setForm(newForm);
        checkCompletion();
        break;
    }
  };

  const customStyle = {
    control: (styles) => ({
      ...styles,
      border: "solid 1px #8b8b8b",
      fontSize: "1.5rem",
      paddingLeft: "10px",
    }),
    options: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "red" : "green",
    }),
    menu: (base) => ({
      ...base,
      marginTop: 0,
    }),
  };

  const editForm = (givenInternship) => {
    const entries = Object.entries(givenInternship).map((item) => {
      const x = Object.assign({}, item);
      return { [x[0]]: x[1], code: x[0], value: x[1] };
    });
    const final = entries
      .map((i) => {
        const newForm = form.map((item) => {
          if (item.code === i.code) {
            if (item.code === "typeOfWork") {
              return {
                ...item,
                valuePlaceholder: {
                  value: i.value,
                  label: i.value,
                },
                value: i.value,
              };
            }
            return item.code === i.code && { ...item, value: i.value };
          }
        });
        return newForm.filter((c) => c).sort((item) => item.type)[0];
      })
      .filter((x) => x);

    setForm(final);
  };

  const renderInputs = (formArray) => {
    return formArray.map((item, index) => {
      const {
        type,
        id,
        forInput,
        value,
        isError,
        errorMessage,
        isDisabled,
        code,
        maxLength,
        minLength,
        link,
        valuePlaceholder,
      } = item;
      switch (type) {
        case "text":
        case "email":
          return (
            <div className={`input-contain ${id}`} key={index}>
              <h3>{forInput}</h3>
              <input
                onChange={(e) => handleOnChange(e.target.value, index)}
                disabled={isDisabled}
                required
                value={value}
                minLength={minLength}
                maxLength={maxLength}
                type={type}
                name={forInput}
              />
              {isError && <p className="error-message">{errorMessage}</p>}
            </div>
          );
        case "textArea":
          return (
            <div className={`input-contain ${id}`} key={index}>
              <h3>{forInput}</h3>
              <textarea
                onChange={(e) => handleOnChange(e.target.value, index)}
                disabled={isDisabled}
                required
                value={value}
                minLength={minLength}
                maxLength={maxLength}
                type={type}
                name={forInput}></textarea>
              {isError && <p className="error-message">{errorMessage}</p>}
            </div>
          );
        case "list":
          const { optionItems } = item;
          return (
            <div className={`input-contain ${id}`} key={index}>
              <h3>{forInput}</h3>
              <CreatableSelect
                value={
                  value
                    ? {
                        label: value,
                        value: value,
                      }
                    : valuePlaceholder
                }
                onChange={(e) => handleOnChange(e.value, index)}
                styles={customStyle}
                required
                placeholder="Work in Internship"
                theme={(theme) => ({
                  ...theme,
                  outline: "solid 1px #8b8b8b",
                  colors: {
                    ...theme.colors,
                    primary25: "#8b8b8b",
                    primary: "#457b9d",
                  },
                })}
                key={index}
                options={optionItems}
              />
            </div>
          );
        case "image":
          return (
            <div className={`img-input ${id}`} key={index}>
              <label htmlFor={id}>
                <input
                  onChange={(e) => handleOnChange(e.target.files[0], index)}
                  disabled={isDisabled}
                  tabIndex={-1}
                  required
                  type="file"
                  name={id}
                  id={id}
                  accept="image/*"
                />
                {link ? (
                  <img src={link} alt={id} />
                ) : (
                  <img src={noImageDark} alt="placeholder" />
                )}
                {isError && (
                  <p
                    style={{ color: "red", fontSize: "18px" }}
                    className="error-message">
                    {errorMessage}
                  </p>
                )}
              </label>
            </div>
          );
        default:
          break;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const internship = convertForm(form);
    dispatch(createInternship({ internship }));
    clearValue();
    const timer = setTimeout(() => dispatch(handleMessage()), 3000);
    return () => clearTimeout(timer);
  };

  const handleClose = () => {
    const newForm = [...form].map((item) => {
      item.value = "";
      return { ...item };
    });
    setForm(newForm);
    dispatch(handleAdd());
  };

  return (
    <div className="internship-container">
      <header>
        <div className="page-title">
          <h2>Internships</h2>
        </div>
        <div className="btn-container">
          <button onClick={() => dispatch(handleAdd())}>Add</button>
        </div>
        <div className="warning">
          <h4>
            Changing and Deleting Internship may cause problem especially when
            that internship already had enrolled interns.
          </h4>
        </div>
      </header>
      {renderInternship()}

      {isAddOpen && (
        <>
          <div onClick={() => dispatch(handleAdd())} className="overlay"></div>
          <div className="add-modal modal">
            <form onSubmit={handleSubmit}>
              {renderInputs(form)}
              <div className="btn-holder">
                <button type="button" onClick={handleClose}>
                  Close
                </button>
                <button
                  style={
                    isComplete
                      ? { opacity: "1" }
                      : { opacity: ".7", pointerEvents: "none" }
                  }
                  type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {isEditOpen && (
        <EditModal
          renderInputs={renderInputs}
          form={form}
          clearValue={clearValue}
          isComplete={isComplete}
          convertForm={convertForm}
        />
      )}
      {isViewOpen && <ViewModal form={form} />}
    </div>
  );
});

export default Internships;
