import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../firebase/firebase';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import AuthNav from './AuthNav';
import { Card, CardBody, Input, CardFooter, CardHeader, Typography, Button } from '@material-tailwind/react';
import OTPInput from 'react-otp-input';

const PhoneRegister = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const [otp, setOtp] = useState('');
  const [flag, setFlag] = useState(false);
  const [confirmObj, setConfirmObj] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const isNumberAlreadyRegistered = async (number) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('phoneNumber', '==', number));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking phone number registration:", error);
      return false;
    }
  };

  const isNameAlreadyRegistered = async (name) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('displayName', '==', name));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking display name registration:", error);
      return false;
    }
  };

  const setUpRecaptcha = (number) => {
    try {
      const recaptcha = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log("reCAPTCHA solved:", response);
        },
        'expired-callback': () => {
          console.warn("reCAPTCHA expired");
        }
      }, auth);
      recaptcha.render();
      const confirm = signInWithPhoneNumber(auth, number, recaptcha);
      console.log(confirm);
      return confirm;
    } catch (error) {
      console.error("Error setting up reCAPTCHA:", error);
      toast.error("Error setting up reCAPTCHA. Please try again later.");
      throw error;
    }
  };

  const getOtp = async (e) => {
    e.preventDefault();
    setErr('');

    if (number === '' || name === '') {
      setErr('Please enter a valid phone number and display name.');
      return;
    }

    if (name.length < 5 || name.length > 15) {
      setErr('Display name must be between 5 and 15 characters.');
      return;
    }

    if (await isNumberAlreadyRegistered(number)) {
      setErr('Phone number already registered. Please login.');
      return;
    }

    if (await isNameAlreadyRegistered(name)) {
      setErr('Display name already taken. Please choose another.');
      return;
    }

    try {
      const response = await setUpRecaptcha(number);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      toast.error("Failure in setting reCAPTCHA.");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === '' || otp === null) {
      return;
    }
    setErr('');
    try {
      await confirmObj.confirm(otp);

      let photoURL = '';
      if (profilePhoto) {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/avif'];
        if (!allowedTypes.includes(profilePhoto.type)) {
          setErr('Please upload an image file (png, jpg, jpeg, avif).');
          return;
        }

        const photoRef = ref(storage, `profilePhotos/${auth.currentUser.uid}`);
        await uploadBytes(photoRef, profilePhoto);
        photoURL = await getDownloadURL(photoRef);
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        uid: auth.currentUser.uid,
        phoneNumber: number,
        displayName: name,
        photoURL: photoURL,
        provider: "phone",
      });

      toast.success(`Registration successful, welcome ${name}`);
      navigate('/chat');
    } catch (err) {
      toast.error("Incorrect OTP!!!");
    }
  };

  const renderInput = (props) => <Input {...props} />;

  return (
    <div>
      <AuthNav />
      <div className='flex items-center justify-center h-screen mt-8 md:mt-1'>
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Phone Register
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={getOtp} style={{ display: !flag ? 'block' : 'none' }}>
              <div className="form-control">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Phone Number
                </Typography>
                <PhoneInput
                  defaultCountry="IN"
                  placeholder="Enter phone number"
                  className="input bg-white text-black border-black mt-3"
                  required
                  value={number}
                  onChange={setNumber}
                />
              </div>
              <div className="form-control">
                <Typography variant="h6" color="blue-gray">
                  Name
                </Typography>
                <Input
                  type="text"
                  label='Enter display name'
                  placeholder="Name"
                  className="input bg-white text-black input-bordered"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <Typography variant="h6" color="blue-gray">
                  Profile Photo
                </Typography>
                <Input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/avif"
                  className="input bg-white text-black input-bordered mt-3"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
              </div>
              <div id="recaptcha-container" />
              <div className="form-control mt-8">
                <Button variant="gradient" type="submit" className="rounded-3xl bg-blue-500 hover-bg-blue-700 text-white uppercase font-bold">
                  Send OTP
                </Button>
              </div>
            </form>
            <form onSubmit={verifyOtp} style={{ display: flag ? 'block' : 'none' }}>
              <div>
                {err && <span className="text-red-700">{err}</span>}
              </div>
              <div className="form-control">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Enter OTP
                </Typography>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  separator={<span style={{ width: "8px" }}></span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  renderInput={renderInput}
                  inputStyle={{
                    border: "1px solid transparent",
                    borderRadius: "8px",
                    width: "54px",
                    height: "54px",
                    fontSize: "16px",
                    color: "#000",
                    fontWeight: "400",
                    caretColor: "blue"
                  }}
                  focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none"
                  }}
                />
              </div>
              <div className="form-control mt-8">
                <Button variant="gradient" type="submit" className="rounded-3xl bg-blue-500 hover-bg-blue-700 text-white uppercase font-bold">
                  Verify OTP
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography variant="small" className="flex justify-center gap-1">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:text-blue-700 font-bold">Login</Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PhoneRegister;