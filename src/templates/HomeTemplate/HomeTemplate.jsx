import React, { Fragment, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Route } from "react-router-dom";

export const HomeTemplate = (props) => {
  let Component = props.component;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Header />
            <Component {...propsRoute} />
            <Footer />
          </Fragment>
        );
      }}
    />
  );
};
