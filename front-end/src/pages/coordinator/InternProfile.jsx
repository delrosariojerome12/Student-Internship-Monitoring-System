import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams, useNavigate, Route, Routes, Navigate} from "react-router";
import {getIntern} from "../../features/interns/internReducer";
import ServerError from "../serverError";
import Bouncing from "../../components/loading/Bouncing";
import CdsgaImg from "../../assets/img/CDSGA.png";
import InternDetailsCoordinator from "./profile/InternDetailsCoordinator";
import InternshipDetailsCoordinator from "./profile/InternshipDetailsCoordinator";
import AttendanceCoordinator from "./profile/AttendanceCoordinator";
import NarrativeCoordinator from "./profile/NarrativeCoordinator";
import DocumentsCoordinator from "./profile/DocumentsCoordinator";
import ViewModal from "../../components/intern/reports/ViewModal";

const InternProfile = React.memo(() => {
  const {selectedIntern, isError, isLoading} = useSelector(
    (state) => state.intern
  );
  const {
    allNarrative,
    isAddModalOpen,
    isEditModalOpen,
    isViewModalOpen,
    isGenerateOpen,
  } = useSelector((state) => state.narrative);

  const dispatch = useDispatch();
  const {email} = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("Interns Detail");

  const buttons = [
    {
      path: `/dashboard/interns/${email}/`,
      btnName: "Interns Detail",
      code: "internsDetail",
    },
    {
      path: `/dashboard/interns/${email}/internshipdetail`,
      btnName: "Internship Detail",
      code: "internshipDetail",
    },
    {
      path: `/dashboard/interns/${email}/attendance`,
      btnName: "Attendance",
      code: "attendance",
    },
    {
      path: `/dashboard/interns/${email}/narrative`,
      btnName: "Narrative",
      code: "narrative",
    },
    {
      path: `/dashboard/interns/${email}/documents`,
      btnName: "Documents",
      code: "documents",
    },
  ];

  useEffect(() => {
    if (!selectedIntern) {
      dispatch(getIntern({email}));
    }
  }, []);

  if (isLoading) {
    return <Bouncing />;
  }
  if (isError || !selectedIntern) {
    return <ServerError />;
  }

  const {
    user: {profileImage, firstName, lastName},
    schoolDetails,
  } = selectedIntern;

  return (
    <section className="profile-page">
      <div className="profile-user">
        <div
          className="profile-bg"
          style={{
            background: `url(${CdsgaImg}) no-repeat center`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="profile-details">
          <div className="profile-img">
            <img src={profileImage} alt="" />
          </div>
        </div>
        <div className="intern-info">
          <div className="intern-details">
            <h3>
              {firstName} {lastName}
            </h3>
            <p className="program">{schoolDetails?.program}</p>
            <p className="program-short">BSIT</p>
            {/* <p>{internshipDetails?.companyName}</p> */}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="button-container">
          {buttons.map((item, index) => {
            const {path, btnName, code} = item;

            return (
              <button
                className={selected === code ? "active" : null}
                key={index}
                onClick={() => {
                  navigate(path);
                  setSelected(code);
                }}
              >
                {btnName}
              </button>
            );
          })}
        </div>
        <div className="display">
          <Routes>
            <Route path="/" element={<InternDetailsCoordinator />} />
            <Route
              path="/internshipdetail"
              element={<InternshipDetailsCoordinator />}
            />
            <Route path="/attendance" element={<AttendanceCoordinator />} />
            <Route path="/narrative" element={<NarrativeCoordinator />} />
            <Route path="/documents" element={<DocumentsCoordinator />} />
            {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
          </Routes>
        </div>
      </div>
      {isViewModalOpen && <ViewModal />}
    </section>
  );
});

export default InternProfile;
