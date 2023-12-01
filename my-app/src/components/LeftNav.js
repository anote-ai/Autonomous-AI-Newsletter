import { React, useEffect } from "react";
import { logout } from "../redux/UserSlice";
import noUserImg from '../assets/noUserImg.png';
import { accountPath, mainPagePath, allnewsletter } from "../constants/RouteConstants";
import { Sidebar } from 'flowbite-react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDetailPageOne } from "../redux/DetailSlice"
import { useUser, viewUser } from "../redux/UserSlice";
import { HiShoppingBag, HiChartPie, HiTable, HiViewBoards } from 'react-icons/hi';

function LeftNav(props) {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let getUserDetailPageOne = useDetailPageOne();
    let user = useUser();
    useEffect(() => {
        dispatch(viewUser());
    }, []);

    var imageUrl = noUserImg;
    if (user && "profile_pic_url" in user) {
        if (user["profile_pic_url"] !== "") {
            imageUrl = user["profile_pic_url"];
        }
    }
    return (
        <Sidebar className="fixed left-0 top-0 w-1/6 h-screen" aria-label="Sidebar with logo branding example">
            <div className="flex w-full h-36 justify-center items-center">
                <img src={getUserDetailPageOne[3].data !== ''? getUserDetailPageOne[3].data : noUserImg} alt="img" className="aspect-square rounded-full w-1/3"></img>
            </div>
            <Sidebar.Items className="">
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        onClick ={() =>
                            navigate('/')
                        }
                        icon={HiChartPie}
                    >
                        <p>
                            Profile
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        onClick ={() =>
                            navigate(accountPath)
                        }
                        icon={HiShoppingBag}
                    >
                        <p>
                            Account
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        onClick ={() =>
                            navigate(allnewsletter)
                        }
                        icon={HiViewBoards}
                    >
                        <p>
                            All Letters
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        onClick ={() =>
                            navigate(mainPagePath)
                        }
                        icon={HiShoppingBag}
                    >
                        <p>
                            Create
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item className="absolute bottom-5 w-5/6"
                        onClick={() =>
                            dispatch(logout()).then((resp) => {
                                props.setIsLoggedInParent(false);
                                navigate("/");
                            })
                        }
                        icon={HiTable}
                    >
                        <p>
                            Log out
                        </p>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
export default LeftNav;