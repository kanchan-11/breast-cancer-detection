import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUserAction } from './auth.action';

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logout = () => {
    // Clear any authentication tokens or user data
    localStorage.removeItem('jwt'); // example of removing a token
    dispatch(logoutUserAction()); 
    console.log(localStorage);
    // Redirect to a login or home page after logout
    navigate('/'); // or your desired route
  };

  return logout;
};

export default useLogout;
