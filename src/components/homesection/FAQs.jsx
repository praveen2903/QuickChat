
import questions from '../../data/questions'
import Question from './Question'

const FAQSection = () => {
   return (
      <section className='relative flex flex-col items-center mt-4'>
         <div className='px-4'>
            <div data-aos='fade-right' className='text-center'>
               <h3 className="text-4xl font-bold mb-4">Frequently <span className="text-primary">asked questions</span></h3>
               <p className='text-center mx-auto max-w-2xl mb-8'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit reiciendis architecto recusandae officia veritatis impedit amet praesentium at consequuntur vero,
               </p>
            </div>  
            <div className="pt-8 flex flex-col items-center">
               {
                  questions.map(q => (
                     <Question key={q.id} {...q} />
                  ))
               }
            </div>
         </div>
      </section>
   )
}

export default FAQSection