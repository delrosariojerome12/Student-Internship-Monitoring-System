import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router";

const InternProfile = React.memo(() => {
  const {selectedIntern} = useSelector((state) => state.intern);

  const {email} = useParams();

  useEffect(() => {}, []);

  console.log(selectedIntern);
  return (
    <div>
      <h1>{email}</h1>
    </div>
  );
});

export default InternProfile;
