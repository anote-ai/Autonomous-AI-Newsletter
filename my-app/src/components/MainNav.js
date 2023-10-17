import { React, useEffect, useState } from "react";
import { logout, useNumCredits, useUser, viewUser, refreshCredits, } from "../redux/UserSlice";
import noUserImg from '../assets/noUserImg.png';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accountPath, loginPagePath, mainPagePath, DetailPagePath, allnewsletter } from "../constants/RouteConstants";
import { Dropdown, Navbar, Avatar, DarkThemeToggle, Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useDetailPageOne } from "../redux/DetailSlice"
import "../styles/Footer.css"

function MainNav(props) {
  // const tabNames = ["Profile", "Account", "All Letters", "Create"];
  const location = useLocation();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let user = useUser();
  let getUserDetailPageOne = useDetailPageOne();
  console.log("user", user);
  let numCredits = useNumCredits();

  useEffect(() => {
    dispatch(viewUser());
    dispatch(refreshCredits())
  }, []);

  return (
    // <Navbar className="bg-zinc-200 navbar-fixed h-[6%]" fluid rounded>
    <Navbar fluid >
      <Navbar.Brand href="/">
        {/* Image only when the theme is light  */}
        {/* <div className="h-10 w-10 bg-center bg-contain bg-[url('../public/logo_light.png')] dark:bg-[url('../public/logo_dark.png')]"></div> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-[#374151]">
          nwsltr.ai
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
        <Button outline onClick={() => {
          // console.log(numCredits)
          if (numCredits === 0) {
            alert("not have enough credits")
          }
          else {
            navigate(mainPagePath)
          }
        }} className="cursor-pointer flex font-bold text-sm items-center text-white mr-5">
          <FontAwesomeIcon size="lg" icon={faPlus} className="mr-2" />
          <p>Create New NewsLetter</p>
        </Button>
        <Dropdown
          theme={{
            arrowIcon: "text-[#374151] dark:text-[#9BA3AF] ml-2 h-4 w-4",
          }}
          inline
          label={
            // <img src={getUserDetailPageOne[3].data !== ''? getUserDetailPageOne[3].data : noUserImg} alt="img" className="aspect-square rounded-full w-1/3"></img>
            getUserDetailPageOne[3].data === '' ? <Avatar img={noUserImg} rounded> </Avatar> : <Avatar img={getUserDetailPageOne[3].data} rounded></Avatar>
          }
        >
          <Dropdown.Header>
            {user && user.name && (
              <span className="block text-sm">{user.name}</span>
            )}
            {/* <span className="block truncate text-sm font-medium">
              {numCredits} Credits Remaining
              <FontAwesomeIcon icon={faCoins} className="ml-2" />
            </span> */}
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
      {/* <Navbar.Collapse>
        <Navbar.Link href="/">
          <p>Profile</p>
        </Navbar.Link>
        <Navbar.Link href={allnewsletter}>
          <p>All Letters</p>
        </Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}

export default MainNav;
