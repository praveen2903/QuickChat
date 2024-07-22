import {FaFacebookSquare,FaGithubSquare,FaInstagram,FaTwitterSquare,} from 'react-icons/fa';
import logo from '../../assets/applogo.png'

export default function Footer() {
    return (
        <footer className="footer bg-neutral text-neutral-content p-10">
            <aside>
                <img src={logo} alt='chat app' className='h-[100px] w-[100px]'/>
                <p>
                Quick Chat app
                <br />
                Application to connect with people.
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a href=''><FaFacebookSquare size={25}/></a>
                    <a href=''><FaGithubSquare size={25}/></a>
                    <a href=''><FaInstagram size={25}/></a>
                    <a href=''><FaTwitterSquare size={25}/></a>
                </div>
                <form className='mt-2'>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="form-control w-80">
                    <label className="label">
                        <span>Enter your email address</span>
                    </label>
                    <div className="join">
                        <input
                            type="text"
                            placeholder="username@site.com"
                            className="input input-bordered join-item text-black" />
                        <button className="btn btn-primary join-item">Subscribe</button>
                    </div>
                    </fieldset>
                </form>
            </nav>
            </footer>
      );
}
