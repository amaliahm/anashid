import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//REDUX
import { setUser } from '../../slices/authSlice.js';

const useAuthInit = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch, token]);
};

export default useAuthInit;
