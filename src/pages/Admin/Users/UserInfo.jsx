import moment from "moment";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function UserInfo(props) {
  const { userLogin } = useSelector((state) => state.auth);

  return (
    <div style={{ padding: "50px" }} id="infoAdmin">
      <h1
        style={{ fontSize: "30px", color: "black", fontWeight: "bold" }}
        className="text-center mb-5"
      >
        {userLogin.role}: {userLogin.name}
      </h1>
      <div>
        <NavLink
          to={`/admin/user/edituser/${userLogin._id}`}
          className="button-update-info btn__login btn btn-success"
        >
          Edit Người Dùng
        </NavLink>
      </div>
      <div className="d-flex justify-content-start">
        <table>
          <tbody>
            <tr>
              <td>
                <span>Role</span>
                <span>:</span>
              </td>
              <td>{userLogin.role === "ADMIN" ? "Admin" : "Client"}</td>
            </tr>
            <tr>
              <td>
                <span>Id</span>
                <span>:</span>
              </td>
              <td>{userLogin._id}</td>
            </tr>
            <tr>
              <td>
                <span>Password</span>
                <span>:</span>
              </td>
              <td>{userLogin.password}</td>
            </tr>
            <tr>
              <td>
                <span>Email</span>
                <span>:</span>
              </td>
              <td>{userLogin.email}</td>
            </tr>
            <tr>
              <td>
                <span>Name</span>
                <span>:</span>
              </td>
              <td>{userLogin.name}</td>
            </tr>
            <tr>
              <td>
                <span>Birthday</span>
                <span>:</span>
              </td>
              <td>{moment(userLogin.birthday).format("DD/MM/YYYY")}</td>
            </tr>
            <tr>
              <td>
                <span>Phone</span>
                <span>:</span>
              </td>
              <td>{userLogin.phone}</td>
            </tr>
            <tr>
              <td>
                <span>Gender</span>
                <span>:</span>
              </td>
              <td>{userLogin.gender === true ? "Male" : "Female"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(UserInfo);
