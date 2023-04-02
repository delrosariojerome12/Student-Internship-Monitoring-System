import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllNarrative} from "../../../features/interns/narrativeReducer";
import NarrativeContent from "../../../components/intern/NarrativeContent";
import _ from "lodash";

const Narrative = React.memo(() => {
  const {
    user: {email},
  } = useSelector((state) => state.user);
  const {allNarrative} = useSelector((state) => state.narrative);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allNarrative) {
      dispatch(getAllNarrative({email}));
    }
  }, []);

  return <div className="narrative-container">Narrative</div>;
});

export default Narrative;
