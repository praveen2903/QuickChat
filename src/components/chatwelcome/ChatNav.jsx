import { Link } from 'react-router-dom';
import logo from '../../assets/applogo.png';
import { ThemeContext } from '../../context/ThemeContext';
import SunIcon from '../shared/SunIcon';
import MoonIcon from '../shared/MoonIcon';
import { useContext, useEffect, useState } from 'react';
import photo from '../../assets/photo.png';
import { AuthContext } from '../../context/AuthenticationContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { FaGoogle, FaFacebook, FaGithub, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

export default function ChatNav() {
    const { theme, handleToggle } = useContext(ThemeContext);
    const { currentUser } = useContext(AuthContext);
    const [provider, setProvider] = useState("");

    useEffect(() => {
        if (currentUser && currentUser.uid) {
            const userDoc = doc(db, 'users', currentUser.uid);
            const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setProvider(docSnapshot.data().provider || "");
                } else {
                    console.log('No such document!');
                }
            }, (error) => {
                console.error('Error fetching document:', error);
            });

            // Clean up the subscription on component unmount
            return () => unsubscribe();
        }
    }, [currentUser]);

    const getProviderIcon = () => {
        switch (provider) {
            case "google":
                return <FaGoogle size={25} />;
            case "facebook":
                return <FaFacebook size={25} />;
            case "github":
                return <FaGithub size={25} />;
            case "phone":
                return <FaPhoneAlt size={25} />;
            case "email":
                return <MdOutlineMail size={25} />;
            default:
                return "User";
        }
    };

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1 mr-4 cursor-pointer py-1.5 font-extrabold text-[#4338ca] font-sans lg:text-[24px]">
                    <img src={logo} alt="logo" className="inline-block items-center h-[30px] lg:h-[50px] w-5 lg:w-10 mr-1 lg:mr-3 text-primary-light dark:text-primary-dark" />
                    Quick <span className="text-[#312e81]">Talk</span>
                </div>
                <div className="flex-none gap-3">
                    <button className='bg-[#f97316] hover:bg-[#ea580c] p-2 rounded-full'>
                        <Link to="/" className='text-white text-xl' onClick={() => signOut(auth)}>Logout</Link>
                    </button>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="rounded-full w-24">
                                <img src={currentUser?.photoURL || photo} alt='userphoto' className={`${location.pathname === "/profile" ? 'glow-image' : ' '} w-full`} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-2 gap-3 z-[1] p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60">
                            <li>
                                <p className="justify-between">
                                    {currentUser?.displayName || "User"}
                                    <span className="badge">{getProviderIcon()}</span>
                                </p>
                            </li>
                            <li><p>{currentUser?.email || currentUser?.phoneNumber}</p></li>
                            <li><p>Account Settings</p></li>
                        </ul>
                    </div>
                    <div className="form-control ml-2 md:ml-0">
                        <label className="swap swap-rotate">
                            <input type="checkbox" onChange={handleToggle} checked={theme === "light" ? false : true} />
                            <SunIcon />
                            <MoonIcon />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}