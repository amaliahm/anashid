import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//ICONS
import { signup } from '../../assets/images';

const VerifyEmail = () => {
  const navigate = useNavigate()
  const { email } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('loading');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('http://localhost:3000/auth/verify-email', { email });
        setVerificationStatus('success');
      } catch (error) {
        setVerificationStatus('error');
      }
    };
    verifyEmail();
  }, [email]);

  return (
    <>
      <div 
        className='bg-green-500 h-screen bg-cover bg-center flex justify-center items-center' 
        style={{ backgroundImage: `url('${signup}')` }}
      >
        <div className='auth-div w-3/4 h-3/4 px-20 flex-col justify-center items-center'>
          <p className='text-3xl'>
            {verificationStatus === 'success' ? 'Your email has been verified successfully!' : 
            verificationStatus === 'loading' ? 'Verifying your email, please wait...' : 
            verificationStatus === 'error' && 'There was an error verifying your email. Please try again.' }
          </p>
          <button 
            className='mt-20 capitalize border-[1px] border-[var(--mainColor)] font-medium px-16 py-2 my-6 rounded-2xl'
            onClick={() => navigate (`${verificationStatus === 'success' ? '/auth/login' : verificationStatus === 'error' && '/auth/signup'}`)}
          >
            {verificationStatus === 'success' ? 'login' :
            verificationStatus === 'loading' ? 'loading...' : 
            verificationStatus === 'error' && 'signup' }
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
