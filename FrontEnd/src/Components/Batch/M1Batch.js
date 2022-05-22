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
class M1Batch extends Component {
  constructor(props) {
    super(props);
    this.state = {
        refreshtoken: sessionStorage.getItem("refreshtoken"),
        accesstoken: sessionStorage.getItem("accesstoken"),
        lastname: "",
        id: "",
        firstname: "",
        phone_number: "",
        email: "",
       student: [],
       offset: 0,
      currentpage: 0,
      perPage: 10,
    };

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
  
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${this.state.accesstoken}`,
    // };
    
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
  componentDidMount() {
    setTimeout(this.renewaccesstoken(), 10000);
    this.getstudents();
   
  }
  render() {
    return (
      <div className="align-row">
        <Sidebar />
        <div>
          <div className="tophead2">
            <Tophead name="M1 Batch" />
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

                  <th style={{width: '5%'}}>Email</th>
                  <th style={{width: '5%'}}>Phone Number</th>
                  <th style={{width: '5%'}}>Action</th>
                  

                </tr>
                
              </thead>
              <tbody>
              {this.state.students&&
                          this.state.students.map((data, index) =>{
                            if (data.batch === "M1")
                            return(
                              
                <tr key={data._id}>
                  <td>{data._id}</td>
                  <td>{data.first_name}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.email}</td>
                  <td><button
                                  className="Edit"
                                 
                                >
                                  Edit
                                </button>
                                &nbsp;
                                <button
                                  className="Delete"
                                
                                >
                                  Delete
                                </button></td>
                </tr>

                            )}
                          )} 
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

         
        </div>
      </div>
    );
  }
}
export default M1Batch;
