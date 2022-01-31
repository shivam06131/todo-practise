import React, { useEffect, useState } from "react";
import "./ShowUser.css";
//! Refreshing problem

const ShowUser = (props) => {
  // const [user, setUser] = useState([]);

  //! Why is this giving errors
  // setUser(userData);

  // useEffect(() => {
  //   setUser([...user, props.userData]);
  //   //!this line
  //   if (props.clear) setUser([]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.userData, props.clear]);

  const handleDelete = (index) => {
    props.handleDeleteFromHero(index);
  };

  const handleEdit = (index, item) => {
    props.handleEditFromHero(index, item);
  };

  if (props.userData.length === 0) {
    return (
      <div>
        <h1>ALL Users Cleared</h1>
      </div>
    );
  }

  return (
    <div className="ShowUser_main_container">
      <div className="ShowUser_container">
        {Array.isArray(props.userData) &&
          props.userData.map((item, index) => {
            return (
              <div key={index} className="ShowUser_container-card">
                <div className="ShowUser_container-card_entity">
                  <p>Name :</p>
                  <p>{item.name}</p>
                </div>
                <div className="ShowUser_container-card_entity">
                  <p>Age :</p>
                  <p>{item.age}</p>
                </div>
                <div className="ShowUser_container-card_entity">
                  <p>Email :</p>
                  <p>{item.email}</p>
                </div>
                <button
                  className="delete"
                  onClick={() => handleDelete(item.count)}
                >
                  Delete
                </button>
                <button
                  className="delete"
                  onClick={() => handleEdit(item.count, item)}
                >
                  Edit
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShowUser;
