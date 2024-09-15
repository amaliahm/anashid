import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/auth/authSlice';
import { useEffect } from 'react';

const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      const admin = JSON.parse(storedAdmin);
      dispatch(loginSuccess(admin)); 
    }
  }, [dispatch]);
};

export default useAuthInit;
