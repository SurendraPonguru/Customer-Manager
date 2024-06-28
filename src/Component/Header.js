import React, { Component } from "react";
import logo from "../img/people.png";
import { Link, Navigate } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPreference: "",
    };
  }
  refreshPage = () => {
    window.location.reload();
  };

  customersPage = () => {
    <Navigate to="/body" />;
    console.log("body");
  };
  handleClickLogout = () => {
    if (window.confirm("Are sure , You Want logged off") === true) {
      localStorage.setItem("authenticated", false);
      this.setState({});
      this.userPreference = "Successfully logged off";
    } else {
      window.alert(" logged off Cancelled");
      // <Navigate to="/App" />;
    }
    console.log("Logout");
  };


  handleClick = () => {
    <Navigate to="/About" />;
  };




  isLoggedIn = () =>
    JSON.parse(localStorage.getItem("authenticated") ?? "false");

  render() {
   
    if (!this.isLoggedIn()) {
      console.log("redirect");
      return <Navigate to="/" />;
    }

    return (
      <div className="header1">
        <header>
          <img
            className="image1"
            src={logo}
            alt="name"
            onClick={this.refreshPage}
          ></img>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Customer Manager
          </h3>
          <Link to="/App">
            <button className="button1">Customers</button>
          </Link>

          <Link to="/Orders">
            <button className="button2">Orders</button>
          </Link>
          <Link to={"/about"}>
            <button className="button2">About</button>
          </Link>
          <button className="button2" onClick={(e) => this.handleClickLogout()}>
            Logout
          </button>
        </header>
      </div>
    );
  }
}
