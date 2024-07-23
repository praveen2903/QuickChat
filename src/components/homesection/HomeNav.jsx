import { useState, useEffect, useContext } from 'react';
import { Navbar, Typography, IconButton, Button, Collapse } from "@material-tailwind/react";
import logo from "../../assets/applogo.png";
import { Link } from "react-scroll";
import { Link as RouteLink } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import SunIcon from '../shared/SunIcon';
import MoonIcon from '../shared/MoonIcon';

export function HomeNav() {
  const { theme, handleToggle } = useContext(ThemeContext);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    return () => window.removeEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          to="overview"
          className="flex items-center cursor-pointer"
        >
          Overview
        </Link>
      </Typography>
      <Typography
        as="li"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          to="process"
          className="flex items-center text-[16px] cursor-pointer"
        >
          Process
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          to="pricing"
          className="flex items-center cursor-pointer"
        >
          Pricing
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          to="contact"
          className="flex items-center cursor-pointer"
        >
          Contact
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-3 py-2 lg:px-10 lg:py-2 bg-gradient-to-r from-[#38bdf8] to-[#3b82f6]">
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          as="p"
          className="mr-4 cursor-pointer py-1.5 font-extrabold text-[#4338ca] font-sans lg:text-[24px]"
        >
          <img src={logo} alt="logo" className="inline-block items-center h-[30px] lg:h-[50px] w-5 lg:w-10 mr-1 lg:mr-3 text-primary-light" />
          Quick <span className="text-[#312e81]">Talk</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <RouteLink to="/login" variant="text" size="sm" className="hidden lg:inline-block mr-2 font-sans gap-5">
            <span className="text-[20px]">Login</span>
          </RouteLink>
          <RouteLink to="/register" variant="gradient" size="sm" className="hidden lg:inline-block bg-black text-white p-2 rounded-full">
            <span className="text-[20px]">Sign in</span>
          </RouteLink>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
        <div className="form-control ml-2 md:ml-0">
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleToggle} checked={theme === "light" ? false : true} />
              <SunIcon />
              <MoonIcon />
          </label>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto px-4">
          {navList}
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            <RouteLink to="/login" fullWidth variant="text" size="sm">
                <span className='text-white'>Log In</span>
              </RouteLink>
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            <RouteLink to="/register" fullWidth variant="gradient" size="sm">
                <span>Sign up</span>
            </RouteLink>
          </Button>
        </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
