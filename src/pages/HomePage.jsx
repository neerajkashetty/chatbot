import React, { useState } from 'react';
import { useEffect } from 'react';
import { Menu } from '@headlessui/react';
import sendBtn from '../assets/send.svg';
import robotImageLogo from '../assets/robot-assistant.png';
import userIcon from '../assets/user.png';
import TypingAnimation from '../components/TypingAnimation';


const Home = () => {
  const [chatLog, setChatLog] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  };
 

  const handleSend = () => {
    if (searchTerm.trim() !== '') {
      setChatLog((prevChatLog) => [...prevChatLog, {type:'user', message: searchTerm}])
      setSearchTerm('')
      // Trigger delayed chatbot response
      setIsLoading(true)
      delayedChatbotResponse();
    }
  };

  const delayedChatbotResponse = () => {
    setTimeout(() => {
      // Add chatbot response to chat log after 2 seconds
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: 'chatbot', message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus possimus iure, laborum provident optio odio illo error facilis quod in ratione, facere dicta? Inventore saepe culpa porro laboriosam! Debitis aliquam necessitatibus obcaecati vero, et earum architecto delectus, facilis cupiditate tempora eius, quos doloremque sint neque laboriosam commodi. Sunt, voluptas amet!" }
      ]);
    }, 10000);
    setIsLoading(false)
  };

  console.log(chatLog)

  useEffect(() => {
    console.log("isLoading:", isLoading);
  }, [isLoading]);

  
  return (
    <div className='app h-lvh bg-zinc-800 flex'>
      <section className='side-bar bg-zinc-900  w-1/5 flex flex-col justify-start shadow-lg'>
        <button className='bg-green-900/[.7] rounded-md p-3 m-3 text-white focus:outline-none hover:bg-green-800 hover:border-none transition-colors duration-300'>+ New Chat</button>
        <ul className='recentConversations m-5 text-white space-y-6 cursor-pointer'>
          <li>how are you?</li>
          <li>what are you doing?</li>
        </ul>
        
      </section>
      <section className='main flex flex-col items-center mt-6 mx-32' style={{ minHeight: 'calc(100vh - 10rem)' }} >{/*w-2/3 flex flex-col justify-end items-center shadow-md */}
        <div className='chats overflow-hidden overflow-y-auto no-scrollbar scroll-smooth w-full max-w-5xl' style={{ height: 'calc(100vh - 8rem)' }}>
          {
            chatLog.map((message, index) => {
              return (
                <div key={index} className={` ${message.type === 'user' ? '' : 'bg-white/[.05] rounded-md'} chat m-4 py-8 px-12 text-sm flex items-start text-white text-justify`}>
                  <img className='chatImg object-cover w-10 mr-8 rounded-md' src={message.type === 'user' ? userIcon : robotImageLogo} alt="profile-image" /><p className='text'>{message.message}</p>
                </div>
              )
            })
          }
          {
            isLoading ? (
            <div key={chatLog.length} className={'bg-white/[.05] rounded-md chat m-4 py-8 px-12 text-sm flex items-start text-white text-justify'}>
              <img className='chatImg object-cover w-10 mr-8 rounded-md' src={robotImageLogo} alt="profile-image" /><p className='text'>
                <TypingAnimation/>
              </p>
            </div>
            ) : null
          }
        </div>
        <div className='chatFooter mt-auto mb-6 flex w-full justify-center items-center'>
          <div className='inp p-2 bg-white/[.05] flex justify-center items-center rounded-md shadown-md'>
            <input type="text" placeholder='Send your message' className='focus:outline-none outline-none p-3 text-white bg-transparent border-none' style={{ width: 'calc(100vh - 3rem)' }} 
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            /><button type='submit' className='send bg-transparent border-none' onClick={handleSend}><img src={sendBtn} alt="send" /></button>
          </div>
        </div>
      </section>
      <section className='knowledge-base h-lvh w-1/5 shadow-lg'>
        <ul>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </section>
    </div>
  )
}

export default Home;