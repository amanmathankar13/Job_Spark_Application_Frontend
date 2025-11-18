import { ActionIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const CompanyCard=(props:any)=>{
    return <div><div className="flex justify-between bg-mine-shaft-900 items-center rounded-lg p-2">
    <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-700 rounded-md">
            <img className="h-7" src={`/Icons/${props.name}.png`} alt="" />
        </div>
        <div>
            <div className="font-semibold">{props.name}</div>
            <div className="text-sm text-mine-shaft-300">{props.employees} Employees </div>
        </div>
    </div>

    <Link to={"/company"}>
    <ActionIcon color="bright-sun.4" variant="subtle" aria-label="Settings">
        <IconExternalLink/>
    </ActionIcon>
    </Link>

    </div>
    </div> 
}
export default CompanyCard;