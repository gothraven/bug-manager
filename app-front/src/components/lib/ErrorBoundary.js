import React from "react";
import propTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withSnackbar } from "notistack";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { enqueueSnackbar } = this.props;
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
    enqueueSnackbar("Error happeened", { variant: "error" });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <Redirect to="/not-found" />;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: propTypes.node.isRequired,
  enqueueSnackbar: propTypes.func.isRequired
};

export default withSnackbar(ErrorBoundary);
