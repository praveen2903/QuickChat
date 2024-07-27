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
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../../firebase/firebase';
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, query, where, getDocs, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [n, setName] = useState("");
  const [mail, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const displayName = n.trim();
    const email = mail.trim();
    const password = pass.trim();

    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    // Reset error states
    setNameErr("");
    setPassErr("");
    setErr(false);

    // Validate name length
    if (displayName.length < 5 || displayName.length >20) {
      setNameErr("Name must be between 5 and 20 characters.");
      setLoading(false);
      return;
    }

    // Check if the display name exists
    const q = query(collection(db, "users"), where("displayName", "==", displayName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setNameErr(prev => prev ? `${prev} & Name is already taken.` : "Name is already taken.");
      setLoading(false);
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,15}$/;
    if (!passwordRegex.test(password)) {
      setPassErr("Password must be 5-15 characters long, contain at least one uppercase letter, one number, and one special character.");
      setLoading(false);
      return;
    }

    if (file && allowedTypes.includes(file.type)) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(res.user);
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
                provider: 'email',
              });

              navigate('/verifypage');
              toast(`Verification link sent to mail: ${email}`);
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
    } else {
      alert('Invalid file type. Please select a valid image file (PNG, JPG, JPEG).');
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthNav />
      <div className="flex items-center justify-center mt-8 md:mt-1">
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
            <Input
              label="Enter your Name"
              placeholder="5-20 characters"
              size="lg"
              onChange={(e) => setName(e.target.value)}
              value={n}
              required
            />
            {nameErr && (
              <div className="text-red-600">
                {nameErr}
              </div>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              label="Enter your Email"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              value={mail}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <PasswordInput onChange={(e) => setPassword(e.target.value)} value={pass} />
            {passErr && (
              <div className="text-red-600">
                {passErr}
              </div>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Profile Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              id="profile-photo"
              onChange={(e) => setFile(e.target.files[0])}
              className="file-input file-input-bordered file-input-sm w-full max-w-xs bg-white"
              required
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth disabled={loading}>
              {loading ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                'Sign Up'
              )}
            </Button>
            <div className="flex items-center justify-center">
              <span className="mt-5 text-black">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-blue-700">
                  Login
                </Link>
              </span>
            </div>
            <div className="text-red-600">
              {err && <span>Email already exists or other error occurred.</span>}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}