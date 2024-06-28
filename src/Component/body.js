import React, { Component } from "react";
import logo from "../img/pro.jpg";
import logos from "../img/male.png";
import logoss from "../img/female.png";
import profileDetails from "./assets/profileDetails.json";
import { FaEdit } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Paginate from "./pagination";
import MapView from "./mapview";
import CustomerDetails from "./CustomerDetail";
import { Link } from "react-router-dom";
import AddCustomer from "../Component/AddCustomer";
import axios from "axios";


export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleLogo: logos,
      samplePic: logoss,
      data: [],
      filterdata: [],
      listdetails: [],
      viewType: "gridView",
      openPage: "openPage",
      view: "mapedView",
      dataTransfer: "",
      customers: [],
      searchTerm: [],
      setSearchTerm: [],
      posts: [],
      loading: false,
      pageNo: 0,
      data: [],
      searchKey: "",
    };
  }

  componentDidMount() {
    console.log("profileDetails", profileDetails);
    console.log("listview", profileDetails);
    console.log("Details", CustomerDetails);
    console.log(profileDetails.users, "rrr");
    this.setState({ data: profileDetails.users });
    this.setState({ filterdata: profileDetails });
    
  }
  componentDidMount() {
    axios.get("http://localhost:3005/users").then((res) => {
      // const posts = [];
      // for (let key in res.data) {
      //   posts.push({ ...res.data[key], id: key });
      // }
      // console.log(posts);
      console.log(res);
      this.setState({ data: res.data });
    });
  }

  

  

  //*********Customer */
  customerView = () => {
    return (
      <div>
        <div>
          <img className="image2" src={logo} alt="name"></img>
          <label className="label1">Customers</label>
        </div>
        <div className="myBtnContainer">
          <button
            className={this.state. viewType==="gridView"?"btn active":"btn "}
            onClick={(e) => this.setState({ viewType: "gridView", pageNo: 0 })}
          >
            <FaMicrosoft style={{ marginBottom: "5px" }} /> Card View{" "}
          </button>
          <button
            className={this.state. viewType==="listView"?"btn active":"btn "}
            onClick={(e) => this.setState({ viewType: "listView", pageNo: 0 })}
          >
            <FaAlignJustify style={{ marginBottom: "5px" }} />
             List View{" "}
          </button>
          <button
            className={this.state. viewType==="mapView"?"btn active":"btn "}
            onClick={(e) => this.setState({ viewType: "mapView" })}
          >
            <FaMapMarkerAlt style={{ marginBottom: "5px" }} />
             Map View
          </button>
          <button
            className={this.state. viewType==="newCustomerView"?"btn active":"btn "}
            onClick={(e) => this.setState({ viewType: "newCustomerView" })}
          >
            <FaPlus style={{ marginBottom: "5px" }} />
             New Customer
          </button>
          <div className="innerdiv2">
            <label style={{fontSize:"18px"}}>Filter : </label>
           
            <input
              className="searchInput"
              type="text"
              placeholder="...Search..."
              onChange={(e) => this.setState({ searchKey: e.target.value })}
            ></input>
          </div>
        </div>
      </div>
    );
  };

  ///*********Card View**********
  listCustomerData = () => {
    console.log("bb", this.state.data.length);
    return this.state.data
      .filter(
        (profile) =>
          profile.firstName.toLowerCase().includes(this.state.searchKey) ||
          profile.firstName.toUpperCase().includes(this.state.searchKey) ||
          profile.lastName.toLowerCase().includes(this.state.searchKey) ||
          profile.lastName.toUpperCase().includes(this.state.searchKey) ||
          profile.gender.toLowerCase().includes(this.state.searchKey) ||
          profile.gender.toUpperCase().includes(this.state.searchKey) ||
          profile.city.toLowerCase().includes(this.state.searchKey) ||
          profile.city.toUpperCase().includes(this.state.searchKey) ||
          profile.state.name.toLowerCase().includes(this.state.searchKey)
      )
      .slice(this.state.pageNo * 10, (this.state.pageNo + 1) * 10)
      .map((profile, index) => (
        <div key={index + 1} className="insideBodyDiv1">
          <div className="insideBodyDiv2">
            <label style={{ color: "white", marginLeft: "10px" }}>
              {profile.firstName} {profile.lastName}
            </label>
            <Link to={`/CustomerDetail/${profile.id}/edit`}>
              <button
                style={{
                  float: "right",
                  padding: "6px",
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >
                <FaEdit />
              </button>
            </Link>
          </div>
          <div className="insideBodyDiv3">
            <div>
              {profile.gender === "male" || profile.gender === "Male" ? (
                <img
                  className="bodyImg"
                  src={logos}
                  style={{
                    width: "70px",
                    height: "60px",
                    marginLeft: "10px",
                  }}
                  alt="name"
                ></img>
              ) : (
                <img
                  className="bodyImg"
                  src={logoss}
                  style={{
                    width: "70px",
                    height: "60px",
                    marginLeft: "10px",
                  }}
                  alt="name"
                ></img>
              )}
            </div>
            <div className="insideBodyDiv4">
              <label style={{ fontSize: "17px" }}>{profile.city}</label>
              <br></br>
              <label style={{ fontSize: "17px" }}>{profile.state.name}</label>
              <br></br>
              <Link to={`/CustomerDetail/${profile.id}`}>
                <button
                  src="#"
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "15px",
                    color: "rgb(75, 120, 235)",
                    marginLeft: "-6px",
                  }}
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ));
  };

  ////*******List View ********/
  listView = () => {
    return (
      <div className="listTable">
        <table className="table table-striped">
          <thead style={{ borderBottom: "2px solid black", fontSize: "17px" }}>
            <tr>
              <th className="list"> Profile</th>
              <th className="list">FirstName</th>
              <th className="list">LastName</th>
              <th className="list">Address</th>
              <th className="list">City</th>
              <th className="list">State</th>
              <th className="list" style={{ width: "100px;" }}>
                OrderTotal
              </th>
              <th className="list">Orders</th>
            </tr>
          </thead>
          <tbody>
            {console.log(this.state.data, "ddd")}
            {this.state.data
              .filter(
                (profile) =>
                  profile.firstName
                    .toLowerCase()
                    .includes(this.state.searchKey) ||
                  profile.lastName
                    .toLowerCase()
                    .includes(this.state.searchKey) ||
                  profile.gender.toLowerCase().includes(this.state.searchKey) ||
                  profile.city.toLowerCase().includes(this.state.searchKey) ||
                  profile.state.name
                    .toLowerCase()
                    .includes(this.state.searchKey)||
                     profile.firstName
                    .toLowerCase()
                    .includes(this.state.searchKey) ||
                  profile.lastName
                    .toLowerCase()
                    .includes(this.state.searchKey) ||
                  profile.gender.toLowerCase().includes(this.state.searchKey) ||
                  profile.city.toLowerCase().includes(this.state.searchKey) ||
                  profile.state.name
                    .toLowerCase()
                    .includes(this.state.searchKey)
              )
              .slice(this.state.pageNo * 4, (this.state.pageNo + 1) * 4)
              .map((profile, index) => {
                return (
                  <tr key={index + 1}>
                    <td className="list1">
                      {" "}
                      {profile.gender === "male" ||
                      profile.gender === "Male" ? (
                        <img
                          className="bodyImg"
                          src={logos}
                          style={{
                            width: "75px",
                            height: "70px",
                            marginLeft: "10px",
                          }}
                          alt="name"
                        ></img>
                      ) : (
                        <img
                          className="bodyImg"
                          src={logoss}
                          style={{
                            width: "90px",
                            height: "75px",
                            marginLeft: "10px",
                            background: "transparent",
                          }}
                          alt="names"
                        ></img>
                      )}
                    </td>
                    <td className="list1">
                      <Link to={`/CustomerDetail/${profile.id}`}>
                        {" "}
                        <button
                          style={{
                            border: "none",
                            width: "100px",
                            background: "transparent",
                            color: "rgb(75, 120, 235)",
                          }}
                        >
                          {profile.firstName}
                        </button>
                      </Link>
                    </td>
                    <td className="list1">{profile.lastName}</td>
                    <td className="list1" style={{ width: "150px" }}>
                      {profile.address}
                    </td>
                    <td className="list1">{profile.city}</td>
                    <td className="list1">{profile.state.name}</td>
                    <td className="list1">
                      $ {this.totalOrder(profile.orders)}
                    </td>
                    <td className="list1">
                      <Link to={`/CustomerDetail/${profile.id}/Orders`}>
                        <button
                          style={{
                            border: "none",
                            width: "100px",
                            background: "transparent",
                            color: "rgb(75, 120, 235)",
                          }}
                          onClick={(e) => this.state.customerData("Details")}
                        >
                          View Orders
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  };

  totalOrder = (orders) => {
    if (orders === undefined) {
      return 0;
    }
    let sum = 0;
    for (let i = 0; i < orders.length; i++) {
      const element = orders[i];
      sum += element.itemCost ?? 0;
    }
    return sum.toFixed(2);
  };

  // search = (searchKey) => {
  //   let filterdata;
  //   console.log("sss", searchKey);
  //   if (searchKey != "") {
  //     filterdata = this.state.data.filter(
  //       (data) =>
  //         data.firstName.toLowerCase().includes(searchKey) ||
  //         data.lastName.toLowerCase().includes(searchKey) ||
  //         data.gender.toLowerCase().includes(searchKey) ||
  //         data.city.toLowerCase().includes(searchKey) ||
  //         data.state.name.toLowerCase().includes(searchKey)
  //     );
  //     this.setState({ data: filterdata });
  //   } else {
  //     this.setState({ data: this.state.data });
  //   }
  // };

  render() {
    console.log("state", this.state);
    return (
      <div>
        <div>
         
          {this.customerView()}
          <div className="cardView">
            {this.state.viewType === "gridView" && this.listCustomerData()}
          </div>
          {this.state.viewType === "listView" && this.listView()}
          {this.state.viewType === "mapView" && (
            <MapView views={this.state.data} style={{ marginTop: "10px" }} />
          )}
          {this.state.viewType === "newCustomerView" && (
            <AddCustomer data={this.state.data} />
          )}
        </div>
        {(this.state.viewType === "gridView" ||
          this.state.viewType === "listView") && (
          <Paginate
            listdetails={this.state.data}
            view={this.state.viewType}
            searchKey={this.state.searchKey}
            updatePageNo={(index) => this.setState({ pageNo: index })}
          />
        )}
      </div>
    );
  }
}
