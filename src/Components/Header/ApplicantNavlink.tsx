import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getJobPostedBy } from "../../services/JobService";

const ApplicantNavlink=()=>{
    const user = useSelector((state:any)=>state.user);
    const location = useLocation();
    const[jobList, setJobList] = useState<any>([]);

    useEffect(()=>{
        window.scroll(0,0);
        getJobPostedBy(user.id).then((res)=>{
            setJobList(res);
        }).catch((error)=>{
            console.log(error);
        })
    }, [user.id])

    const links = [
        {index:1, name:"Find Jobs", url:"find-jobs"},
        {index:3, name:"Job History", url:"job-history"},

    ]
    return(
        <div className="flex lg-mx:hidden gap-20 text-mine-shaft-200 h-full items-center">{
            links.map((link, index)=>
            <div className={`${location.pathname==="/"+link.url ? "border-bright-sun-400 text-bright-sun-400":"border border-none"} border-t-[3px] h-full flex items-center`}>
            <Link key={index} to={link.url}>{link.name}</Link>
            </div>
            )
        }
        </div>
    )
}

export default ApplicantNavlink;