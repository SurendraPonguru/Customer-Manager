import React, { Component } from "react";
import Header from "./Header";
import about from "../img/screenshots/cust.png";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header />
        <div style={{ display: "flex",overflowX:"auto"}}>
          <img src={about} name="name" className="aboutImg"></img>

          <div>
            <div
              style={{
                marginLeft: "20px",
                marginRight: "30px",
                justifyContent: "inherit",
              }}
            >
              <h5>About </h5>
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                }}
              >
                Customer Manager is a customer managing platform which helps to
                efficiently manage all customers and their orders. <br />
                <br />
                <p style={{ textAlign: "justify" }}>
                  Customer Data is a precious asset to any business. A team that
                  has clean, accurate data that is correctly formatted will be
                  able to provide an appropriate level of service while saving
                  time . Storing customer data on emails, spreadsheets or paper
                  is a task in itself. It is very tedious to retrieve data from
                  such sources, and there are high chances of this information
                  to be misplaced or deleted because it is unorganized. That's
                  when a Customer Management System comes into the picture.
                </p>
                <h6>How it Matters</h6>
                <p style={{ textAlign: "justify" }}>
                  The customer management experience has increased its value and
                  attention in last few years. As firms identify that their
                  industries have similar competitors in large number. Customer
                  management is a serious differentiator in today’s competitive
                  atmosphere. To manage the customer effectively and efficiently
                  has real value. Practicing customer management can give the
                  following benefits.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flexWrap: "wrap", width: "100%" }}>
          <footer
            className="text-center"
            style={{ backgroundColor: "rgb(75, 120, 235)" }}
          >
            <div
              className="container d-flex justify-content-center py-5"
              style={{ height: "100px", marginTop: "60px" }}
            >
              <a
                type="a"
                className="btn btn-primary btn-lg btn-floating mx-2"
                href="https://www.facebook.com/profile.php?id=100065296068420"
                style={{ backgroundColor: "#54456b" }}
              >
                <i className="fab fa-facebook-f">
                  <FaFacebook
                    style={{ marginTop: "-17px", marginLeft: "-4px" }}
                  />
                </i>
              </a>
              <a
                type="a"
                className="btn btn-primary btn-lg btn-floating mx-2"
                href="https://www.linkedin.com/company/kanerika/"
                style={{ backgroundColor: "#54456b" }}
              >
                <i className="fab fa-youtube">
                  <FaLinkedin
                    style={{ marginTop: "-17px", marginLeft: "-4px" }}
                  />
                </i>
              </a>
              <a
                type="a"
                className="btn btn-primary btn-lg btn-floating mx-2"
                href="https://twitter.com/KanerikaSoft"
                style={{ backgroundColor: "#54456b" }}
              >
                <i className="fab fa-instagram">
                  <FaTwitter
                    style={{ marginTop: "-17px", marginLeft: "-4px" }}
                  />
                </i>
              </a>
              <a
                type="a"
                className="btn btn-primary btn-lg btn-floating mx-2"
                href="https://kanerika.com/contact-us/"
                style={{ backgroundColor: "#54456b" }}
              >
                <i className="fab fa-twitter">
                  <TiContacts
                    style={{ marginTop: "-17px", marginLeft: "-4px" }}
                  />
                </i>
              </a>
            </div>
            <div
              className="text-center text-white p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2022 Copyright :
              <a className="text-white" href="https://kanerika.com/">
                kanerika.com
              </a>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
