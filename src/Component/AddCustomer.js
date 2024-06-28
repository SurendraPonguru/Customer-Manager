import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCustomer = () => {
  const [resoponse, setresponse] = useState({});

  const getData = () => {
    axios
      .get("http://localhost:3005/users")
      .then((res) => {
        setresponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
  });

  async function handleFormSubmit() {
    
    let obj = {
      firstName: formData.FirstName,
      lastName: formData.LastName,
      gender: formData.gender,
      address: formData.address,
      city: formData.city,
      state: {
        abbreviation: formData.state.slice(0,2),
        name: formData.state,
      },
    };
    obj = JSON.stringify(obj);
    let response = await axios.post("http://localhost:3005/users", obj, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response) {
      toast("Customer added Succcessfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // setTimeout(() => window.location.reload(), 3000);
    } else {
      alert("something went wrong");
    }
    setFormData({
      FirstName: "",
      LastName: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      latitude: "",
      longitude: "",
    });
  }
  return (
    <div className="container" style={{ marginTop: "30px",width:"100%" }}>
      <div className="row">
        <div className="col-md-6" style={{ marginTop: "10px" }}>
          <label htmlFor="exampleFormControlInput1" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="First name"
            value={formData.FirstName}
            onChange={(e) =>
              setFormData({ ...formData, FirstName:e.target.value })
            }
            required={true}
          />
        </div>
        <div className="col-md-6" style={{ marginTop: "10px" }}>
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Last Name"
            value={formData.LastName}
            onChange={(e) =>
              setFormData({ ...formData, LastName: e.target.value })
            }
          />
        </div>
        <div className="col-md-6" style={{ marginTop: "10px" }}>
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Gender
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            required
          />
        </div>
        <div className="col-md-6" style={{ marginTop: "10px" }}>
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="D.No , Area Name "
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          ></input>
        </div>
        <div className="col-md-6" style={{ marginTop: "10px" }}>
          <label htmlFor="exampleFormControlInput1" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>
        <div className="col-md-6" style={{ marginTop: "10px" }}>
          <label htmlFor="exampleFormControlInput1" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="State"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          />
        </div>
        <div
          className="col-md-4"
          style={{ marginTop: "35px" }}
        >
          <button
            className="btn btn-success"
            onClick={handleFormSubmit}
            style={{ width: "100%", backgroundColor: " rgb(75, 120, 235)" }}
          >
            Add User
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
