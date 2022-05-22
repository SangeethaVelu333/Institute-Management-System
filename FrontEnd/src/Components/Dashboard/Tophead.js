import { React, Component } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import user from "../../assets/Logo/user.png";
import "../../Styles/header.css";
import '../../Styles/login.css'
class Tophead extends Component {
  state = {
    modal: false,
    username:
      sessionStorage.getItem("firstname") +
      " " +
      sessionStorage.getItem("lastname"),
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    return (
      <div style = {{width: '88%'}} class="nav">
        <div class="nav-header">
          <div class="nav-title">{this.props.name}</div>
        </div>

        <div class="nav-links" style={{ marginRight: "12%" }}>
          {/* <a>
            <IoIosNotificationsOutline
              style={{
                fontSize: "2rem",
              }}
            />
          </a> */}
          <a>
            <img src={user} className="profile" />
          </a>
          <a class="dropdown" style={{ float: "center" }}>
          {/* {this.state.username} */}Admin
            <div
              class="dropdown-content"
              style={{ left: "0", boxShadow: "-1px 2px 10px 3px #e1e1e1" }}
            >
              <a href="/profile" style={{}}>
                View Profile
              </a>

              <a href="/">Log Out</a>
            </div>
          </a>
        </div>
      </div>
    );
  }
}
export default Tophead;
