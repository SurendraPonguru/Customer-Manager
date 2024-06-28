import React, { useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const libraries = ["places"];

const mapContainerStyle = {
  width: "85vw",
  height: "70vh",
};

const center = {
  lat: 17.447642286814634,
  lng: 78.355588967688,
};

function MapView(props) {
  let prDetails = props.views;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [data, setdata] = useState([{}]);
  console.log("data", data.length);
  const getUser = async () => {
    await axios
      .get("http://localhost:3005/users")
      .then((res) => setdata(res.data));
    console.log(data.length, "mmm");
  };

  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "loading maps";
  return (
    <div className="App" style={{}}>
      <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
          style={{marginRight:"-30px",float:"left", backgroundColor: " rgb(75, 120, 235)"}}
        >
          profile List
        </button>
      <div style={{ marginTop: "35px", display: "flex" }}>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  New message
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <table className="table table-striped">
                  <thead>
                    <tr style={{ border: "2px solid black" }}>
                      <th>Profile List</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prDetails.map((index) => (
                      <tr className="maptr">
                        <td style={{ display: "flex", border: "none" }}>
                          <>{index.id}.</>
                          <button className="mapedButton">
                            {index.firstName} {index.lastName}
                          </button>
                          <label>{index.city}</label>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{marginLeft:"30px",overflowX:"auto"}}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
          />
        </div>
      </div>
    </div>
  );
}
// lat: 17.447642286814634,
// lng: 78.355588967688,

export default MapView;
