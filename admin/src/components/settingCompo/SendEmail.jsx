import React, { useState } from "react";

// CONTEXT
import { useAdminContext } from "../../hooks/adminContext";

const SendEmail = ({
    handleAdd, data
}) => {
    const { id } = useAdminContext()
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    
    return (
        <>
          <div className="my-2 px-16 py-2 flex flex-col justify-between items-center text-base">
            <input 
              className="w-5/6 py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#DEEBEE] bg-[#DEEBEE] text-[var(--textColor)] placeholder-[var(--textColor)] font-base"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              required
            />
            <textarea 
              className="w-5/6 py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#DEEBEE] bg-[#DEEBEE] text-[var(--textColor)] placeholder-[var(--textColor)] font-base"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              required
            />
            <button
              type="submit"
              className={`border-[1px] border-[var(--greenColor)] rounded-3xl px-12 py-2 text-[var(--greenColor)] font-semibold mb-10 ${subject.length === 0 || content.length === 0 ? 'hover:cursor-not-allowed opacity-50' : 'hover:cusor-pointer'}`}
              disabled={subject.length === 0 || content.length === 0}
              onClick={() => {
                handleAdd(
                    'sendEmail', 
                  {
                    subject: subject,
                    content: content,
                    id: id
                  }
                )
                setSubject('')
                setContent('')
              }}
            >
                Send
            </button>
            {data.error && !data.success && <p className="text-[var(--redColor)] text-center">Error, please try again!</p>}
            {data.success && ! data.error && <p className="text-[var(--greenColor)] text-center">Emails have been sent</p>}
          </div>
        </>
    )
}

export default SendEmail;