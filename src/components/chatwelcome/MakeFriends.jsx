import { useEffect, useState, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthenticationContext';
import { FaGoogle, FaFacebook, FaGithub, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import EnlargePic from '../shared/EnlargedPic';

const providerIcons = {
  google: <FaGoogle size={25} />,
  facebook: <FaFacebook size={25} />,
  github: <FaGithub size={25} />,
  phone: <FaPhoneAlt size={25} />,
  email: <MdOutlineMail size={25} />
};

const MakeFriends = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!currentUser || !currentUser.uid) return;
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '!=', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const getProviderIcon = (provider) => {
    return providerIcons[provider] || "User";
  };

  const filteredUsers = users.filter(user =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [enlarged, setEnlarged] = useState(false);
  function toggleEnlargedView() {
    setEnlarged(!enlarged);
  }

  return (
    <div className='m-5'>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <div className='flex items-center justify-center'>
          <span className="loading loading-dots loading-lg"></span>        
        </div>
      ) : (
        <div className=''>
          <ul>
            {filteredUsers.map(user => (
              <li key={user.id} className="mb-4">
                <div className='flex items-center outline-1 p-4 rounded'>
                  <div onClick={toggleEnlargedView}>
                    <img src={user.photoURL} alt={user.displayName} width={60} height={60} className='rounded-full mr-4' />
                  </div>
                  <div className='flex-1 flex items-center'>
                    <div className='text-xl font-semibold mr-4'>{user.displayName}</div>
                    <div className='relative group'>
                      {getProviderIcon(user.provider)}
                      <div className="absolute left-8 top-0 hidden bg-gray-800 text-white text-sm p-2 rounded group-hover:block">
                        {user.email || user.phone || user.googlevalue || user.githubvalue || user.facebookvalue}
                      </div>
                    </div>
                  </div>
                  <button
                    className='bg-gray-200 px-4 py-2 rounded ml-auto'
                  >
                    Message
                  </button>
                </div>
                {enlarged && <EnlargePic url={user.photoURL} onClose={toggleEnlargedView} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MakeFriends;
