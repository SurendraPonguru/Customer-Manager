import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap/Button";

function Paginate(props) {
  const [data, setData] = useState([]);
  const [pageSelected, updatePageSelected] = useState(0);
  let searchKey = props.searchKey;
  let profileDetails = props.listdetails.filter(
    (profile) =>
      profile.firstName.toLowerCase().includes(searchKey) ||
      profile.lastName.toLowerCase().includes(searchKey) ||
      profile.gender.toLowerCase().includes(searchKey) ||
      profile.city.toLowerCase().includes(searchKey) ||
      profile.state.name.toLowerCase().includes(searchKey)
  );
  const viewType = props.view;
  console.log(profileDetails, "profileDetails.length");
  const pagesCount = new Array(
    Math.ceil(profileDetails.length / (viewType === "listView" ? 4 : 10))
  ).fill(0);
  const setPagination = (indexValue) => {
    updatePageSelected(indexValue);
  };
  useEffect(() => {
    props.updatePageNo(pageSelected);
  }, [pageSelected]);
  console.log(profileDetails.length, "sss");
  return (
    <div className="btn-group me-2" style={{ marginLeft: "70px" }}>
      {pagesCount.map((_, index) => {
        return (
          <button
            variant="outline-dark"
            key={index}
            onClick={() => setPagination(index)}
            style={{
              height: "35px",
              width: "25px",
              margin: "3px",
              border: "1px solid black",
              background: "transparent",
              borderRadius:"5px 5px 5px 5px"
            }}
            
          >
            {index}
          </button>
        );
      })}
    </div>
  );
}

export default Paginate;
