import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import img from '../../assets/email.png';
import { Typewriter } from 'react-simple-typewriter';
import { auth } from '../../firebase/firebase';
import { MdOutlineArrowBack } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser } from 'firebase/auth';
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
import AuthNav from './AuthNav'

const VerifyingEmail = () => {
  const navigate=useNavigate()
  const [emailVerified, setEmailVerified] = useState(false);

  const checkEmailVerification = () => {
    const user = auth.currentUser;
    if (user && user.emailVerified) {
      setEmailVerified(true);
    }
  };
  const handleVerify = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  useEffect(() => {
    const verificationInterval = setInterval(checkEmailVerification, 1000);
    return () => {
      clearInterval(verificationInterval);
    };
  }, [navigate]);

  useEffect(() => {
    if (emailVerified) {
      toast.success(`Welcome to image gallery ${auth.currentUser.displayName}`)
      navigate('/chat')
    }
  }, [emailVerified,navigate]);

  const DeleteAccount=()=>{
    const user=auth.currentUser;
    deleteUser(user);
  }
  return (
    <div>
        <AuthNav/>
       <Card className="mt-6 w-[400px] p-4">
        <Link to="/register" className="text-3xl float-left my-4 text-black flex gap-3">
            <button onClick={DeleteAccount} className='flex hover:text-blue-800'>
              <MdOutlineArrowBack size={20} />
              <span className="text-sm">Cancel</span>
            </button>
          </Link>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2 flex gap-5">
            <img src={img} alt='/'/>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mb-4 h-12 w-12 text-gray-900"
            >
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              />
              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
            </svg>
          </Typography>
          <div className='mt-5 p-4'>
              <div className='text-black'>
                <div className="text-darkblue inline">{"Email Verification pending "}</div>
                <div className='inline'>
                  <Typewriter words={['.','..','...','....','.....']} loop={true} typeSpeed={120} deleteSpeed={100} delaySpeed={1000}/> 
                </div>
              </div>
          </div>
        </CardBody>
        <CardFooter>
          <button onClick={handleVerify} className='p-4 rounded-full font-bold text-white bg-blue-800 hover:bg-blue-500'>Verify</button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VerifyingEmail
