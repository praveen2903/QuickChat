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
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import {auth, storage ,db} from '../../firebase/firebase'
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
  
export default function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file,setFile]=useState(null)
  const [n,setName]=useState("");
  const [mail,setEmail]=useState("");
  const [pass,setPassword]=useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = n;
    const email = mail;
    const password = pass;

    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (file && allowedTypes.includes(file.type)) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(res.user)
          const date = new Date().getTime();
          const storageRef = ref(storage, `profilephotos/${displayName + date}`);
          await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                
                await setDoc(doc(db, 'users', res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });

                navigate('/verifypage');
                toast(`verification link sent to mail: ${email}`)
              } catch (err) {
                console.log(err);
                setErr(true);
                setLoading(false);
              }
            });
          });

      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    } 
    else {
      alert('Invalid file type. Please select a valid image file (PNG, JPG, JPEG).');
      setLoading(false);
    }
  };
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
                Register
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Name
              </Typography>
              <Input label="Enter your Name" size="lg" onChange={(e)=>setName(e.target.value)} value={n} required />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input label="Enter your Email" size="lg" onChange={(e)=>setEmail(e.target.value)} value={mail} required />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <PasswordInput onChange={(e)=>setPassword(e.target.value)} value={pass}/>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Profile Image
              </Typography>
              <input type="file" accept="image/*" id="profile-photo" onChange={(e) => setFile(e.target.files[0])} className="file-input file-input-bordered file-input-sm w-full max-w-xs bg-white" required/>            
              </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleSubmit} fullWidth>
                Sign Up
              </Button>
              <div className="flex items-center justify-center">
                <p className="mt-5 text-black">Already have an account?{" "}
                  <Link to="/login" className="font-medium text-blue-700">
                    login
                  </Link>
                </p>
              </div>
              <p className="text-blue-800">{loading && "Uploading and compressing the image please wait..."}</p>
              <p className="text-red-600">{err && <span>Email Already exists...</span>}</p>
            </CardFooter>
          </Card>
      </div>

    </div>
  );
}