import React, { Component } from "react";
import "../../Styles/tab.css";
import Sidebar from "../Dashboard/SideMenu";
import Tophead from "../Dashboard/Tophead.js";
import TimeTableM1 from "./TimeTableM1.tsx";
import TimeTableM2 from "./TimeTableM2.tsx";
import TimeTableE1 from "./TimeTableE1.tsx";
import TimeTableE2 from "./TimeTableE2.tsx";
import { Table, Row, Col } from "reactstrap";
import axios from "axios";
import '../../Styles/timetable.css';
import "../../Styles/admin.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import ReactPaginate from "react-paginate";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

class Tab extends Component {
    render(){
      return(
        <div className="align-row">
        <Sidebar />
        <div>
          <div className="tophead1" style={{}}>
            <Tophead name="TimeTable"/>
          </div>
          <br/>
        <div className="tabs">
         <Tabs>
           <Tab label="M1">
             <div>
               <TimeTableM1/>
             </div>
           </Tab>
           <Tab label="M2">
             <div>
                 <TimeTableM2/>
            </div>
           </Tab>
           <Tab label="E1">
             <div>
                <TimeTableE1/>
             </div>
           </Tab>
           <Tab label="E2">
             <div>
               <TimeTableE2/>
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