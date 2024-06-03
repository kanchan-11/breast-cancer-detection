import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from '../../redux/user/user.action'
import UserCard from './UserCard'
const Users = () => {
    const dispatch = useDispatch()

    const { users,auth } = useSelector(store => store)
  const jwt = localStorage.getItem("jwt")
  useEffect(() => {
    
    dispatch(getAllUsersAction(jwt))
  }, [])
  console.log("users store",users);

  const filteredUsers = users.users.filter(user => user.id !== auth.user.id);


  return (
    <div className="px-20 py-20">
      <h1 className="text-3xl font-bold text-center mb-4">Other Users in the Breast Cancer Detection System</h1>
      <div className="'mt-5 space-y-5'">
        {filteredUsers.map(user => (
          <div key={user.id} >
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users