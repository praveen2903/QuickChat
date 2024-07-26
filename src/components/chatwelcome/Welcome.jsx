import ChatNav from "./ChatNav"
import img from '../../assets/welcome.png'
import MakeFriends from "./MakeFriends"

const Welcome = () => {
  return (
    <div>
      <ChatNav/>
      <div className="flex h-screen">
        <div className="w-full md:w-1/2">
        <MakeFriends/>
        </div>
          <div className="w-1/2 flex-col justify-center items-center h-80 hidden md:block">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            ></div>
            <p className="mt-4 text-center">Your text goes here</p>
          </div>
        </div>


      </div>
  )
}

export default Welcome