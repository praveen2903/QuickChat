import {motion} from 'framer-motion'
import {fadeIn} from '../../Variants'
import img from '../../assets/heroimage3.png'

const Steps = () => {
  return (
    <div id="process" className='md:px-14 p-4 max-w-s mx-auto space-y-3'>
        <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-8' id='about'>
                <motion.div variants={fadeIn("up",0.2)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.7}} className='md:w-1/2'>
                    <img src={img} alt='about' className='rounded-2xl h-[400px] w-full'/>
                </motion.div>
                <motion.div variants={fadeIn("right",0.3)} initial="hidden" whileInView={"show"} viewport={{once:false,amount:0.7}} className='md:w-2/3'>
                    <h2 className='md:text-5xl text-3xl font-bold text-primary mb-5 leading-normal'>How to use Quick Talk 
                    </h2>
                    <ol>
                      <li>If new user please Sign in and create account.</li>
                      <li>If already a user check or send messages among friends or collegues.</li>
                    </ol>
                </motion.div>
            </div>
    </div>
  )
}

export default Steps