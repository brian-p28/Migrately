import React from "react";
import MigratelyFeatures from "./MigratelyFeatures";
import WhyMigratelyColumns from "./WhyMigratelyColumns";
import BottomStatement from "./BottomStatement";
import PropTypes from "prop-types";
import TopSection from "./TopSection";
import Checklist from "./Checklist";

function Landing(props) {
  return (
    <React.Fragment>
      <TopSection state={props.language} />
      <Checklist state={props.language} />
      <WhyMigratelyColumns state={props.language} />
      <MigratelyFeatures state={props.language} />
      <BottomStatement state={props.language} />
    </React.Fragment>
  );
}
Landing.propTypes = {
  language: PropTypes.string,
};

export default Landing;
