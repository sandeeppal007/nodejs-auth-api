import FloatingShape from "./components/FloatingShape"
import EmailVerification from "./pages/EmailVerification"

import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import {Navigate, replace, Route,Routes} from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import Dashborad from "./pages/Dashborad"
import LoadingSpinner from "./components/LoadingSpinner"


// redirect 


const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};




function App() {
const {error,isCheckingAuth,checkAuth,isAuthenticated,user} = useAuthStore();
 

useEffect(()=>{
checkAuth();
},[checkAuth])

if(isCheckingAuth) return <LoadingSpinner/>

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br 
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
     <FloatingShape 
     color="bg-green-500"
     size="w-64 h-64"
     top="-5%"
     left="10%"
     delay={0}

     />
     <FloatingShape 
     color="bg-green-500"
     size="w-64 h-64"
     top="70%"
     left="80%"
     delay={5}

     />
     <FloatingShape 
     color="bg-green-500"
     size="w-64 h-64"
     top="40%"
     left="-10%"
     delay={2}

     />

     <Routes>
      <Route path="/" element={
        <ProtectedRoute>
  <Dashborad/>
        </ProtectedRoute>
        
      }/>
      <Route path="/signup" element={
        <RedirectAuthenticatedUser>
          <SignUpPage/>
        </RedirectAuthenticatedUser>
      }
          
          />
    
      <Route path="/verify-email" element={

        
        <EmailVerification/>
        
        }/>

      <Route path="/login" element={
        <RedirectAuthenticatedUser>
          <LoginPage/>
        </RedirectAuthenticatedUser>
      }/>
     </Routes>
     <Toaster/>



    </div>
    </>
  )
}

export default App
