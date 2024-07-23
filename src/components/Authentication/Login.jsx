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
import PasswordInput from "../shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import phone from '../../assets/telephone.png'
import google from '../../assets/google.png'
import facebook from '../../assets/facebook.png'
import github from '../../assets/github.png'
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db , googleprovider, githubprovider, facebookprovider } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
 
export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [googlevalue,setGoogleValue]=useState('');
  const [githubvalue,setGithubValue]=useState('');
  const [facebookvalue,setFacebookValue]=useState('');
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  useEffect(()=>{
    setGoogleValue(localStorage.getItem('email'))
    setGithubValue(localStorage.getItem("email"))
    setFacebookValue(localStorage.getItem("email"))
  },[])

  const isEmailAlreadyRegistered = async (email) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('googlevalue', '==', email), where('githubvalue', '==', email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking email registration:", error);
      return false;
    }
  }

  const handleGoogleLogin=async ()=>{
    // console.log(googlevalue)
    const email = googlevalue;
    if (email && await isEmailAlreadyRegistered(email)) {
      alert(`User with email ${email} is already registered with Google.`);
      return;
    }
    signInWithPopup(auth,googleprovider).then(async (data)=>{
      setGoogleValue(data.user.email);
      localStorage.setItem("email",data.user.email);
      await setDoc(doc(db, "users", data.user.uid), {
        uid: data.user.uid,
        googlevalue,
        photoURL:data.user.photoURL,
        displayName:data.user.displayName,
      });

      navigate("/chat")
      toast.success(`Google Login sucessful,welcome ${data.user.displayName}`)
    })
    .catch((err)=>{
      console.error("Google Authentication error:", err);
    })
  }

  const handleGithubLogin=async ()=>{
    const email = githubvalue;
    if (email && await isEmailAlreadyRegistered(email)) {
      alert(`User with email ${email} is already registered with Google.`);
      return;
    }
    signInWithPopup(auth,githubprovider).then(async (data)=>{
      setGithubValue(data.user.email);
      localStorage.setItem("email",data.user.email);

      await setDoc(doc(db, "users", data.user.uid), {
        uid: data.user.uid,
        githubvalue,
        photoURL:data.user.photoURL,
        displayName:data.user.displayName,
      });

      navigate("/chat")
      toast.success(`Github Login sucessful,welcome ${data.user.displayName}`)
    })
    .catch((err)=>{
      console.error("Google Authentication error:", err);
    })
  }
  
  const handleFacebookLogin=()=>{
    signInWithPopup(auth,facebookprovider).then(async (data)=>{
      setFacebookValue(data.user.email);
      // console.log(facebookvalue)
      localStorage.setItem("email",data.user.email);
      await setDoc(doc(db, "users", data.user.uid), {
        uid: data.user.uid,
        facebookvalue,
        photoURL:data.user.photoURL,
        displayName:data.user.displayName,
      });

      navigate("/chat")
      toast.success(`Facebook Login sucessful,welcome ${data.user.displayName}`)
    })
    .catch((err)=>{
      console.error("Google Authentication error:", err);
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = email;
    const userPassword = password;

    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      navigate("/chat");
      toast.success("Login successful, welcome")
    } catch (error) {
      setErr(true);
    }
  };

  const handleResetPassword=()=>{
    navigate("/reset")
  }

  return (
    <div>
      <AuthNav/>
      <div className="flex items-center justify-center">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input label="Enter your Email" size="lg" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <PasswordInput onChange={(e) => setPassword(e.target.value)} value={password} />
              <label className="label mt-2">
                <p onClick={handleResetPassword} className="label-text-alt font-medium text-[14px] link link-hover hover:text-blue-600 text-black">Forgot password?</p>
              </label>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleSubmit} fullWidth>
                Sign In
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="p"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  <Link to="/register">Sign Up</Link>
                </Typography>
              </Typography>
              <Typography>
                <div className="text-center text-red-700 p-4 m-2">
                  {err && <span>Mail id or password is incorrect</span>}
              </div>
              </Typography>
            </CardFooter>
          <div className="-mt-8">
              <p className="text-center text-[18px] mb-3">or continue with</p>
              <div className="flex gap-10 items-center justify-center mb-4">
                <div className="flex gap-10 items-center justify-center mb-4">
                  <Link to="/phonelogin" className="cursor-pointer">
                    <img src={phone} className="rounded h-[32px] w-[32px]" alt="G"/>
                  </Link>
                  
                  <button id={googlevalue} className="cursor-pointer" onClick={handleGoogleLogin}>
                    <img src={google} className="rounded h-[32px] w-[32px]" alt="Google" />
                  </button>

                  <button id={facebookvalue} className="cursor-pointer" onClick={handleFacebookLogin}>
                    <img src={facebook} className="rounded h-[45px] w-[40px]" alt="Facebook" />
                  </button>

                  <button id={githubvalue} className="cursor-pointer" onClick={handleGithubLogin}>
                    <img src={github} className="rounded h-[32px] w-[32px]" alt="GitHub" />
                  </button>
                </div>
              </div>
            </div>
        </Card>
      </div>

    </div>
  );
}