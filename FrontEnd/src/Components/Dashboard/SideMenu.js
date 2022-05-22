import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGem, FaHeart, FaUser,FaRegCalendar,FaUserFriends, FaRegEdit,FaLayerGroup,FaGripLinesVertical,FaChalkboardTeacher,FaPencilAlt,FaPrint } from "react-icons/fa";
import logo from '../../assets/Logo/logo.ico';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
const SideNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  // added styles 
  const styles = {
    sideBarHeight: {
      height: "134vh",
    },
    menuIcon: {
      float: "right",
      margin: "10px",
    },
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };
  return (
  <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
    <ProSidebar style={styles.sideBarHeight}  collapsed={collapsed} >
      <SidebarHeader>
      {/* <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
      <img classname = "logo" src={logo} alt="Logo" style={{height : '40px', width: '50px',paddingLeft: '3px',paddingRight: '1px',marginTop: '10px',marginBottom: '10px'}} />
            Institute
      </a> */}
        <div style={styles.menuIcon} onClick={onClickMenuIcon}>
          <AiOutlineMenu style={{fontSize: '150%'}}/>
        </div>
      </SidebarHeader>
      <Menu iconShape="square">
        <MenuItem icon={<FaUser/>}>Admin <Link to="/profile" /></MenuItem>
        <SubMenu title="Batch" icon={<FaGripLinesVertical/>} >
          <MenuItem>M1<Link to="/M1Batch" /></MenuItem>
          <MenuItem>M2<Link to="/M2Batch" /></MenuItem>
          <MenuItem>E1<Link to="/E1Batch" /></MenuItem>
          <MenuItem>E2<Link to="/E2Batch" /></MenuItem>
        </SubMenu>
        {/* <MenuItem icon={<FaUserFriends/>}>StudentList <Link to="/" /></MenuItem> */}
        <MenuItem icon={<FaLayerGroup />}>Subject <Link to="/subject" /></MenuItem>
        <MenuItem icon={<FaChalkboardTeacher/>}>Staff <Link to="/staff" /></MenuItem>
        <MenuItem icon={<FaPencilAlt />}>Marks<Link to="/" /></MenuItem>
        <MenuItem icon={<FaRegEdit/>}>Attendance  <Link to="/attendance" /></MenuItem>
        <SubMenu title = "TimeTable" icon={<FaRegCalendar/>}>
        <MenuItem icon={<FaRegEdit/>}> Timetable Creation  <Link to="/timetable" /></MenuItem>
        <MenuItem icon={<FaPrint/>}> Print <Link to="/print" /></MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
    </div>
  );
};
export default SideNavigation;