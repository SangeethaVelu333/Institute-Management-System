import React, { Component } from "react";
import Dashboard from "../Dashboard/SideMenu";
import "../../Styles/profile.css";
import axios from "axios";
import { Row, Col, Input } from "reactstrap";
import Tophead from "./../Dashboard/Tophead.js";
class Profile extends Component {
    state = {
        refreshtoken: localStorage.getItem("refreshtoken"),
        token: localStorage.getItem("accesstoken"),
        profile: [],
        userid:sessionStorage.getItem('user_id'),
        email:sessionStorage.getItem('email'),
        username:sessionStorage.getItem('firstname'),
        lastname:sessionStorage.getItem('lastname'),
        role_type:sessionStorage.getItem('role_type'),
        phone_number:sessionStorage.getItem('phone')
    };
    //to renew accesstoken
    renewaccesstoken = async () => {
        //to renew accesstoken
        const renewheaders = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.refreshtoken}`,
        };
        // eslint-disable-next-line
        const renew = await axios
            .get(`http://localhost:3002/auth/renewAccessToken`, {
                headers: renewheaders,
            })
            .then((renew) => {
                localStorage.setItem("accesstoken", renew.data.accessToken);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //getprofile
    getprofile = async () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.token}`,
        };
        console.log(this.state.token);
        // eslint-disable-next-line
        const req = axios
            .get(`http://localhost:3002/users/profile`, { headers: headers })
            .then((req) => {
                console.log(req);
                this.setState({ profile: req.data.user });
                localStorage.setItem("password", req.data.user.password);
                console.log(this.state.profile);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //rendering components
    componentDidMount() {
        setTimeout(this.renewaccesstoken(), 10000);
        this.getprofile();
    }
    render() {
        return (
            <div className="align-row">
                <Dashboard />
                <div className="align-column">
                <div className="tophead1">
                  <Tophead name="Admin Profile" />
                    </div>
                    <div className="admin">
                        <h3>General Information</h3>
                        <br />
                        <Row>
                            <Col md="6">
                                <label className="heading">First Name</label>
                                <Input type="text" value={this.state.username} />
                            </Col>
                            <Col md="6">
                                <label className="heading">Last Name</label>
                                <Input type="text" value={this.state.lastname} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="6">
                                <label className="heading">Email-ID</label>
                                <Input type="text" value={this.state.email} />
                            </Col>
                            <Col md="6">
                                <label className="heading">Phone Number</label>
                                <Input type="text" value={this.state.phone_number} />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <h3>Privacy and Security</h3>
                        <br />
                        <Row>
                            <Col md="6">
                                <label className="heading">Password</label>
                                <Input type="password" value="staff12354" />
                            </Col>
                        </Row>
                        <a className="changepwd" href="/admin/changepassword">
                            Change Password
                        </a>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}
export default Profile;