import { Link, useLocation } from "react-router-dom";

const NavLinks=()=>{
    const links = [
        {index:1, name:"Find Jobs", url:"find-jobs"},
        {index:2, name:"Find Talent", url:"find-talent"},
        {index:3, name:"Post Job", url:"post-job/0"},
        {index:4, name:"Posted Job", url:"posted-job/0"},
        {index:5, name:"Job History", url:"job-history"},

    ]
    const location = useLocation();
    return(
        <div className="flex lg-mx:hidden gap-8 text-mine-shaft-200 h-full items-center">{
            links.map((link, index)=>
            <div className={`${location.pathname==="/"+link.url ? "border-bright-sun-400 text-bright-sun-400":"border border-none"} border-t-[3px] h-full flex items-center`}>
            <Link className="hover:text-mine-shaft-200 " key={index} to={link.url}>{link.name}</Link>
            </div>
            )
        }
        </div>
    )
}

export default NavLinks;