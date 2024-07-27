import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { toast } from 'react-toastify'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import AuthNav from "./AuthNav";
import { useState } from 'react';

function ResetPassword() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const emailvalue=email;
    sendPasswordResetEmail(auth,emailvalue).then(()=>{
      toast.success(`check your email :- ${emailvalue}`)
      navigate('/')
    }).catch(err=>{
      alert(err.code)
    })

  }

  return (
    <div>
      <AuthNav/>
      <div className="flex items-center justify-center mt-8 md:mt-1">
        <form>
          <Card className="w-96">
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Reset Password
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">  
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input label="Enter your Email" size="lg" onChange={(e)=>setEmail(e.target.value)} value={email} required />
            </CardBody>
            <CardFooter className="pt-0">
              <Button onClick={handleSubmit} variant="gradient" fullWidth>
                Reset
              </Button>
              <div className="flex items-center justify-center">
                <p className="mt-5 text-black">Remembered ?{" "}
                  <Link to="/login" className="font-medium text-blue-700">
                    login
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>

    </div>
  )
}

export default ResetPassword