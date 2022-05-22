import React, { Component } from "react";
import "../../Styles/admin.css";
import { Table } from "reactstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";


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
      .post(`http://localhost:3002/students/all`, value)
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
        .post(`http://localhost:3002/students/all`, { headers: headers })
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
                          this.state.students.map((data, index) =>{
                            if (data.batch === "M2")
                            return (
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
                </tr>)})}
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
      </div >
    );
  }
}
export default Attendance;
