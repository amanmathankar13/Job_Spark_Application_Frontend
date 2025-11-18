import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import ApplyJobPage from "./ApplyJobPage"
import CompanyPage from "./CompanyPage"
import FindJobs from "./FindJobs"
import FindTalentPage from "./FindTalentPage"
import HomePage from "./HomePage"
import JobDescPage from "./JobDescPage"
import JobHistoryPage from "./JobHistoryPage"
import PostedJobPage from "./PostedJobPage"
import PostJobPage from "./PostJobPage"
import ProfilePage from "./ProfilePage"
import SignUpPage from "./SignUpPage"
import TalentProfilePage from "./TalentProfilePage"
import { useSelector } from "react-redux"
import ProtectedRoute from "../services/ProtectedRoute"
import PublicRoute from "../services/PublicRoute"
import { LoadingOverlay } from "@mantine/core"
import Unauthorized from "./UnauthroizedPage"
import NotFoundPage from "./NotFoundPage"

const AppRoute=()=>{
    const overlay = useSelector((state:any)=>state.overlay);
    const user = useSelector((state:any)=>state.user);
    return <BrowserRouter>
      <div className='relative overflow-hidden'>
        {overlay && <div className='fixed !z-[2000] w-full h-full flex  items-center justify-center'>
        <LoadingOverlay
          visible={overlay}
          zIndex={2000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        />
      </div>}
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path="/find-jobs" element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><FindJobs /></ProtectedRoute>} />
        <Route path="/find-talent" element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><FindTalentPage /></ProtectedRoute>}  />
        <Route path="/post-job/:id" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage/></ProtectedRoute>} />
        <Route path="/talent-profile/:id" element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><TalentProfilePage /></ProtectedRoute>} />
        <Route path="/jobs/:id" element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><JobDescPage /></ProtectedRoute>}  />
        <Route path="/company/:name" element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><CompanyPage /></ProtectedRoute>}  />
        <Route path="/apply-job/:id" element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><ApplyJobPage /></ProtectedRoute>}  />
        <Route path="/posted-job/:id" element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><PostedJobPage /></ProtectedRoute>} />
        <Route path="/job-history" element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><JobHistoryPage/></ProtectedRoute>} />
        <Route path="/sign-up" element={<PublicRoute><SignUpPage /></PublicRoute>}  />
        <Route path="/login" element={<PublicRoute><SignUpPage /></PublicRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN', 'EMPLOYER']}><ProfilePage /></ProtectedRoute>}  />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <Footer/>
      </div>
     </BrowserRouter>
}

export default AppRoute;