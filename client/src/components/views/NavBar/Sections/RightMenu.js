/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import UsersPage from '../../UserPage/UserPage';
import { useHistory } from 'react-router';


function RightMenu(props) {
  const user = useSelector(state => state.user)

  const history =useHistory()
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };
  // console.log(user)
  const userspush=()=>{
history.push('/users')

  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <div>
      {/* // <Menu mode={props.mode}>
       <Menu.Item key="mail">
         <a href="/login">Sign In</a>
        </Menu.Item>
        <Menu.Item key="app">
        <a href="/register">Register</a>
         </Menu.Item>
        
       </Menu> */}
      <Button variant="outline-dark"><a href="/login"><font color="white">SIGN IN</font></a></Button>
      <Button variant="outline-dark"><a href="/register"><font color="white">REGISTER</font></a></Button>
      {/* <Button variant="outline-dark"><a Href="/tvseries"><font color="white">TV SERIES</font></a></Button> */}
      </div>
    )
   
  } else {
    return (
      // <Menu mode={props.mode}>
      //   {/* <h2><b>WELCOME {user}</b></h2> */}
      //   <Menu.Item key="logout">
      //     <a onClick={logoutHandler}>Logout</a>
      //   </Menu.Item>
      //   <Menu.Item key="users">
      //     <a onClick={userspush}>INFO</a>
      //   </Menu.Item>
       
      // </Menu>
      <div>
    {/* {this.user.userData.map(u =>
                        
                    )} */}

                    {/*  THE QUESTION MARK IS THE MOST IMPORTANT THING TO FIX THE ERROR OF REFRESHING THE PAGE WHILE RENDERING*/}
    <Button variant="outline-dark"><a onClick={userspush}><font color="white">{user.userData?.name}</font></a></Button>
      <Button variant="outline-dark"><a onClick={logoutHandler}><font color="white">LOG OUT</font></a></Button>

      </div>
    //   <div class="dropdown">
    //   <button class="dropbtn">Dropdown</button>
    //   <div class="dropdown-content">
    //   <a href="#">Link 1</a>
    //   <a href="#">Link 2</a>
    //   <a href="#">Link 3</a>
    //   </div>
    // </div>
    )
  }
}

export default withRouter(RightMenu);