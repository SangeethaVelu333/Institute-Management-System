import React, { Component } from "react";
import "../../Styles/tab.css";
import Sidebar from "../Dashboard/SideMenu";
import Tophead from "./../Dashboard/Tophead.js";
import AttendanceM1 from "./AttendanceM1";
import AttendanceM2 from "./AttendanceM2";
import AttendanceE1 from "./AttendanceE1";
import AttendanceE2 from "./AttendanceE2";
import { Table, Row, Col } from "reactstrap";
import axios from "axios";
import "../../Styles/admin.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import ReactPaginate from "react-paginate";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          present: false,
          absent:false,
          filtermodal: false,
            refreshtoken: sessionStorage.getItem("refreshtoken"),
            accesstoken: sessionStorage.getItem("accesstoken"),
            lastname: "",
            id: "",
            first_name: '',
            last_name:" ",
            phone_number: '',
            email: '',
            date: '',
            batch:'',
           student: [],
           offset: 0,
          currentpage: 0,
          perPage: 5,
          filter_firstname: "",
         
        };
        this.handlePageClick = this.handlePageClick.bind(this);
      }
      toggle = () => {
        const { modal } = this.state;
        this.setState({ modal: !modal });
      };
      togglefilter = () => {
          const { modal } = this.state;
          this.setState({ modal: !modal });
        this.setState({ filtermodal: !this.state.filtermodal });
      };
      date = () => {
        this.setState({date: this.state.date})
        console.log(this.state.date)
      }
      present=()=>{
        this.setState({ present: !this.state.present });
        alert("you marked present");
      }
     absent=()=>{
        this.setState({ absent: !this.state.absent });
        // alert("you marked Absent");
      }
      handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
    
        this.setState(
          {
            currentpage: selectedPage,
            offset: offset,
          },
          () => {
            this.getstudents();
          }
        );
      };
      renewaccesstoken = async () => {
        const renewheaders = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.state.refreshtoken}`,
        };
        const renew = await axios
          .get(`http://localhost:3002/auth/renewAccessToken`, {
            headers: renewheaders,
          })
          .then((renew) => {
            sessionStorage.setItem("accesstoken", renew.data.accessToken);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getstudents = async () => {
      
        const res = axios
          .get(`http://localhost:3002/students/all`)
          .then((res) => {
            console.log(res);
           
              const slice = res.data.students.slice(
                this.state.offset,
                this.state.offset + this.state.perPage
              );
              this.setState({
                pageCount: Math.ceil(res.data.students.length / this.state.perPage),
                students: slice,
              });
            })
          .catch((err) => {
            console.log(err);
          });
      };
      handleSubmit = async (data) => {
        const value = {
          batch: this.state.batch,
          date: this.state.date,
          email:this.state.email,
          first_name:this.state.first_name,
          last_name: this.state.last_name,
          phone_number:this.state.phone_number
        };
        console.log(value);
        // eslint-disable-next-line
        const res = await axios
          .post(`http://localhost:3002/students/create`, value)
          .then((res) => {
            console.log("CREATE",res);
            alert("Student Created Successfully!");
            this.toggle();
            this.getstudents();
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      absentmail = async (DataID) => {
        
        if (true) {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.token}`,
          };
          
          const res = await axios
            .post(`http://localhost:3002/students/1`, { headers: headers })
            .then((res) => {
              alert("Mail sent!");
              console.log(res);
             
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
      componentDidMount() {
        setTimeout(this.renewaccesstoken(), 10000);
        this.getstudents();
        
      }
      
    render(){
      return(
        <div className="align-row">
        <Sidebar />
        <div>
          <div className="tophead1" style={{}}>
            <Tophead name="Attendance Details"/>
          </div>
          <br/>
          <div className="align-row items">
            <button className="filterbtn" onClick={this.togglefilter}>
              Filter
            </button>
            <button className="adduserbtn" onClick={this.toggle}>
              Create Student
            </button>
            
            <Input onClick={this.date}
              className="calender"
              type="date"
              value={this.state.date}
              onChange={(e) =>
                this.setState({
                  date: e.target.value,
                })
              }
            />
            <br />
          </div>
        <Modal
          style={{ width: "50%", height: "90%" }}
          isOpen={this.state.modal}
          onHide={this.toggle}
          onExit={this.reset}
          centered
          animation="false"
          size="md"
        >
          <ModalHeader toggle={this.toggle}>Create Student</ModalHeader>
          <ModalBody style={{
            "max-height": "calc(100vh - 210px)",
            "overflow-y": "auto",
          }}>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      required
                      value={this.state.first_name}
                      placeholder="Enter first name"
                      onChange={(e) =>
                        this.setState({
                          first_name: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      required
                      value={this.state.last_name}
                      placeholder="Enter last name"
                      onChange={(e) =>
                        this.setState({
                          last_name: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <FormGroup>
                    <Label style={{ paddingRight: '10px' }}>Batch</Label>
                    <select value={this.state.value} onChange={this.handleChange}>
                      <option value=""></option>
                      <option value="M1">M1</option>
                      <option value="M2">M2</option>
                      <option value="E1">E1</option>
                      <option value="E2">E2</option>
                    </select>
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="text"
                      required
                      value={this.state.email}
                      placeholder="Enter email address"
                      onChange={(e) =>
                        this.setState({
                          email: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      required
                      value={this.state.date}
                      onChange={(e) =>
                        this.setState({
                          date: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      type="text"
                      required
                      value={this.state.phone_number}
                      placeholder="Enter phone number"
                      onChange={(e) =>
                        this.setState({
                          phone_number: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <br />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{
                border: "1px solid grey",
                color: "black",
                backgroundColor: "#fff",
              }}
              onClick={() => {
                this.toggle();
                this.reset();
              }}
            >
              Cancel
            </Button>
            <Button
              // style={{ backgroundColor: "black", color: "white" }}
              className="btn btn-dark"
              onClick={this.handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
        <div className="tabs">
         <Tabs>
           <Tab label="M1">
             <div>
               <AttendanceM1/>
             </div>
           </Tab>
           <Tab label="M2">
             <div>
                 <AttendanceM2/>
            </div>
           </Tab>
           <Tab label="E1">
             <div>
                <AttendanceE1/>
             </div>
           </Tab>
           <Tab label="E2">
             <div>
               <AttendanceE2/>
             </div>
           </Tab>
         </Tabs>
        </div>
        </div>
        </div>
        
      )
    }
  }
  
  class Tabs extends Component{
    state ={
      activeTab: this.props.children[0].props.label
    }
    changeTab = (tab) => {
  
      this.setState({ activeTab: tab });
    };
    render(){
      
      let content;
      let buttons = [];
      return (
        <div>
          {React.Children.map(this.props.children, child =>{
            buttons.push(child.props.label)
            if (child.props.label === this.state.activeTab) content = child.props.children
          })}
           
          <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab}/>
          <div className="tab-content">{content}</div>
          
        </div>
      );
    }
  }
  
  const TabButtons = ({buttons, changeTab, activeTab}) =>{
     
    return(
      <div className="tab-buttons">
      {buttons.map(button =>{
         return <button className={button === activeTab? 'active': ''} onClick={()=>changeTab(button)}>{button}</button>
      })}
      </div>
    )
  }

   
export default Tab;