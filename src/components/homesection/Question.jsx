import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

// eslint-disable-next-line react/prop-types
const Question = ({ title, description }) => {
   const [toggle, setToggle] = useState(false)

   const toggleQuestion = () => {
      setToggle(!toggle)
   }

   return (
      <div className="mt-2 my-4 p-5 rounded-xl transition-all shadow-lg w-full max-w-xl">
         <div>
            <div className="flex items-center justify-between transition-all">
               <h4 className="text-[#0284c7] text-lg">{title}</h4>
               <button onClick={toggleQuestion} className="bg-transparent outline-none border-none cursor-pointer">
                  <FontAwesomeIcon icon={toggle ? faMinus : faPlus} className="text-xl" />
               </button>
            </div>
            {toggle && <p className="mt-4 text-lg">{description}</p>}
         </div>
      </div>
   )
}

export default Question
