import {motion} from 'framer-motion'
import {fadeIn} from '../../Variants'
import img1 from '../../assets/heroimage1.png'
import img2 from '../../assets/heroimage2.png'
import { MdOutlineArrowForward } from "react-icons/md";
import { Link } from 'react-router-dom';

const OverView = () => {
  return (
    <div>
        <div className='md:px-14 p-4 max-w-s mx-auto space-y-3'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-8' id='about'>
                <motion.div variants={fadeIn("up",0.2)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.7}} className='md:w-1/2'>
                    <img src={img2} alt='about' className='rounded-2xl h-[400px] w-full'/>
                </motion.div>
                <motion.div variants={fadeIn("right",0.3)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.7}} className='md:w-2/3'>
                    <h2 className='md:text-5xl text-3xl font-bold text-primary mb-5 leading-normal'>Welcome to Quick Talk 
                    </h2>
                    <p className='text-third text-lg mb-7'>Experience seamless communication with ChatApp, the ultimate messaging platform designed to keep you connected with your friends and colleagues. If already a user please Login.</p>
                    <Link to="/login"><button className='py-3 px-8 bg-secondary font-semibold text-white rounded-2xl hover:bg-[#9333ea] transition-all duration-300 flex gap-2'>LOGIN<MdOutlineArrowForward size={20} /></button>
                    </Link>
                </motion.div>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
                <motion.div variants={fadeIn("right",0.4)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.3}} className='md:w-1/2'>
                    <img src={img1} alt='about' className='rounded-2xl h-[500px] w-full'/>
                </motion.div>
                <motion.div variants={fadeIn("left",0.3)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.5}} className='md:w-2/3'>
                    <h2 className='md:text-4xl text-3xl font-bold text-primary mb-5 leading-normal'>Real-time messaging with end-to-end encryption  
                    </h2>
                    <p className='text-third text-lg mb-7'>Share files and store them easily with integrated cloud storage. ChatApp is available across multiple platforms, including mobile, tablet, and desktop, ensuring you can stay connected wherever you are. New to Quick Talk please Register.</p>
                    <Link to="/register"><button to="/register" className='flex gap-2 py-3 px-8 bg-secondary font-semibold text-white rounded-2xl hover:bg-[#9333ea] transition-all duration-300'>REGISTER<MdOutlineArrowForward size={20} /></button></Link>             
                    </motion.div>
            </div>
            
        </div>
    </div>
  )
}

export default OverView