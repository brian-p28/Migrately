import React from "react";
import Footer from "../components/landing/Footer";
import PropTypes from "prop-types";
import NavigateBar from "./marketing/navbars/MigratelyNavbar";
import logger from "sabio-debug";

const _logger = logger.extend("LayoutWithNavBar");

const LayoutWithNavBar = (props) => {
  _logger(props.currentUser);

  return (
    <div>
      <NavigateBar
        currentUser={props.currentUser}
        lang={props.lang}
        setLang={props.setLang}
      />
      {props.children}
      <Footer lang={props.lang} />
    </div>
  );
};

LayoutWithNavBar.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string,
  }),
  children: PropTypes.shape({
    children: PropTypes.string,
  }),
  lang: PropTypes.string,
  setLang: PropTypes.func,
};

export default LayoutWithNavBar;
