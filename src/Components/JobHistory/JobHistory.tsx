import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/JobService";
import { useSelector } from "react-redux";


const JobHistory=()=>{
    const profile = useSelector((state:any)=> state.profile);
    const user = useSelector((state:any)=> state.user);
    const [activeTab, setActiveTab] = useState<any>('APPLIED');
    const [jobList,setJobList] = useState<any>([]);
    const [showList, setShowList] = useState<any>([]);
    useEffect(()=>{
        getAllJobs().then((res)=>{
            setJobList(res);
            setShowList(res.filter((job:any)=>{
                let found = false;
                job.applicants?.forEach((applicant:any)=>{
                    if(applicant.applicantId===user.id && applicant.applicationStatus === "APPLIED"){
                        found = true;
                        }
                })
                return found;
            }))
        }).catch((error)=>{
            console.log(error);
        })
    }, [user.id])
    const handleTabChange = (value:string|null) => {
        setActiveTab(value);
        if(value==="SAVED"){
            setShowList(jobList.filter((job:any)=>profile.savedJobs?.includes((job.id))))
        }
        else{
            setShowList(jobList.filter((job:any)=>{
                let found = false;
                job.applicants?.forEach((applicant:any)=>{
                    if(applicant.applicantId===user.id && applicant.applicationStatus === value){
                        found = true;
                        }
                })
                return found;
            }))
        }
    }

    return  <div className="">
    <div className="text-2xl font-semibold mb-5">Job History</div>
    <div>
        <Tabs value={activeTab} onChange={handleTabChange} radius="lg" defaultValue="applied">
                    <Tabs.List className="[&_button]:!text-xl font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400 sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xs-mx:[&_button]:!px-2.5 xs-mx:[&_button]:!font-medium xsm-mx:[&_button]:!text-sm">
                        <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                        <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                        <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                        <Tabs.Tab value="INTERVIEWING">In Progress</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={activeTab}>
                    <div className="mt-16 flex gap-10 flex-wrap">
                        {
                            showList.map((job:any,index:any)=> <Card key={index} {...job} {...{[activeTab.toLowerCase()]:true}}/>)
                        }
                    </div>
                    </Tabs.Panel>
        </Tabs>
    </div>
</div>
}
export default JobHistory;