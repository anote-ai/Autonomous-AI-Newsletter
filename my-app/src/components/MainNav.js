import { React, useEffect } from "react";
import { logout, useNumCredits, useUser, viewUser, refreshCredits } from "../redux/UserSlice";
import noUserImg from '../assets/noUserImg.png';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accountPath, mainPagePath } from "../constants/RouteConstants";
import { Dropdown, Navbar, Avatar } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDetailPageOne } from "../redux/DetailSlice"
import "../styles/Footer.css"

function MainNav(props) {
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
    <Navbar fluid className="box-border border-b-2 border-black" >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-[#374151]">
          NWSLTR.AI
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <button outline onClick={() => {
          // console.log(numCredits)
          if (numCredits === 0) {
            alert("not have enough credits")
          }
          else {
            navigate(mainPagePath)
          }
        }} className="cursor-pointer flex justify-center font-bold text-sm items-center text-white mr-5 bg-orange-500 rounded-full hover:bg-white hover:text-orange-500 border-2 border-orange-500 w-48">
          <FontAwesomeIcon size="lg" icon={faPlus} className="mr-2" />
          <p>Create Newsletter</p>
        </button>
        <Dropdown
          theme={{
            arrowIcon: "text-[#374151] dark:text-[#9BA3AF] ml-2 h-4 w-4",
          }}
          inline
          label={
            getUserDetailPageOne[3].data === '' ? <Avatar img={noUserImg} rounded> </Avatar> : <Avatar img={getUserDetailPageOne[3].data} rounded className="h-full"></Avatar>
          }
        >
          <Dropdown.Header>
            {user && user.name && (
              <span className="block text-sm">{user.name}</span>
            )}
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
    </Navbar>
  );
}

export default MainNav;
