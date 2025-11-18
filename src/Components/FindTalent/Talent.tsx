import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../../services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";



const Talents=()=>{
    const dispatch = useDispatch();
    const [talents, setTalents] = useState<any>([]);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state:any)=> state.sort);
    const [filterTalents, setFilterTalents] = useState<any>([]);
    useEffect(()=>{
        dispatch(resetFilter());
        getAllProfiles().then((res)=>{
            setTalents(res);
        }).catch((error)=>{
            console.log(error);
        })
    },[dispatch])
    useEffect(() => {

        if(sort==="Experience: Low to High"){
            setTalents([...talents].sort((a:any,b:any)=>a.totalExp-b.totalExp));
        }
        else if(sort==="Experience: High to Low"){
            setTalents([...talents].sort((a:any,b:any)=>b.totalExp-a.totalExp));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sort])
    useEffect(() => {
        let filtered = talents;
        if (filter.name) {
            filtered = filtered.filter((talent: any) => talent.name.toLowerCase().includes(filter.name.toLowerCase()));
        }
        if (filter["Job Title"] && filter["Job Title"].length>0) {
            filtered = filtered.filter((talent: any) => filter["Job Title"]?.some((title:any)=> talent?.jobTitle?.toLowerCase().includes(title.toLowerCase())));
        }
        if (filter.Location&&filter.Location.length>0) {
            filtered = filtered.filter((talent: any) => filter["Location"]?.some((location:any)=> talent?.location?.toLowerCase().includes(location.toLowerCase())));
        }
        if (filter.Skills&&filter.Skills.length>0){
            filtered = filtered.filter((talent: any) => filter.Skills?.some((skill:any)=> talent?.skills?.some((talentSkill:any)=>talentSkill.toLowerCase().includes(skill.toLowerCase()))));
        }
        if(filter.exp && filter.exp.length>0){
            filtered = filtered.filter((talent: any) => talent?.experience >= filter.exp[0] && talent?.experience <= filter.exp[1]);
        }
        setFilterTalents(filtered);
    }, [filter, talents]);

    return(
    <div className="p-5">
        <div className="flex justify-between">
            <div className="text-2xl font-bold">Talents</div>
            <Sort/>
        </div>
        <div className="mt-16 flex gap-8 flex-wrap justify-around">
            {
                filterTalents.length?filterTalents.map((talent:any, index:any) => <TalentCard key={index} {...talent}/>):
                <div className="text-2xl font-bold text-center">No Talents Found</div>
            }
        </div>
    </div>
    )
}
export default Talents;