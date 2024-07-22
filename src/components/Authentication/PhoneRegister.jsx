import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack } from 'react-icons/md';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import AuthNav from './AuthNav';

const PhoneRegister = () => {
  const [number, setNumber] = useState('');
  const [name, setDisplayName] = useState('');
  const [err, setErr] = useState('');
  const [otp, setOtp] = useState('');
  const [flag, setFlag] = useState(false);
  const [confirmObj, setConfirmObj] = useState('');
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

  const setUpRecaptcha = (number) => {
    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptcha.render();
    return signInWithPhoneNumber(auth, number, recaptcha);
  };

  const getOtp = async (e) => {
    e.preventDefault();
    setErr('');

    if (number === '' || name === '') {
      setErr('Please enter a valid phone number and display name.');
      return;
    }

    if (await isNumberAlreadyRegistered(number)) {
      setErr('Phone number already registered. Please login.');
      return;
    }

    try {
      const response = await setUpRecaptcha(number);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setErr('Error setting up reCAPTCHA.');
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
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        uid: auth.currentUser.uid,
        phoneNumber: number,
        displayName: name,
      });
      toast.success(`Registration successful, welcome ${name}`);
      navigate('/home');
    } catch (err) {
      setErr('Incorrect OTP.');
    }
  };

  return (
    <div>
      <AuthNav />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white bg-opacity-75">
          <Link to="/" className="text-3xl float-left my-4 text-black flex gap-3">
            <MdOutlineArrowBack size={20} />
            <span className="text-sm">Cancel</span>
          </Link>
          <form onSubmit={getOtp} className="card-body" style={{ display: !flag ? 'block' : 'none' }}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-extrabold font-serif">Phone number</span>
              </label>
              <PhoneInput
                defaultCountry="IN"
                placeholder="Enter phone number"
                className="input bg-white text-black input-bordered bg-opacity-75"
                required
                value={number}
                onChange={setNumber}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-extrabold font-serif">Display Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter display name"
                className="input bg-white text-black input-bordered bg-opacity-75"
                required
                value={name}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div id="recaptcha-container" />
            <div className="form-control mt-8">
              <button className="btn btn-primary rounded-3xl bg-blue-500 hover-bg-blue-700 text-white uppercase font-bold">
                Send OTP
              </button>
            </div>
          </form>
          <form onSubmit={verifyOtp} className="card-body" style={{ display: flag ? 'block' : 'none' }}>
            <div>
              {err && <span className="text-red-700">{err}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-extrabold font-serif">Enter OTP</span>
              </label>
              <input type="number" placeholder="Enter OTP....." onChange={(e) => setOtp(e.target.value)} />
            </div>
            <div className="form-control mt-8">
              <button className="btn btn-primary rounded-3xl bg-blue-500 hover-bg-blue-700 text-white uppercase font-bold">
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneRegister;
