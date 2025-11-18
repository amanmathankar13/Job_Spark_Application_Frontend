
import { useEffect, useState } from "react";
import JobsCard from "./JobsCard";
import Sort from "./Sort";
import { getAllJobs } from "../../services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";

const Jobs=()=>{
    const dispatch = useDispatch();
    const [jobList, setJobList] = useState([{}]);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state:any)=> state.sort);
    const [filterJobs, setFilterJobs] = useState<any>([]);
    useEffect(()=>{
        dispatch(resetFilter());
        dispatch(resetSort());
        getAllJobs().then((res)=>{
            setJobList(res.filter((job:any)=>job.jobStatus==="ACTIVE"));
        }).catch((error:any)=>{
            console.log(error);
        })
    },[dispatch])
    useEffect(() => {
        if(sort==="Most Recent"){
            setJobList([...jobList].sort((a:any,b:any)=>new Date(b.postTime).getTime()-new Date(a.postTime).getTime()));
        }
        else if(sort==="Salary: Low to High"){
            setJobList([...jobList].sort((a:any,b:any)=>a.packageOffered-b.packageOffered));
        }
        else if(sort==="Salary: High to Low"){
            setJobList([...jobList].sort((a:any,b:any)=>b.packageOffered-a.packageOffered));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sort])
    useEffect(() => {
        let filtered = jobList;
        if (filter["Job Title"] && filter["Job Title"].length>0) {
            filtered = filtered.filter((job: any) => filter["Job Title"]?.some((title:any)=> job?.jobTitle?.toLowerCase().includes(title.toLowerCase())));
        }
        if (filter.Location&&filter.Location.length>0) {
            filtered = filtered.filter((job: any) => filter["Location"]?.some((location:any)=> job?.location?.toLowerCase().includes(location.toLowerCase())));
        }
        if (filter.Experience&&filter.Experience.length>0){
            filtered = filtered.filter((job: any) => filter.Experience?.some((exp:any)=> job?.experience?.toLowerCase().includes(exp.toLowerCase())));
        }
        if (filter["Job Type"] && filter["Job Type"].length>0) {
            filtered = filtered.filter((job: any) => filter["Job Type"]?.some((type:any)=> job?.jobType?.toLowerCase().includes(type.toLowerCase())));
        }
        if(filter.salary && filter.salary.length>0){
            filtered = filtered.filter((job: any) => job?.packageOffered >= filter.salary[0] && job?.packageOffered <= filter.salary[1]);
        }
        setFilterJobs(filtered);
    }, [filter, jobList]);
    return(
    <div className="p-5">
        <div className="flex justify-between flex-wrap mt-5">
            <div className="text-2xl xs-mx:text-xl font-bold">Recommended Jobs</div>
            <Sort sort={"job"}/>
        </div>
        <div className="mt-16 flex gap-10 flex-wrap justify-around">
            {
                filterJobs.length?filterJobs?.map((job:any,index:any)=> <JobsCard key={index} {...job} />):
                <div className="text-2xl font-bold text-center">No Jobs Found</div>
            }
        </div>
    </div>
    )
}
export default Jobs;