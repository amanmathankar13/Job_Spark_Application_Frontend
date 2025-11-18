import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconSparkles } from "@tabler/icons-react";

import { useLocation } from "react-router-dom";
import { footerLinks } from "../../Data/Data";

const Footer = ()=>{
    const location = useLocation();
    return location.pathname!=="/sign-up"&&location.pathname!=="/login"?<div className="pt-20 pb-5 flex gap-8 justify-around flex-wrap bg-mine-shaft-950 font-['poppins']">
            <div className="w-1/4 sm-mx:w-1/3 xs-mx:w-1/2 xsm-mx:w-full flex flex-col gap-4">
                <div className="flex gap-1 items-center p- text-bright-sun-400">
                    <IconSparkles className="h-6 w-7" stroke={2} />
                        <div className="text-xl font-semibold">JobSpark</div>
                </div>
                <div className="text-sm text-mine-shaft-300">
                    Job portal with user profiles, skills updates, certifications, work experience and admin job posting.
                </div>
                <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-1 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700">
                    <div><IconBrandFacebook/></div>
                    <div><IconBrandInstagram/></div>
                    <div><IconBrandX/></div>
                </div>
            </div>
            {
                footerLinks.map((item,index)=><div key={index} className="">
                    <div className="text-lg font-semibold mb-4 text-bright-sun-400">{item.title}</div>
                    {item.links.map((link,index)=> <div className="text-mine-shaft-300 text-sm hover:translate-x-2 transiltion duration-300 ease-in-out hover:text-bright-sun-400 cursor-pointer mb-2">{link}</div>)}
                </div>)
            }
        </div>
        :
        <></>


}

export default Footer;