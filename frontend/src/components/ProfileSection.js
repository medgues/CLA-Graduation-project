import React from "react";
const ProfileSection = ({ user }) => {
  return (
    <div className="w-11/12 bg-white rounded-xl m-auto">
      <div className="m-1 flex items-center justify-start gap-5 p-5 ">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div>
          <p>Full Name : {user.fullname}</p>
          <p>User Name: {user.username}</p>
          <p>Role: {user.role}</p>
          <div className="flex items-center justify-start gap-5">
            <p>{user.designs}Designs </p>
            <p>{user.likes.length} likes</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProfileSection;
