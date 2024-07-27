import ChatNav from "./ChatNav"
import img from '../../assets/welcome.png'
import MakeFriends from "./MakeFriends"
import chat from '../../assets/chat.png'

const Welcome = () => {
  return (
    <div>
      <ChatNav/>
      <div className="flex h-screen">
        <div className="w-full md:w-1/3">
        <MakeFriends/>
        </div>
          <div className="w-2/3 flex-col justify-center items-center h-72 -mt-8 hidden md:block">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            ></div>
            <div className="flex items-center justify-end w-full">
              <span className="m-7 text-xl font-serif text-justify">Discover a new way to stay connected with your friends and family. Whether you&apos;re catching up with old friends or making new ones, our real-time messaging and easy-to-use interface ensure you never miss a moment. Share your life, send instant messages, and create unforgettable memories with ChatApp.</span>
              <img src={chat} alt="no image" className="h-[300px] w-[300px]"/>
            </div>
          </div>
        </div>


      </div>
  )
}

export default Welcome