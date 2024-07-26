import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthenticationContext';
import { useContext } from 'react';

const MakeFriends = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <div className='m-5'>
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <div>
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  <div className='flex'>
                    <img src={user.photoURL} alt={user.displayName} width={60} height={30} className='rounded-full' />
                    <span className='text-xl m-6'>Name: {user.displayName}</span>
                    <p>Email: {user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeFriends;
