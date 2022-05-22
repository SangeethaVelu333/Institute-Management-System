import React, { useRef } from "react";
import Sidebar from "../Dashboard/SideMenu";
import Tophead from "../Dashboard/Tophead.js";
import "../../Styles/header.css";
import ReactToPrint from "react-to-print";

export default function PrintComponent() {
  let componentRef = useRef();

  return (
    <>
     <div className="align-row">
        <Sidebar />
        <div>
          <div className="tophead1">
            <Tophead name="Print Details"/>
          </div>
          <br/>
      <div classname = 'print'>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <button class="btn btn-success" style={{marginLeft: '790px'}}>PRINT</button>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <ComponentToPrint ref={(el) => (componentRef = el)} />
      </div>
      </div>
      </div>
      </>

  );
}

class ComponentToPrint extends React.Component {
    render() {
      return (
        <div>
          <h2 style={{color: "green", marginLeft: '350px', marginTop: '35px'}}>TimeTable</h2>
          <p style = {{marginLeft : '275px'}}>Click above button opens print preview</p>
        </div>
      );
    }
  }