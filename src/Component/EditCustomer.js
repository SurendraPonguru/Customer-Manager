import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCustomer = () => {
  const [data, setdata] = useState([{}]);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await axios
      .get("http://localhost:3005/users")
      .then((res) => setdata(res.data));
  };
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:3005/users/" + id)
      .then((res) => toast("deleted succesfully",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      }));
    getUser();
  };

  const [updateData, setUpdateData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    city: "",
    state: {
      name: "",
    },
    id: "",
  });

  const handleUpdate = async () => {
    console.log(updateData);
    await axios
      .put(`http://localhost:3005/users/${updateData.id}`, updateData)
      .then((res) => toast("User Updated SuccessFully"));
    getUser();
  };

  return (
    <div>
      <div style={{ marginTop: "10px" ,overflowX:"auto"}}>
        <div>
          <table className="table table-striped">
            <thead
              style={{ borderBottom: "2px solid black", fontSize: "17px" }}
            >
              <tr>
                <th scope="col">id</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Gender</th>
                <th scope="col">Address</th>
                <th scope="col">city</th>
                <th scope="col">state</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => {
                console.log(user);
                return (
                  <tr key={user.id}>
                    <td scope="row">{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.gender}</td>
                    <td>{user.address}</td>
                    <td>{user.city}</td>
                    <td>{user.state?.name}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        className="btn btn-info"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={(set) =>
                          setUpdateData({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            gender: user.gender,
                            address: user.address,
                            city: user.city,
                            state: { name: user.state?.name },
                            id: user.id,
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    FirstName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="first name"
                    value={updateData.firstName}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    LastName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="last Name"
                    value={updateData.lastName}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    gender
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="gender"
                    value={updateData.gender}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, gender: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="address"
                    value={updateData.address}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    city
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="city"
                    value={updateData.city}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, city: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    state
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="state"
                    value={updateData.state?.name}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        state: {
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleUpdate(updateData.id)}
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      theme="light" />
    </div>
  );
};

export default EditCustomer;
