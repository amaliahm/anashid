import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//REEDUX
import { sendEmail } from '../services/contactService.js';

// COMPONENTS
import Sidebar from '../Components/SideBar';
import SideBarMobile from '../Components/SideBarMobile';
import NowPlayingWrapper from '../Components/NowPlayingWrapper';

const Contact = () => {

  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')

  const { loading, error, success } = useSelector(state => state.contact)
  const dispatch = useDispatch();
  const { id } = useParams()

  const handleSend = () => {
    dispatch(sendEmail(id, subject, content))
    setContent('')
    setSubject('')
  }

  return (
    <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
      <div className="hidden lg:block w-64 text-white ml-64">
        <Sidebar elem={9}/>
      </div>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
          <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
            <div className='p-4 pr-8 w-full overflow-y-auto'>
              <div className='flex mb-8 gap-6 items-center'>
                <SideBarMobile elem={9}/>
              </div>
              <div className='mb-32'>
                <h2 className='capitalize font-semibold text-2xl lg:text-3xl mb-8 px-2'>
                  contact
                  <span className='text-[#F38BDC]'> us </span>
                </h2>
                <div className='my-2 px-16 py-2 flex flex-col justify-between items-center text-base'>
                  <input 
                    className="w-5/6 py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#DEEBEE] bg-[#DEEBEE] text-[var(--neutralThirdColor)] placeholder-[var(--neutralThirdColor)] font-base"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    required
                  />
                  <textarea 
                    className="w-5/6 py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#DEEBEE] bg-[#DEEBEE] text-[var(--neutralThirdColor)] placeholder-[var(--neutralThirdColor)] font-base"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                  />
                  <button
                    type="submit"
                    className={`border-[1px] border-[var(--greenColor)] rounded-3xl px-12 py-2 text-[var(--greenColor)] font-semibold mb-10 ${subject.length === 0 || content.length === 0 || loading ? 'hover:cursor-not-allowed opacity-50' : 'hover:cusor-pointer'}`}
                    disabled={subject.length === 0 || content.length === 0 || loading}
                    onClick={handleSend}
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                  {error && <p className="text-red-500 text-center">Error, please try again!</p>}
                  {success && <p className="text-green-500 text-center">Email has been sent</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[230px] fixed bottom-0 lg:relative lg:bottom-auto">
            <NowPlayingWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;