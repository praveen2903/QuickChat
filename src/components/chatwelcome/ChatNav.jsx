import { Link } from 'react-router-dom'
import logo from '../../assets/applogo.png'
import { ThemeContext } from '../../context/ThemeContext';
import SunIcon from '../shared/SunIcon';
import MoonIcon from '../shared/MoonIcon';
import { useContext } from 'react';
import photo from '../../assets/photo.png'
import { AuthContext } from '../../context/AuthenticationContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export default function ChatNav () {
    const { theme, handleToggle } = useContext(ThemeContext);
    const {currentUser} = useContext(AuthContext)
  return (
    <div>
        <div className="navbar bg-base-100">
            <div className="flex-1 mr-4 cursor-pointer py-1.5 font-extrabold text-[#4338ca] font-sans lg:text-[24px]">
                <img src={logo} alt="logo" className="inline-block items-center h-[30px] lg:h-[50px] w-5 lg:w-10 mr-1 lg:mr-3 text-primary-light dark:text-primary-dark" />
                Quick <span className="text-[#312e81]">Talk</span>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img src={currentUser?.photoURL || photo} alt='userphoto' className={`${location.pathname==="/profile"? 'glow-image':' '}`} />
                </div>
                </label>
                <ul tabIndex={0} className="mt-2 gap-3 z-[1] p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60">
                <li>
                    <p className="justify-between">
                    {currentUser?.displayName || "User"}
                    <span className="badge">User</span>
                    </p>
                </li>
                <li><p>{currentUser?.email||currentUser?.phoneNumber}</p></li>
                <li><Link to="/" onClick={()=>signOut(auth)}>Logout</Link></li>
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
  )
}