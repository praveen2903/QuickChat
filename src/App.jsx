import Homepage from "./pages/Homepage";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./context/AuthenticationContext";
import Welcome from "./components/chatwelcome/Welcome";
import ResetPassword from "./components/Authentication/ResetPassword";
import PhoneLogin from "./components/Authentication/PhoneLogin";
import PhoneRegister from "./components/Authentication/PhoneRegister";
import VerifyingEmail from "./components/Authentication/VerifyingEmail";
 

export default function Example() {
  const { currentUser } = useContext(AuthContext);

  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children
  };
  return (
    <div>
      <AnimatePresence>
        <div>
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path="/reset" element={<ResetPassword/>}/>
            <Route path="/verifypage" element={<VerifyingEmail/>}/>
            <Route path="/phoneregister" element={<PhoneRegister/>}/>
            <Route path="/phonelogin" element={<PhoneLogin/>}/>
            <Route path="/chat" element={<ProtectedRoute><Welcome/></ProtectedRoute>}/>
          </Routes>
          <ToastContainer position="top-right" bodyClassName="text-center font-bold text-blue-900"/>
        </div>
      </AnimatePresence>
    </div>
  )
}