import React, { Component } from "react";
import { Navigate } from "react-router-dom";
class Logout extends Component {
  logout = () => {
    sessionStorage.clear(sessionStorage);
  };
  componentDidMount() {
    this.logout();
  }
  render() {
    return (
      <div>
        <Navigate to="/" />
      </div>
    );
  }
}
export default Logout;
