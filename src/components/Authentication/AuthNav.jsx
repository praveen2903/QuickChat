import { Link } from 'react-router-dom'
import logo from '../../assets/applogo.png'
import { FaHome } from "react-icons/fa";
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import SunIcon from '../shared/SunIcon';
import MoonIcon from '../shared/MoonIcon';

const AuthNav = () => {
    const { theme, handleToggle } = useContext(ThemeContext);
  return (
    <div>
        <div className="navbar bg-base-100">
            <div className="flex-1 mr-4 cursor-pointer py-1.5 font-extrabold text-[#4338ca] font-sans lg:text-[24px]">
                <img src={logo} alt="logo" className="inline-block items-center h-[30px] lg:h-[50px] w-5 lg:w-10 mr-1 lg:mr-3 text-primary-light dark:text-primary-dark" />
                Quick <span className="text-[#312e81]">Talk</span>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                <Link to='/' className='text-[#ea580c] mr-3'><FaHome size={35}/></Link>
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

export default AuthNav