import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CREATE_FEEDBACK_MUTATION,
  CREATE_USER_MUTATION,
} from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
// import axios from "axios";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState("");
  const [record, setRecord] = useState([]);
  const [recordFeedback, setRecordFeedback] = useState([]);
  const [feedbackUserName, setFeedbackUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);

  const [createFeedback] = useMutation(CREATE_FEEDBACK_MUTATION);
  useEffect(() => {
    loadUsers();
    loadFeedback();
  }, []);

  const loadUsers = async () => {
    var response = fetch("http://localhost:6969/users")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });
  };
  const loadFeedback = async () => {
    var response = fetch("http://localhost:6969/feedback")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecordFeedback(myJson);
      });
  };

  console.log("record", record);
  // console.log("userId", userId, feedback, firstName);

  const addUser = () => {
    console.log("firstName,occupation", firstName, occupation);
    if (error) {
      console.log(error.message);
    }
    createUser({
      variables: {
        firstName: firstName,
        occupation: occupation,
        // email: email,
        // password: password,
      },
    });
  };

  console.log("feedbackUserName", feedbackUserName);
  const handleChange = (e) => {
    setUserId(e.target.value);
    const UserName = record.find(({ _id }) => e.target.value === _id);
    setFeedbackUserName(UserName.name);
  };

  const addFeedback = () => {
    console.log("userId(*(*((*(", userId);
    createFeedback({
      variables: {
        firstName: feedbackUserName,
        feedback: feedback,
        userId: userId,
      },
    });

    if (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="title">Add Users</div>
      <div className="form">
        <input
          className="form-input"
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Occupation"
          onChange={(e) => {
            setOccupation(e.target.value);
          }}
        />
        {/* <input
          className="form-input"
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        /> */}
        <button className="create-button" onClick={addUser}>
          {" "}
          Add User
        </button>
      </div>
      <div className="title">Add Users Feedback</div>
      <div className="form">
        {/* <input
          className="form-input"
          type="text"
          placeholder="User Id"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        /> */}
        <select
          // className="form-input"
          class="form-select form-select-lg mb-3 form-input"
          aria-label=".form-select-lg example"
          defaultValue="none"
          value={userId}
          onChange={handleChange}
        >
          {record.map(({ _id, name }) => (
            <option selected value={_id}>
              {name}
            </option>
          ))}
        </select>
        <input
          className="form-input"
          type="text"
          placeholder="Feedback"
          onChange={(e) => {
            setFeedback(e.target.value);
          }}
        />
        {/* <input
          className="form-input"
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        /> */}
        <button className="create-button" onClick={addFeedback}>
          {" "}
          Add feedback
        </button>
      </div>
      <div className="form">
        <table class="table table-hover  table-striped table-bordered ml-4 ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Occupation</th>
            </tr>
          </thead>
          <tbody>
            {record.map((name) => (
              <tr>
                <td>{name.name}</td>
                <td>{name.occupation}</td>

                <td>
                  {/* <a
                  className="text-danger mr-2"
                  onClick={() => {
                    const confirmBox = window.confirm(
                      "Do you really want to delete " + name.first_name
                    );
                    if (confirmBox === true) {
                      deleteRecord(name.id);
                    }
                  }}
                >
                  {" "}
                  <i
                    class="far fa-trash-alt"
                    style={{ fontSize: "18px", marginRight: "5px" }}
                  ></i>{" "}
                </a> */}

                  {/* <Link class=" mr-2" to={`/EditEmployee/editID/${name.id}`}>
                  <i class="fa fa-edit" aria-hidden="true"></i>
                </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form">
        <table class="table table-hover  table-striped table-bordered ml-4 ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Feedbacks</th>
            </tr>
          </thead>
          <tbody>
            {recordFeedback.map(({ feedback, userId, _id, name }) => (
              <tr>
                <td>{name}</td>
                <td>{feedback}</td>

                <td>
                  {/* <a
                  className="text-danger mr-2"
                  onClick={() => {
                    const confirmBox = window.confirm(
                      "Do you really want to delete " + name.first_name
                    );
                    if (confirmBox === true) {
                      deleteRecord(name.id);
                    }
                  }}
                >
                  {" "}
                  <i
                    class="far fa-trash-alt"
                    style={{ fontSize: "18px", marginRight: "5px" }}
                  ></i>{" "}
                </a> */}

                  {/* <Link class=" mr-2" to={`/EditEmployee/editID/${name.id}`}>
                  <i class="fa fa-edit" aria-hidden="true"></i>
                </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Form;
