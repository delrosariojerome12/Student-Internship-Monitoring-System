/** @format */

import React, { useState, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa";
import Document from "../../components/admin/Document";
import Select from "react-select";
import {
  handleCreateDocument,
  handleDeleteDocument,
  handleUpdateDocument,
} from "../../features/admin/document";
import NoDocumentSvg from "../../assets/img/waiting.svg";
import DocumentSvg from "../../assets/img/document.svg";
import DocumentDark from "../../assets/img/documentNigga.svg";

import { storage } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import Bouncing from "../../components/loading/Bouncing";
import ServerError from "../../pages/serverError";
import { FaTrash } from "react-icons/fa";

const DocumentApproval = lazy(() => import("./DocumentApproval"));

const Documents = React.memo(() => {
  const { documents, isError } = useSelector((state) => state.document);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState([
    {
      type: "file",
      id: "sample-image",
      forInput: "Sample Image",
      value: "",
      isError: false,
      errorMessage: "",
      isDisabled: false,
      code: "sample",
      minLength: 0,
      format: "image",
    },
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
      valuePlaceholder: {
        value: "Format",
        label: "Format",
      },
      options: [
        {
          value: "pdf",
          label: "pdf",
        },
        {
          value: "image",
          label: "image",
        },
      ],
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
  ]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDocumentOpen, setDocumentOpen] = useState(false);
  const [isAddDocumentOpen, setAddDocumentOpen] = useState(false);
  const [isDeleteDocumentOpen, setDeleteDocumentOpen] = useState(false);
  const [isEditDocumentOpen, setEditDocumentOpen] = useState(false);
  const [isSampleViewed, setSampleViewed] = useState(false);

  const [isComplete, setComplete] = useState(false);

  if (!documents) {
    return <Bouncing />;
  }
  if (isError) {
    return <ServerError />;
  }

  const checkCompletion = () => {
    let numOfErrors = 0;
    let numOfValues = 0;

    form.forEach((item) => {
      item.isError && numOfErrors++;
      item.value && numOfValues++;
    });

    const lengthForms = form.length;

    if (numOfErrors === 0 && numOfValues === lengthForms) {
      console.log("ok");
      setComplete(true);
    } else {
      console.log("not ok");
      setComplete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleSelectedDocument = (document) => {
    setSelectedDocument(document);
  };

  const handleDocumentModal = () => {
    setDocumentOpen(true);
  };

  const handleDeleteModal = (e) => {
    e.stopPropagation();
    setDeleteDocumentOpen(true);
  };

  const handleEditModal = (e, document) => {
    e.stopPropagation();
    setEditDocumentOpen(true);

    const y = Object.entries(document);

    const newValues = y.map((item) => {
      const x = Object.assign({}, item);
      return { [x[0]]: x[1], code: x[0], value: x[1] };
    });

    const final = newValues
      .map((i) => {
        const newForm = form.map(
          (item) => item.code === i.code && { ...item, value: i.value }
        );
        return newForm.filter((c) => c).sort((item) => item.type)[0];
      })
      .filter((x) => x);

    console.log(final);
    setForm(final);
  };

  const clearValue = () => {
    const newForm = form.map((item) => {
      return item.type === "file"
        ? {
            ...item,
            value:
              "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg",
            format: "image",
            isDisabled: false,
          }
        : item.type === "select"
        ? {
            ...item,
            isDisabled: false,
            valuePlaceholder: {
              value: "Format",
              label: "Format",
            },
          }
        : { ...item, value: "" };
    });
    setForm(newForm);
    setComplete(false);
  };

  const handleOnChange = (value, index) => {
    const newForm = [...form];
    const inputField = newForm[index].code;

    switch (inputField) {
      case "sample":
        if (value) {
          const { type } = value;
          const imageName = `images/documents/sample/${v4() + value.name}`;
          const imageRef = ref(storage, imageName);

          uploadBytes(imageRef, value)
            .then((res) => {
              getDownloadURL(res.ref)
                .then((url) => {
                  if (type.includes("image")) {
                    newForm[2].valuePlaceholder = {
                      value: "image",
                      label: "image",
                    };
                    newForm[2].value = "image";
                  } else {
                    newForm[2].valuePlaceholder = {
                      value: "pdf",
                      label: "pdf",
                    };
                    newForm[2].value = "pdf";
                  }
                  newForm[2].isDisabled = true;
                  newForm[index].format = type;
                  newForm[index].value = url;
                  newForm[index].isDisabled = true;

                  console.log(newForm);
                  setForm(newForm);
                  checkCompletion();
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
        return;
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
        newForm[index].valuePlaceholder = {
          value: value,
          label: value,
        };
        setForm(newForm);
        checkCompletion();
        return;
      default:
        break;
    }
  };

  const convertForm = (form) => {
    const newData = form.filter((input) => {
      const { code, value, name } = input;
      return name ? { code, value, name } : { code, value };
    });

    const newObject = Object.assign(
      {},
      ...newData.map((item) => ({ [item.code]: item.value }))
    );

    return newObject;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleCreateDocument(convertForm(form)));
    clearValue();
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
      const {
        forInput,
        value,
        type,
        minLength,
        maxLength,
        id,
        isDisabled,
        valuePlaceholder,
      } = item;

      switch (type) {
        case "file":
          return (
            <div key={index} className="img-input">
              <label htmlFor={id}>
                <div className="profile-con">
                  <img src={DocumentSvg} alt="profile" />
                </div>

                {isEditDocumentOpen === false && value.includes("firebase") ? (
                  <p>Click to View</p>
                ) : isAddDocumentOpen ? (
                  <p>Add Sample</p>
                ) : (
                  <p>Edit Sample</p>
                )}
                <input
                  disabled={isDisabled}
                  type="file"
                  name={forInput}
                  id={id}
                  accept="image/*, application/pdf"
                  onChange={(e) => handleOnChange(e.target.files[0], index)}
                />
              </label>
            </div>
          );
        case "text":
          return (
            <div className="input-contain text" key={index}>
              <input
                className="text"
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
                  }>
                  <div className="text">{forInput}</div>
                </label>
              </div>
            </div>
          );
        case "textArea":
          return (
            <div className="input-contain textarea" key={index}>
              <textarea
                minLength={minLength}
                maxLength={maxLength}
                key={index}
                id={id}
                value={value}
                onChange={(e) =>
                  handleOnChange(e.target.value, index)
                }></textarea>
              <div className="placeholder-container">
                <label
                  htmlFor={id}
                  className={
                    value ? "placeholder-text active" : "placeholder-text"
                  }>
                  <div className="text">{forInput}</div>
                </label>
              </div>
            </div>
          );
        case "select":
          const { options } = item;
          const list = options.map((opt) => opt);
          return (
            <Select
              value={
                selectedDocument && isEditDocumentOpen
                  ? {
                      label: selectedDocument.format,
                      value: selectedDocument.format,
                    }
                  : valuePlaceholder
              }
              defaultValue={
                selectedDocument &&
                isEditDocumentOpen && {
                  label: selectedDocument.format,
                  value: selectedDocument.format,
                }
              }
              isDisabled={isEditDocumentOpen ? true : isDisabled}
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

  const renderDocumentDetails = () => {
    if (selectedDocument.format === "pdf") {
      if (isSampleViewed) {
        return <Viewer fileUrl={selectedDocument.sample} />;
      }
      return (
        <div className="preview-container">
          <img src={DocumentDark} alt="document click" />
          <p>Click to View</p>
        </div>
      );
    } else if (selectedDocument.format === "image") {
      return <img src={selectedDocument.sample} alt="profile" />;
    } else if (selectedDocument.format === "docx") {
      return <p>Click to View</p>;
    }
  };

  return (
    <section className="admin-document-page">
      <IconContext.Provider value={{ className: "icon" }}>
        {isDocumentOpen && (
          <>
            <div
              className="overlay"
              onClick={() => {
                clearValue();
                setDocumentOpen(false);
              }}></div>
            <div className="document-modal">
              <div className="content">
                <div className="document-name">
                  <h4>Document</h4>
                  <p>{selectedDocument.name}</p>
                </div>
                <div
                  className="img-container"
                  onClick={() => setSampleViewed(true)}>
                  {renderDocumentDetails()}
                </div>
                <div className="desc-container">
                  <p>
                    Description:
                    <b> {selectedDocument.description}</b>
                  </p>
                  <p>
                    Format:
                    <b> {selectedDocument.format} </b>
                  </p>
                </div>
              </div>
              <div className="btn-container">
                <button
                  onClick={() => {
                    setDocumentOpen(false);
                    clearValue();
                  }}>
                  Close
                </button>
              </div>
            </div>
          </>
        )}
        {isSampleViewed && (
          <>
            <div
              className="overlay"
              onClick={() => setSampleViewed(false)}></div>
            <div className="sample-view-container">
              {renderDocumentDetails()}
            </div>
          </>
        )}
        {isAddDocumentOpen && (
          <>
            <div
              className="overlay"
              onClick={() => {
                setAddDocumentOpen(false);
                clearValue();
              }}></div>
            <div className="add-document-modal">
              <form onSubmit={handleSubmit}>
                <h4>Add Document</h4>
                {renderForm()}
              </form>
              <div className="btn-container">
                <button
                  onClick={() => {
                    setAddDocumentOpen(false);
                    clearValue();
                  }}>
                  Cancel
                </button>
                <button
                  style={
                    isComplete
                      ? { pointerEvents: "auto" }
                      : { pointerEvents: "none", opacity: ".5" }
                  }
                  type="submit"
                  onClick={handleSubmit}>
                  Add
                </button>
              </div>
            </div>
          </>
        )}
        {isDeleteDocumentOpen && (
          <>
            <div
              className="overlay"
              onClick={() => setDeleteDocumentOpen(false)}></div>
            <div className="delete-document-modal">
              <span>
                <FaTrash />
              </span>
              <h4>You are about to delete this document.</h4>
              <h3>Are you sure?</h3>
              <div className="btn-container">
                <button
                  onClick={() => {
                    setDeleteDocumentOpen(false);
                    clearValue();
                  }}>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setDeleteDocumentOpen(false);
                    dispatch(handleDeleteDocument(selectedDocument._id));
                    clearValue();
                  }}>
                  Confirm
                </button>
              </div>
            </div>
          </>
        )}
        {isEditDocumentOpen && (
          <>
            <div
              className="overlay"
              onClick={() => {
                setEditDocumentOpen(false);
                clearValue();
              }}></div>
            <div className="edit-document-modal">
              <form>
                <h4>Edit Document</h4>
                {renderForm()}
              </form>
              <div className="btn-container">
                <button
                  onClick={() => {
                    setEditDocumentOpen(false);
                    clearValue();
                  }}>
                  Cancel
                </button>
                <button
                  style={
                    isComplete
                      ? { pointerEvents: "auto" }
                      : { pointerEvents: "none", opacity: ".5" }
                  }
                  onClick={() => {
                    dispatch(
                      handleUpdateDocument({
                        form: convertForm(form),
                        id: selectedDocument._id,
                      })
                    );
                    clearValue();
                    setEditDocumentOpen(false);
                  }}>
                  Confirm
                </button>
              </div>
            </div>
          </>
        )}
        <header>
          <h2>Documents</h2>
        </header>

        <div className="btn-routes">
          <button onClick={() => navigate("/dashboard/documents/format")}>
            Document Format
          </button>
          <button onClick={() => navigate("/dashboard/documents/approval")}>
            Document Approvals
          </button>
        </div>
        <Suspense fallback={<Bouncing />}>
          <Routes>
            <Route
              path="/format"
              element={
                <div className="document-container">
                  <div className="document-control">
                    <button
                      onClick={() => setAddDocumentOpen(!isAddDocumentOpen)}>
                      <p>Add Document</p>
                      <FaPlus />
                    </button>
                  </div>
                  {documents.length > 0 ? (
                    <div className="documents">
                      {documents.map((doc, index) => {
                        return (
                          <Document
                            doc={doc}
                            key={index}
                            handleSelectedDocument={handleSelectedDocument}
                            handleDocumentModal={handleDocumentModal}
                            handleDeleteModal={handleDeleteModal}
                            handleEditModal={handleEditModal}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="no-document">
                      <h3>No existing document at the moment.</h3>
                      <img src={NoDocumentSvg} alt="no-Document" />
                    </div>
                  )}
                </div>
              }
            />
            <Route path="/approval" element={<DocumentApproval />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </IconContext.Provider>
    </section>
  );
});

export default Documents;
