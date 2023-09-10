import { React, useEffect, useState } from "react";
import { logout, useNumCredits } from "../redux/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accountPath, listsPath, sequencesPath, contactPath } from "../constants/RouteConstants";
import { Dropdown, Navbar, Avatar, DarkThemeToggle } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useUser, viewUser } from "../redux/UserSlice";
import "../styles/Footer.css"

function MainNav(props) {
  const tabNames = ["Home", "Lists", "Settings"];
  const location = useLocation();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let user = useUser();
  console.log("user", user);
  let numCredits = useNumCredits();

  useEffect(() => {
    dispatch(viewUser());
  }, []);

  var imageUrl = null;
  if (user && "profile_pic_url" in user) {
    imageUrl = user["profile_pic_url"];
  }

  return (
    <Navbar className="bg-zinc-200 navbar-fixed" fluid rounded>
      <Navbar.Brand href="https://anote.ai/">
        {/* Image only when the theme is light  */}
        <div className="h-10 w-10 bg-center bg-contain bg-[url('../public/logo_light.png')] dark:bg-[url('../public/logo_dark.png')]"></div>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-[#374151]">
          Anote
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {/* <DarkThemeToggle
          className="mr-4"
          onClick={() => {
            const themeMode = props.darkTheme === true ? false : true;
            props.setDarkTheme(themeMode);
          }}
        /> */}
        <Dropdown
          theme={{
            arrowIcon: "text-[#374151] dark:text-[#9BA3AF] ml-2 h-4 w-4",
          }}
          inline
          label={
            imageUrl=="" ? <Avatar rounded></Avatar> : <Avatar img={imageUrl} rounded></Avatar>
          }
        >
          <Dropdown.Header>
            {user && user.name && (
              <span className="block text-sm">{user.name}</span>
            )}
            <span className="block truncate text-sm font-medium">
              {numCredits} Credits Remaining
              <FontAwesomeIcon icon={faCoins} className="ml-2" />
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => navigate(accountPath)}>
            Account
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() =>
              dispatch(logout()).then((resp) => {
                navigate("/");
                props.setIsLoggedInParent(false);
              })
            }
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={location.pathname === "/"} href="/">
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link active={location.pathname === listsPath} href={listsPath}>
          Lists
        </Navbar.Link>
        <Navbar.Link active={location.pathname === sequencesPath} href={sequencesPath}>Templates</Navbar.Link>
        {/* <Navbar.Link active={location.pathname === contactPath} href={contactPath}>Contact</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNav;
