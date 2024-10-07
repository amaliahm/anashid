import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//REDUX
import { loginSuccess } from '../../slices/authSlice.js';

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
