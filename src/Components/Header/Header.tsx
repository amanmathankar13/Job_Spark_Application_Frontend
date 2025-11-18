import { Burger, Button, Drawer,} from "@mantine/core";
import {IconSparkles, IconX, IconXboxX} from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getProfile } from "../../services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotificationMenu from "./NotificationMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../Slices/UserSlice";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";
import ApplicantNavlink from "./ApplicantNavlink";


const links = [
    {index:1, name:"Find Jobs", url:"find-jobs"},
    {index:2, name:"Find Talent", url:"find-talent"},
    {index:3, name:"Post Job", url:"post-job/0"},
    {index:4, name:"Posted Job", url:"posted-job/0"},
    {index:5, name:"Job History", url:"job-history"},

]

const Header = ()=>{
    const [opened, { open, close }] = useDisclosure(false);
    const user = useSelector((state:any)=>state.user);
    const token = useSelector((state:any)=> state.jwt);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        setupResponseInterceptor(navigate, dispatch);
    },[navigate])
    const handleClick = (url: string) => {
        navigate(url)
        close();
    }
    useEffect(()=>{
        if (token) {
            if (localStorage.getItem("token")) {
                const decoded = jwtDecode(localStorage.getItem("token") || "");
                dispatch(setUser({ ...decoded, email: decoded.sub }));
            }
        }
        if(user?.profileId){
            // console.log(user);
            getProfile(user?.profileId).then((data)=>{
            dispatch(setProfile(data));
        }).catch((error:any)=>{
            console.log(error);
        }
        )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token, navigate])
    return (location.pathname!=="/sign-up"&&location.pathname!=="/login")?<div data-aos="zoom-out" className="flex justify-between w-full px-6 bg-mine-shaft-950 text-white h-24 items-center font-['poppins']">
            <div onClick={() => navigate("/")} className="flex gap-1 items-center p- text-bright-sun-400">
                <IconSparkles className="h-10 w-10" stroke={2} />
                <div className="xs-mx:hidden text-3xl font-semibold">JobSpark</div>
            </div>
            {NavLinks()}
            <div className="flex gap-4 items-center">
               {user?<ProfileMenu/>:<Link to="/login" className="text-mine-shaft-200 hover:text-bright-sun-400 ">
                    <Button variant="subtle" color="bright-sun.4">Login</Button>
               </Link>}
                {/* <div className="bg-mine-shaft-900 rounded-full p-1.5">
                    <IconSettings stroke={1.5}/>
                </div> */}
                {user?<NotificationMenu/>:<></>}
                {

                }
                <Burger className="lg:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
                <Drawer opened={opened} onClose={close}  overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} closeButtonProps={{icon: <IconX size={30} stroke={1.5} />}} position="right" size={"xs"}>
                    <div className="flex flex-col gap-8 items-center">
                    {
                    links.map((link, index)=>
                    <div className="h-full flex items-center">
                    <Link className="hover:text-bright-sun-400 text-xl" key={index} to={link.url}>{link.name}</Link>
                    </div>
                    )
                    }
                    </div>
                </Drawer>
            </div>
        </div>
        :
        <React.Fragment></React.Fragment>
}

export default Header;