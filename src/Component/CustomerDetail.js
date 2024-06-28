import React, { Component } from "react";
import logop from "../img/pro.jpg";
import { FaAlignJustify } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Header from "./Header";
import EditCustomer from "./EditCustomer";
import axios from "axios";
import male from "../img/male.png";
import female from "../img/female.png";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript } from "@react-google-maps/api";



//***** Getting particular params in JSON */
const CustomerParams = () => {
  const params = useParams();
  return <CustomerDetail cid={params["id"]} page={params["*"]} />;
};

//******Map******
const mapContainerStyle = {
  width: "75vw",
  height: "70vh",
};
const center = {
  lat: 17.447642286814634,
  lng: 78.355588967688,
};

//**Customer Details */
export class CustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Customer: "Details",
      viewDetails: this.getViewType(this.props.page),
      data: [],
      mapLoaded: false,

    };
    console.log(this.props, "tt");
  }

  getViewType(page) {
    if (page === "edit") {
      return "editView";
    }

    if (page === "Orders") {
      return "Orders";
    }

    return "detailsView";
  }

  //  componentDidMount(){
  //   this.setData({Data:this.props.pcid});
  //   console.log(Data,"data");
  //  }
  componentDidMount() {
    let id = this.props.cid;
    axios.get(`http://localhost:3005/users/${id}`).then((res) => {
      //console.log(res,"res");
      this.setState({ data: res.data });
      console.log(this.state.data, "data");
    });
  }

  //** Total Order */
  totalOrder = (orders) => {
    if (orders === undefined) {
      return 0;
    }
    let sum = 0;
    for (let i = 0; i < orders.length; i++) {
      const element = orders[i];
      sum += element?.itemCost ?? 0;
    }
    return sum.toFixed(2);
  };

  customersDeatils = () => {
  
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "20px" }}>
          <div>
            {this.state.data.gender === "male" ||
            this.state.data.gender === "Male" ? (
              <img
                src={male}
                style={{
                  width: "70px",
                  height: "60px",
                  marginLeft: "50px",
                }}
              ></img>
            ) : (
              <img
                src={female}
                style={{
                  width: "70px",
                  height: "60px",
                  marginLeft: "50px",
                }}
              ></img>
            )}
          </div>
          <div style={{ marginLeft: "40px", marginTop: "10px" }}>
            <h6>
              {this.state.data.firstName} {this.state.data.lastName}
            </h6>
            <h6>{this.state.data.address}</h6>
            <h6>
              {this.state.data.city} ,{this.state.data.state?.name}.
            </h6>
          </div>
        </div>
        <div style={{ marginLeft: "15px", marginTop: "20px" }}>
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
            onLoad={() => this.setState({ mapLoaded: true })}
          ></LoadScript>
          {this.state.mapLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
            ></GoogleMap>
          )}
        </div>
      </div>
    );
  };
  ordersDetail = () => {
    return (
      <div style={{ marginTop: "20px", marginLeft: "100px",overflowX:"auto" }}>
        <h4>
          {" "}
          Orders for {this.state.data.firstName} {this.state.data.lastName}
        </h4>
        <table className="table table-striped" style={{ width: "800px" }}>
          <tbody>
            {this.state.data.orders?.map((product, index) => (
              <tr key={index + 1} style={{ borderBottom: "2px solid black" }}>
                <td>
                  <label>{product.productName}</label>
                </td>
                <td>
                  <label>{product.itemCost}</label>
                </td>
              </tr>
            ))}
            <tr>
              <td style={{ color: "red" }}>Total Cost</td>
              <td style={{ color: "red" }}>
                {this.totalOrder(this.state.data.orders)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  CustomerManager() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <img
            className="image2"
            src={logop}
            alt="name"
            style={{ marginTop: "8px" }}
          ></img>
          <h3> Customers Information</h3>
        </div>
        <div className="myBtnContainer">
          <button
            className={this.state.viewDetails==="detailsView"?"btn active":"btn "}
            onClick={(e) => this.setState({ viewDetails: "detailsView" })}
          >
            <FaAlignJustify />
             Customer Details
          </button>
          <button
             className={this.state.viewDetails==="Orders"?"btn active":"btn "}
            onClick={(e) => this.setState({ viewDetails: "Orders" })}
          >
            <FaTags />
             Customer orders
          </button>
          <button
             className={this.state.viewDetails==="editView"?"btn active":"btn "}
            onClick={(e) => this.setState({ viewDetails: "editView" })}
          >
            <FaEdit />
            Edit Customer
            </button>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        {this.CustomerManager()}
        {this.state.viewDetails === "detailsView" && this.customersDeatils()}
        {this.state.viewDetails === "Orders" && this.ordersDetail()}
        {this.state.viewDetails === "editView" && <EditCustomer />}
      </div>
    );
  }
}

export default CustomerParams;
