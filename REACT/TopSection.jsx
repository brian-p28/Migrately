import React from "react";
import "./landing.css";
import PropTypes from "prop-types";
import translate from "./translate";

function TopSection(props) {
  const lang = props.state;
  const currentLang = translate.topSection[lang];

  return (
    <React.Fragment>
      <div>
        <div className="row">
          <div className="landing-background-image">
            <div className="landing-banner-text">
              <p className="landing-p">{currentLang?.heading}</p>
              <p className="landing-bottom-p">{currentLang?.btmHeading}</p>
              <button className="btn-success btn me-3 landing-button">
                {currentLang?.learnButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

TopSection.propTypes = {
  state: PropTypes.string,
};

export default TopSection;
