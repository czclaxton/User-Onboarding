import React from "react";

const UserList = props => {
  console.log("props here: ", props);
  return (
    <div>
      <div className="headerWrapper">
        <h1>User List</h1>
        <hr />
      </div>
      <div>
        {props.users.map(user => {
          if (user === undefined) {
            return <p />;
          } else {
            return <p>{user.username}</p>;
          }
        })}
      </div>
    </div>
  );
};

export default UserList;
