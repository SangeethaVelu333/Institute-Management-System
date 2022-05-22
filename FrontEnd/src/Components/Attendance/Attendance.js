import React, { Component } from "react";
import "../../Styles/admin.css";
import { Table, Row, Col } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Tophead from "./../Dashboard/Tophead.js";
import Sidebar from "../Dashboard/SideMenu";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { Dropdown } from "react-bootstrap";



const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      present: false,
      absent: false,
      filtermodal: false,
      refreshtoken: sessionStorage.getItem("refreshtoken"),
      accesstoken: sessionStorage.getItem("accesstoken"),
      lastname: "",
      id: "",
      first_name: '',
      last_name: " ",
      phone_number: '',
      email: '',
      date: '',
      batch: '',
      batch1:   "M1",
      batch2: "M2",
      batch3: "E1",
      batch4: "E2",
      student: [],
      offset: 0,
      currentpage: 0,
      perPage: 5,
      filter_firstname: "",
      errors: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
      }

    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  toggle = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };
  togglefilter = () => {
    this.setState({ filtermodal: !this.state.filtermodal });
  };
  date = () => {
    this.setState({ date: this.state.date })
    console.log(this.state.date)
  }
  present = () => {
    this.setState({ present: !this.state.present });
    alert("you marked present");
  }
  absent = () => {
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
        // this.setState({
        //     student: res.data.students,

        //   });
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
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone_number: this.state.phone_number
    };
    console.log(value);
    // eslint-disable-next-line
    const res = await axios
      .post(`http://localhost:3002/students/create`, value)
      .then((res) => {
        console.log("CREATE", res);
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
        // .post(`http://localhost:3002/students/${DataID}`, { headers: headers })
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
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'first_name': 
        errors.first_name = 
          value.length < 5
            ? 'Full Name must be 10 characters long!'
            : '';
        break;
      case 'last_name': 
        errors.last_name = 
          value.length < 5
            ? 'Full Name must be 10 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'phone_number': 
        errors.phone_number = 
          value.length < 8
            ? 'Phone must be 10 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }
  render() {
    const {errors} = this.state;
    return (
          <div className="box" ref={(el) => (this.componentRef = el)}>
            <Table
              striped
              bordered
              hover
              style={{ marginTop: "5%", width: "130%", marginRight: '20%',marginLeft:"14%"}}
            >
              <thead>
                <tr>
                  <th style={{width: '5%'}}>ID</th>
                  <th style={{width: '5%'}}>Name</th>

                  {/* <th style={{width: '5%'}}>Date</th> */}

                  <th style={{width: '5%'}}>Attendance</th>
                  {/* <th style={{width: '5%'}}>Status</th> */}
                </tr>
              </thead>
              <tbody>
              {this.state.students&&
                          this.state.students.map((data, index) =>(
                            <tr key={data._id}>
                            <td>{data._id}</td>
                            <td>{data.first_name}</td>

                  {/* <td>{this.state.date}</td> */}

                  <td>
                    <button class="btn btn-success" onClick={this.present}>
                      {/* {this.state.present} */}
                      P
                    </button>
                    <button
                      class="btn btn-danger"
                      style={{ marginLeft: "2%" }}
                      onClick={() => {
                        this.absent();
                        this.absentmail(this.state.id);
                        
                      }}
                    >
                      A
                      {/* {this.state.absent} */}
                    </button>
                  </td>
                 {/* <td>present</td> */}
                </tr>
                          ))}
              </tbody>
            </Table>
            <div style={{ marginLeft: "14%", marginTop: "23px" }}>
                    <ReactPaginate
                      previousLabel={<AiOutlineCaretLeft />}
                      nextLabel={<AiOutlineCaretRight />}
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

         
          {
      this.state.modal && (
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
            <Form onSubmit={this.handleSubmit} noValidate>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      required
                      value={this.state.first_name}
                      placeholder="Enter first name"
                      onChange={this.handleChange} noValidate 
                    />
                    {errors.first_name.length > 0 && 
                <span className='error'>{errors.first_name}</span>}
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
                     {errors.last_name.length > 0 && 
                <span className='error'>{errors.last_name}</span>}
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
                      <option value="M1">{this.state.batch1}</option>
                      <option value="M2">{this.state.batch2}</option>
                      <option value="E1">{this.state.batch3}</option>
                      <option value="E2">{this.state.batch4}</option>
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
                      onChange={this.handleChange} noValidate 
                    />
                    {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
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
                      onChange={this.handleChange} noValidate 
                    />
                    {errors.phone_number.length > 0 && 
                <span className='error'>{errors.phone_number}</span>}
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
      )
    }
      </div >
    );
  }
}
export default Attendance;
