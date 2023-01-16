import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GoSearch} from "react-icons/go";
import {FaTrash} from "react-icons/fa";
import Document from "../../components/admin/Document";

const Documents = React.memo(() => {
  const {documents} = useSelector((state) => state.document);
  const dispatch = useDispatch();

  return (
    <section className="admin-document-page">
      <header>
        <h2>Documents</h2>
      </header>
      <div className="document-container">
        <div className="document-control">
          <button>Add Document</button>
        </div>
        <div className="documents">
          {documents.map((doc, index) => {
            return <Document doc={doc} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
});

export default Documents;
