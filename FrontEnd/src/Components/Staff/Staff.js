import React, { Component } from "react";
import "../../Styles/admin.css";
import { Table, Row, Col } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Tophead from "./../Dashboard/Tophead.js";
import Sidebar from "../Dashboard/SideMenu";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
         modal: false,
         updatemodal: false,
         dataforupdate: null,
         deletemodal: false,
        refreshtoken: sessionStorage.getItem("refreshtoken"),
        accesstoken: sessionStorage.getItem("accesstoken"),
        id: "",
        staff_name: "",
        subject_name:"",
        update_staff_name: "",
        update_subject_name:"",
        stafflist:[],
       offset: 0,
      currentpage: 0,
      perPage: 5,
      singleid: "",
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  

toggle = () => {
  const { modal } = this.state;
  this.setState({ modal: !modal });
};
toggleupdate = () => {
  this.setState({ updatemodal: !this.state.updatemodal });
};
toggledelete = () => {
  this.setState({ deletemodal: !this.state.deletemodal });
};
handlePageClick = (e) => {
  const selectedPage = e.selected;
  const offset = selectedPage * this.state.perPage;

  this.setState(
    {
      currentpage: selectedPage,
      offset: offset,
    },
    () => {
      this.getstaff();
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
  getstaff = async () => {
  
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${this.state.accesstoken}`,
    // };
    
    const res = axios
      .get(`http://localhost:3002/staff/all`)
      .then((res) => {
        console.log(res);
        this.setState({
           stafflist: res.data.stafflist,
            
          });
         console.log(this.state.stafflist[0].staff_name)
          const slice = res.data.stafflist.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          this.setState({
            pageCount: Math.ceil(res.data.stafflist.length / this.state.perPage),
            stafflist: slice,
          });
        })
      .catch((err) => {
        console.log(err);
      });
  };
  handleSubmit = async (data) => {
    const value = {
      staff_name: this.state.staff_name,
      subject_name: this.state.subject_name,
    
    };
    console.log(value);
    
    const res = await axios
      .post(`http://localhost:3002/staff/create`, value)
      .then((res) => {
        console.log("CREATE",res);
        alert("Staff Created Successfully!");
        this.toggle();
        this.getstaff();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  settingupdatestate = function () {
    this.setState(
      {
        singleid: this.state.dataforupdate._id,
        update_staff_name: this.state.dataforupdate.staff_name,
        update_subject_name: this.state.dataforupdate.subject_name,
        
      },
      (res) => {
        console.log("Success", res);
      }
    );
  };

  editstaff = async (dataid) => {
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${this.state.accesstoken}`,
    // };
    const data = {
      staff_name: this.state.update_staff_name,
      subject_name: this.state.update_subject_name,
     
    };
    // eslint-disable-next-line
    console.log(data);
    const res = await axios
      .put(`http://localhost:3002/staff/${dataid}`, data)

      .then((res) => {
        alert("Staff Updated Successfully!");
        console.log(res);
        this.toggleupdate();
        this.getstaff();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletestaff = async (DataID) => {
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${this.state.accesstoken}`,
    // };
    
    const req = axios
      .delete(`http://localhost:3002/staff/${DataID}`)

      .then((req) => {
        alert("Staff Deleted Successfully");
        this.toggledelete();
        this.getstaff();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    setTimeout(this.renewaccesstoken(), 10000);
    this.getstaff();
    
  }
  render() {
    return (
      <div className="align-row">
        <Sidebar />
        <div>
          <div className="tophead1">
            <Tophead name="Staff Details"/>
          </div>
          <br></br>
          <div className="align-row items" >
            <button  className="adduserbtn" style={{marginLeft:"65%",width:"10%"}} onClick={this.toggle}>
              Create Staff
            </button>
            </div>

          <div className="box" ref={(el) => (this.componentRef = el)}>
            <Table
              striped
              bordered
              hover
              style={{ marginTop: "5%", width: "80%", marginRight: '10%',marginLeft:"3%"}}
            >
              <thead>
            
                <tr >
                  <th style={{width: '5%'}}>ID</th>
                  <th style={{width: '5%'}}>Name</th>

                  {/* <th style={{width: '5%'}}>Date</th> */}

                  <th style={{width: '5%'}}>Subject</th>
                  <th style={{width: '5%'}}>Action</th>
                  

                </tr>
                
              </thead>
              <tbody>
              {this.state.stafflist &&
                          this.state.stafflist.map((data, index) => (
                              
                <tr key={data._id}>
                  <td>{data._id}</td>
                  <td>{data.staff_name}</td>
                  <td>{data.subject_name}</td>
                 
                  <td><button
                                  className="Edit"
                                  onClick={() => {
                                    this.setState({ dataforupdate: data }, () => {
                                      this.settingupdatestate();
                                      this.toggleupdate();
                                    });
                                  }}
                                >
                                  Edit
                                </button>
                                &nbsp;
                                <button
                                  className="Delete"
                                  onClick={() => {
                                    this.setState({ singleid: data._id }, () => {
                                      this.toggledelete();
                                    });
                                  }}
                                >
                                  Delete
                                </button></td>
                </tr>

                          ))}
              </tbody>
            </Table>
            <div style={{ marginLeft: "3%", marginTop: "23px" }}>
                    <ReactPaginate
                      previousLabel={<IoIosArrowBack />}
                      nextLabel={<IoIosArrowForward />}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  </div>
          </div>
          {this.state.modal && (
            <Modal
            style={{ width: "50%", height: "90%" }}
              isOpen={this.state.modal}
              onHide={this.toggle}
              onExit={this.reset}
              centered
              animation="false"
              size="md"
            >
              <ModalHeader toggle={this.toggle}>Create Staff</ModalHeader>
              <ModalBody   style={{
                  "max-height": "calc(100vh - 210px)",
                  "overflow-y": "auto",
                }}>
                <Form>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Staff Name</Label>
                        <Input
                          type="text"
                          required
                          value={this.state.staff_name}
                          placeholder="Enter staff name"
                          onChange={(e) =>
                            this.setState({
                              staff_name: e.target.value,
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                   
                  </Row>
                  <br/>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Subject</Label>
                        <Input
                          type="text"
                          required
                          value={this.state.subject_name}
                          placeholder="Enter subject"
                          onChange={(e) =>
                            this.setState({
                             subject_name: e.target.value,
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
          )}

{this.state.updatemodal && this.state.dataforupdate && (
            <Modal
            style={{ width: "50%", height: "90%" }}
              isOpen={this.state.updatemodal}
              onHide={this.toggleupdate}
              onExit={this.reset}
              centered
              animation="false"
              size="md"
            >
              <ModalHeader toggle={this.toggleupdate}>Update Staff</ModalHeader>
              <ModalBody   style={{
                  "max-height": "calc(100vh - 210px)",
                  "overflow-y": "auto",
                }}>
                <Form>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Staff Name</Label>
                        <Input
                          type="text"
                          required
                          value={this.state.update_staff_name}
                          placeholder="Enter staff name"
                          onChange={(e) =>
                            this.setState({
                              update_staff_name: e.target.value,
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                   
                  </Row>
                  <br/>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Subject</Label>
                        <Input
                          type="text"
                          required
                          value={this.state.update_subject_name}
                          placeholder="Enter subject"
                          onChange={(e) =>
                            this.setState({
                             update_subject_name: e.target.value,
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
                    this.toggleupdate();
                    this.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  // style={{ backgroundColor: "black", color: "white" }}
                  className="btn btn-dark"
                  onClick={() => {
                    this.editstaff(this.state.singleid);
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </Modal>
          )}

{this.state.deletemodal && (
            <Modal
              isOpen={this.state.deletemodal}
              onHide={this.toggledelete}
              // onExit={this.reloadpage}
              centered
            >
              <ModalHeader toggle={this.toggledelete}>
                Delete Staff
              </ModalHeader>
              <ModalBody
                style={{
                  "max-height": "calc(100vh - 210px)",
                  "overflow-y": "auto",
                }}
              >
                <Row style={{ margin: "0px" }}>Do you want to delete this?</Row>

                <br />
              </ModalBody>
              <ModalFooter>
                <Button
                  style={{
                    border: "1px solid gray",
                    color: "black",
                    backgroundColor: "#fff",
                  }}
                  onClick={this.toggledelete}
                >
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: "rgb(25,25,25)" }}
                  onClick={() => {
                    this.deletestaff(this.state.singleid);
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </Modal>
          )}
         
        </div>
      </div>
    );
  }
}
export default Staff;
