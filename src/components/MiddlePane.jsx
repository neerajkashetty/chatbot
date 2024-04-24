import React from 'react';
import sendBtn from '../assets/send.svg';
import robotImageLogo from '../assets/robot-assistant.png';
import userIcon from '../assets/user.png';
import TypingAnimation from './TypingAnimation';

const MiddlePane = ({ chatLog, searchTerm, isLoading, handleSend, handleChange }) => (
  <section className='main flex flex-col items-center mt-6 justify-center mx-32' style={{ minHeight: 'calc(100vh - 10rem)' }}>
    {chatLog.length === 0 && (
      <div id='extra' className='flex items-center flex-col justify-center w-full h-full'>
        <img className='object-cover w-20  rounded-md' src={robotImageLogo} alt="robotImageLogo" />
        <p className='text-white text-lg font-bold tracking-wide p-3'>How Can I help you Today?</p>
      </div>
    )}

    <div className='chats overflow-hidden overflow-y-auto no-scrollbar scroll-smooth w-full max-w-5xl' style={{ height: 'calc(100vh - 8rem)' }}>
      {chatLog.map((message, index) => (
        <div key={index} className={` ${message.type === 'user' ? '' : 'bg-white/[.05] rounded-md'} chat m-4 py-8 px-12 text-sm flex items-start text-white text-justify`}>
          <img className='chatImg object-cover w-10 mr-8 rounded-md' src={message.type === 'user' ? userIcon : robotImageLogo} alt="" /><p className='text'>{message.message}</p>
        </div>
      ))}
      {isLoading && (
        <div key={chatLog.length} className={'bg-white/[.05] rounded-md chat m-4 py-8 px-12 text-sm flex items-start text-white text-justify'}>
          <img className='chatImg object-cover w-10 mr-8 rounded-md' src={robotImageLogo} alt="" /><p className='text'>
            <TypingAnimation/>
          </p>
        </div>
      )}
    </div>

    <div className='chatFooter mt-auto mb-6 flex w-full justify-center items-center'>
      <div className='inp p-2 bg-white/[.05] flex justify-center items-center rounded-md shadown-md'>
        <input
          type="text"
          placeholder='Send your message'
          className='focus:outline-none outline-none p-3 text-white bg-transparent border-none'
          style={{ width: 'calc(100vh - 3rem)' }} 
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button type='submit' className='send bg-transparent border-none' onClick={handleSend}>
          <img src={sendBtn} alt="send" />
        </button>
      </div>
    </div>
  </section>
);

export default MiddlePane;
