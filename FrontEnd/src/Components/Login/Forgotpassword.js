import React, { Component } from "react";
import { Button, FormGroup, Input , Form } from "reactstrap";
// import "../Styles/dashboard.css";
import "./../../Styles/login.css";
import "./../../Styles/forgotpassword.css";
import Login from "./Login"
// import logo from "./Images/logomedadv.png";
import axios from "axios";
import {Link} from "react-router-dom"; 
import { Navigate } from "react-router";
import { Redirect } from "react-router";
class Forgotpassword extends Component {
  state = {
    email: "",
    response: false,
  };
  // api postcall with email
  handleSubmit = async () => {
    const value = {
      email: this.state.email,
    };
    console.log(value);
    // eslint-disable-next-line
    const res = await axios
      .post(`http://localhost:3002/auth/forgot_password`, value)
      .then((res) => {
        console.log(res);
        alert("Reset link has been sent to your mail!");
        this.setState({ response: true });
        // <Navigate to="/" />
        <Login/>
      })
      .catch((err) => {
        console.log(err);
        alert("Please enter valid email address");
      });
  };
  render() {
    return this.state.response === false ? (
        
      <div className="login">
        <Form className="forgot">
          
        {/* <img src={logo} className="image-forgot" alt="not found" /> */}
        <h4 align="center" style={{ fontWeight: "700" }}>
          Find your account
        </h4>
        <br />
        <h4 align="center" style={{ fontSize: "18px" }}>
          Enter the email address that is linked to your account
        </h4>
        {this.state.err ? (
                        <label align="center" style={{ color: "red", fontSize: 16,marginTop:-50 }}>
                            Invalid Email ID
                        </label>
        ) : null}
        <FormGroup className="input-group-lg">
        <label className="label3">EMAIL ID</label>
        <br />
        <Input
          type="text"
          className="input-text-label3"
          required placeholder="Enter your email address"
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        </FormGroup>
        <br />
        
        <Button
          type="submit"
          color="primary"
          className="reset-button"
          onClick={this.handleSubmit}
        >
          SEND RESET LINK
        </Button>
        <br />
        </Form>
      </div>
    ) : (
      
      <Navigate to="/" />
      // <Redirect to="/" />
      
    );
  }
}
export default Forgotpassword;