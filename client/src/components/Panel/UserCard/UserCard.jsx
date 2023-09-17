// import other component
import UserProfile from "../UserProfile/UserProfile";
import SideBarLinks from "../SideBarLinks/SideBarLinks";

const UserCard = ({ user, sidebarLinks, setToggel }) => {
  return (
    <>
      <UserProfile user={user} />
      <SideBarLinks sidebarLinks={sidebarLinks} setToggel={setToggel} />
    </>
  );
};

export default UserCard;
