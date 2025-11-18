import axiosInstance from "../Interceptor/AxiosInterceptor";

const registerUser= async(user:any)=>{
    return axiosInstance.post(`/users/register`, user).then((res:any)=>res.data).catch((error:any)=>{
        throw error;
    });
}

const loginUser= async(login:any)=>{
    return axiosInstance.post(`/users/login`, login)
    .then((res:any)=> res.data)
    .catch((error:any)=> {
        throw error;
    });
}

const sendOtp= async(email:any)=>{
    return axiosInstance.post(`/users/send-otp/${email}`)
    .then((res:any)=> res.data)
    .catch((error:any)=>{
        throw error;
    });
}

const veriftOtp = async (email:any, otp:any)=>{
    return axiosInstance.get(`/users/verify-otp/${email}/${otp}`)
    .then((res:any)=>res.data)
    .catch((error:any)=>{
        throw error;
    })
}

const changePassword = async(email:string, password:string)=>{
    return axiosInstance.post(`/users/changePassword`,{email, password})
    .then((res:any)=>res.data)
    .catch((error:any)=>{
        throw error;
    })
}

export {registerUser,loginUser,sendOtp,veriftOtp,changePassword};