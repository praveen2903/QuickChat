import { Card, CardBody, CardFooter, CardHeader, Typography, Button, Input } from '@material-tailwind/react';
import OTPInput from 'react-otp-input';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import AuthNav from './AuthNav';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Assuming firestore is exported from your firebase config file

const PhoneLogin = () => {
  const [number, setNumber] = useState('');
  const [err, setErr] = useState('');
  const [otp, setOtp] = useState('');
  const [flag, setFlag] = useState(false);
  const [confirmObj, setConfirmObj] = useState('');
  const navigate = useNavigate();

  const setUpRecaptcha = (number) => {
    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptcha.render();
    const confirm = signInWithPhoneNumber(auth, number, recaptcha);
    console.log(confirm);
    return confirm;
  };

  const checkPhoneNumberRegistered = async (phoneNumber) => {
    const docRef = doc(db, 'users', phoneNumber);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  const getOtp = async (e) => {
    e.preventDefault();
    setErr('');

    if (number === '') {
      setErr('Please enter a valid phone number.');
      return;
    }

    try {
      const isRegistered = await checkPhoneNumberRegistered(number);
      if (!isRegistered) {
        toast.error('Please register before logging in.');
        return;
      }
      const response = await setUpRecaptcha(number);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      toast.error('Error setting up reCAPTCHA.');
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
      toast.success('Login successful');
      navigate('/home');
    } catch (err) {
      toast.error('Incorrect OTP.');
    }
  };

  const renderInput = (props) => <Input {...props} />;

  return (
    <div>
      <AuthNav />
      <div className='flex items-center justify-center h-screen'>
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Phone Login
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
                  className="input bg-white text-black input-bordered mt-3"
                  required
                  value={number}
                  onChange={setNumber}
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
                <label className="label">
                  <span className="label-text text-black font-extrabold font-serif mb-3">Enter OTP</span>
                </label>
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
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                <Link to="/phoneregister">Register</Link>
              </Typography>
            </Typography>
            <Typography>
              <div className="text-center text-red-700 p-4 m-2">
                {err && <span>Enter correct OTP</span>}
              </div>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PhoneLogin;