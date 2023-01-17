import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IconContext} from "react-icons";
import Document from "../../components/admin/Document";
import Select from "react-select";
import {handleCreateDocument} from "../../features/admin/document";

const Documents = React.memo(() => {
  const {documents} = useSelector((state) => state.document);
  const dispatch = useDispatch();

  const [form, setForm] = useState([
    {
      type: "text",
      id: "document-name",
      forInput: "Name",
      value: "",
      isError: false,
      errorMessage: "Atleast 3 characters and max of 30",
      isDisabled: false,
      code: "name",
      minLength: 5,
      maxLength: 20,
    },
    {
      type: "textArea",
      id: "document-description",
      forInput: "Description",
      value: "",
      isError: false,
      errorMessage: "Atleast 10 characters and max of 100",
      isDisabled: false,
      code: "description",
      minLength: 10,
      maxLength: 100,
    },
    {
      type: "select",
      id: "document-format",
      forInput: "Format",
      value: "",
      isError: false,
      errorMessage: "Value not supported.",
      isDisabled: false,
      code: "format",
      minLength: 0,
      maxLength: 0,
      options: [
        {
          value: "pdf",
          label: "pdf",
        },
        {
          value: "docx",
          label: "docx",
        },
        {
          value: "image",
          label: "image",
        },
      ],
    },
  ]);
  const [isAddDocumentOpen, setAddDocumentOpen] = useState(false);
  const [isComplete, setComplete] = useState(false);

  const checkCompletion = () => {
    let numOfErrors = 0;
    let numOfValues = 0;
    form.forEach((item) => {
      item.isError && numOfErrors++;
      item.value && numOfValues++;
    });

    const lengthForms = form.length;

    if (numOfErrors === 0 && numOfValues === lengthForms) {
      console.log("complete");
      setComplete(true);
    } else {
      setComplete(false);
      console.log("not complete");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleOnChange = (value, index) => {
    const newForm = [...form];
    const inputField = newForm[index].code;

    switch (inputField) {
      case "name":
        if (value.length <= 2) {
          newForm[index].isError = true;
        } else {
          newForm[index].isError = false;
        }
        newForm[index].value = value;
        setForm(newForm);
        checkCompletion();
        return;
      case "description":
        if (value.length <= 9) {
          newForm[index].isError = true;
        } else {
          newForm[index].isError = false;
        }
        newForm[index].value = value;
        setForm(newForm);
        checkCompletion();

        return;
      case "format":
        newForm[index].value = value;
        setForm(newForm);
        checkCompletion();
        return;
      default:
        break;
    }
  };

  const convertForm = (form) => {
    const newData = form.filter((input) => {
      const {code, value, name} = input;
      return name ? {code, value, name} : {code, value};
    });

    const newObject = Object.assign(
      {},
      ...newData.map((item) =>
        !item.name
          ? {[item.code]: item.value}
          : {[item.code]: {link: item.value, name: item.name}}
      )
    );

    return newObject;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleCreateDocument(convertForm(form)));
    // console.log(convertForm(form));
  };

  const customStyle = {
    control: (styles) => ({
      ...styles,
      border: "solid 1px #8b8b8b",
      fontSize: "1.5rem",
      paddingLeft: "10px",
      height: "50px",
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

  const renderForm = () => {
    return form.map((item, index) => {
      const {forInput, value, type, minLength, maxLength, id} = item;
      switch (type) {
        case "text":
          return (
            <div className="input-contain" key={index}>
              <input
                onChange={(e) => handleOnChange(e.target.value, index)}
                key={index}
                tabIndex={-1}
                required
                value={value}
                minLength={minLength}
                maxLength={maxLength}
                type={type}
                name={forInput}
              />
              <div className="placeholder-container">
                <label
                  htmlFor={id}
                  className={
                    value ? "placeholder-text active" : "placeholder-text"
                  }
                >
                  <div className="text">{forInput}</div>
                </label>
              </div>
            </div>
          );
        case "textArea":
          return (
            <div className="input-contain" key={index}>
              <textarea
                minLength={minLength}
                maxLength={maxLength}
                key={index}
                id={id}
                value={value}
                onChange={(e) => handleOnChange(e.target.value, index)}
              ></textarea>
              <div className="placeholder-container">
                <label
                  htmlFor={id}
                  className={
                    value ? "placeholder-text active" : "placeholder-text"
                  }
                >
                  <div className="text">{forInput}</div>
                </label>
              </div>
            </div>
          );
        case "select":
          const {options} = item;
          const list = options.map((opt) => opt);
          return (
            <Select
              tabIndex={-1}
              options={list}
              styles={customStyle}
              name={forInput}
              placeholder={forInput}
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
              onChange={(e) => handleOnChange(e.value, index)}
            />
          );
        default:
          break;
      }
    });
  };

  return (
    <section className="admin-document-page">
      <IconContext.Provider value={{className: "icon"}}>
        {isAddDocumentOpen && (
          <>
            <div className="overlay"></div>
            <div className="add-document-modal">
              <header>
                <h4>Add Document</h4>
              </header>
              <form onSubmit={handleSubmit}>{renderForm()}</form>
              <div className="btn-container">
                <button onClick={() => setAddDocumentOpen(false)}>
                  Cancel
                </button>
                <button
                  style={
                    isComplete
                      ? {pointerEvents: "auto"}
                      : {pointerEvents: "none", opacity: ".5"}
                  }
                  type="submit"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </>
        )}
        <header>
          <h2>Documents</h2>
        </header>
        <div className="document-container">
          <div className="document-control">
            <button onClick={() => setAddDocumentOpen(!isAddDocumentOpen)}>
              Add Document
            </button>
          </div>
          <div className="documents">
            {documents.map((doc, index) => {
              return <Document doc={doc} key={index} />;
            })}
          </div>
        </div>
      </IconContext.Provider>
    </section>
  );
});

export default Documents;
