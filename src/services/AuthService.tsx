import axios from "axios"

const base_url="https://job-spark-application-backend.onrender.com/auth/"
const loginUser= async(login:any)=>{
    return axios.post(`${base_url}login`, login)
    .then((res:any)=>res.data)
    .catch((error:any)=>{
        throw error;
    });
}
// const navigateToLogin=(navigate:any)=>{
//     localStorage.removeItem('token')
//     removeUser();
//     navigate('/login');
// }

export {loginUser};