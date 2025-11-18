
import JobsCard from "../FindJobs/JobsCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/JobService";

const RecommendJob=(props:any)=>{
    
    const [jobList , setJobList] = useState<any>(null);
    useEffect(()=>{
        getAllJobs().then((res)=>{
            setJobList(res);
        }).catch((error:any)=>{
            console.log(error);
        })
    },[])
    return <div>
        <div className="text-xl font-semibold mb-5">
        Recommended Job
    </div>
    <div className="flex bs:flex-col flex-wrap gap-5 justify-between bs-mx:justify-start">
        {
        jobList?.map((job:any, index:number)=>index<5 && props.id!==job.id &&<JobsCard key={index} {...job} /> )
        }
    </div>
    </div>

}

export default RecommendJob;