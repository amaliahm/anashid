import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const verifyEmail = async () => {
      try {
        const response = await axios.post('http://localhost:3000/auth/verify-email', { token });
        setMessage(response.data.message);
        // Redirect to login page or other page
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setMessage(error.response.data.message || 'Verification failed.');
      }
    };

    if (token) verifyEmail();
  }, [navigate]);

  return <div>{message}</div>;
};

export default VerifyEmail;
