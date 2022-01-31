import React, { useState } from "react";
import "./Hero.css";
import ShowUser from "../ShowUser/ShowUser";

//! if you change the state and set the state to the array
// const [state ,setState] = useState();
// const arr = [1,2,3,4]
//setState(arr);
// arr.push(5);
//setState(arr); ==> this won't rerender as the reference is same and react do not do deep watch on array and object.
//setState([...arr]) ==> this will trigger re render as the new arr is created(new reference).

const Hero = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [allUser, setAllUser] = useState([]);
  const [count, setCount] = useState(0);
  const [clear, setClear] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState({
    name: "",
    age: "",
    email: "",
    count: 0,
  });

  const createUser = () => {
    // console.log("userData ", { ...userData });
    setCount((val) => val + 1);
    // if (userData.name && userData.age && userData.email) {
    // setAllUser([...allUser, { name, age, email, count }]);
    // console.log("alluser inside", allUser);
    setAllUser([...allUser, { ...userData, count } ]);
    // }
    // console.log("alluser", allUser);
    setClear(false);
    // setAge("");
    // setEmail("");
    // setName("");
    userData.name = "";
    userData.age = "";
    userData.email = "";
  };

  const setNameHandler = (e) => {
    setName(e.target.value);
  };
  const EditNameHandler = (e) => {
    // setEditItem((editItem.name = e.target.value));
    //! object update
    setEditItem({
      ...editItem,
      name: e.target.value,
    });
  };
  const setEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const EditEmailHandler = (e) => {
    setEditItem({
      ...editItem,
      email: e.target.value,
    });
  };
  const setAgeHandler = (e) => {
    setAge(e.target.value);
  };
  const EditAgeHandler = (e) => {
    //! best way to update an object.
    setEditItem({
      ...editItem,
      age: e.target.value,
    });
  };

  const EditUser = (index) => {
    //! imp
    // setAllUser({ ...editItem });
    // console.log("edituser", editItem);

    let filter = allUser.filter((val) => val.count !== index);
    // setAllUser([
    //   ...(data) => data.filter((val) => val.count !== index),
    //   editItem,
    // ]);
    //! best way to update an array.
    setAllUser([...filter, editItem]);
    setEdit(false);
    // console.log("all user ", allUser);
  };

  const handleEditFromHero = (index, item) => {
    setEdit(true);
    setEditItem({
      name: item.name,
      age: item.age,
      email: item.email,
      count: index,
    });
  };

  const handleChange = (e) => {
    console.log("e.target.name", [e.target.name], e.target.value);
    // { [key] : value}.
    //[key] ==> this wont work.
    // [key] will only work in {} as it ia object's key {[key] : value}.
    setUserData({
      ...userData,
      //key : e.target.value
      [e.target.name]: e.target.value,
    });
  };
  const handleDeleteFromHero = (index) => {
    // console.log("index", index);
    setAllUser((data) => data.filter((item) => item.count !== index));
  };

  return (
    <div>
      <div className="Hero_container">
        {edit ? (
          <div className="Hero_container_box">
            <input
              value={editItem.name}
              onChange={(val) => EditNameHandler(val)}
              type="text"
              placeholder="Enter Your name"
            />
            <input
              value={editItem.email}
              onChange={(val) => EditEmailHandler(val)}
              type="email"
              placeholder="email"
            />
            <input
              value={editItem.age}
              onChange={(val) => EditAgeHandler(val)}
              type="number"
              placeholder="age"
            />
            <div className="Hero_container-button_holder">
              <div className="holder">
                <button onClick={() => EditUser(editItem.count)}>Edit</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="Hero_container_box">
            <input
              // value={name}
              value={userData.name}
              name="name"
              // onChange={(val) => setNameHandler(val)}
              onChange={(val) => handleChange(val)}
              type="text"
              placeholder="Enter Your name"
            />
            <input
              // value={email}
              value={userData.email}
              name="email"
              // onChange={(val) => setEmailHandler(val)}
              onChange={(val) => handleChange(val)}
              type="email"
              placeholder="email"
            />
            <input
              // value={age}
              value={userData.age}
              name="age"
              onChange={(val) => handleChange(val)}
              // onChange={(val) => setAgeHandler(val)}
              type="number"
              placeholder="age"
            />
            <div className="Hero_container-button_holder">
              <div className="holder">
                <button onClick={() => createUser()}>Create</button>
                <button>Delete</button>
              </div>
              <div className="holder">
                <button>Edit</button>
                <button
                  onClick={() => {
                    setAllUser([]);
                    setClear(true);
                  }}
                >
                  Clear ALl
                </button>
              </div>
            </div>
          </div>
        )}
        {allUser.length > 0 && (
          <ShowUser
            handleEditFromHero={(index, item) =>
              handleEditFromHero(index, item)
            }
            handleDeleteFromHero={(index) => handleDeleteFromHero(index)}
            userData={allUser}
            clear={clear}
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
