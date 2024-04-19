import React, { useState } from 'react';
import { useEffect } from 'react';
import sendBtn from '../assets/send.svg';
import robotImageLogo from '../assets/robot-assistant.png';
import userIcon from '../assets/user.png';
import TypingAnimation from '../components/TypingAnimation';
import axios from 'axios';
import RightPane from '../components/RightPane';
import LeftPane from '../components/LeftPane';


const Home = () => {
  const [chatLog, setChatLog] = useState([])
  const [searchTerm, setSearchTerm] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)
  const [firstPropmt, setFirstPropmt] = useState(null)
  const [chatbotResponse, setChatbotResponse] = useState(null)

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  };
 

  const handleSend = async () => {

    if (searchTerm.trim() !== '') {
      setChatLog((prevChatLog) => [...prevChatLog, {type:'user', message: searchTerm}])
      setSearchTerm('')
      // Trigger delayed chatbot response
      setIsLoading(true)
      delayedChatbotResponse();
    }
  };

  const handleChatList = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setChatbotResponse(null)
    setFirstPropmt(null)
    setSearchTerm(null)
  }
  

  const delayedChatbotResponse = async () => {
      
    const response = await axios.post('http://localhost:3002/api/ai', {
      userInput: searchTerm
    });
      // Add chatbot response to chat log after 2 seconds
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: 'chatbot', message:response.data.response.text }
      ]);
    setIsLoading(false)
  };
  

  useEffect(() => {
    if (!currentTitle && firstPropmt && chatbotResponse !== null) {
      setCurrentTitle(firstPropmt);
      console.log("What is the current title",currentTitle)
    }
    if(currentTitle && firstPropmt  && chatbotResponse !== null){
      setPreviousChats(previousChats => (
        [...previousChats,
          {
            title: currentTitle,
            content: firstPropmt,
            type : 'user'
          },
          {
            title: currentTitle,
            content: chatbotResponse,
            type: 'chatbot'
          }
        ]
      ))
    }
  }, [chatbotResponse, currentTitle, firstPropmt])

  console.log("What are the previous chats",firstPropmt)

  const createNewChat = () => {
    console.log('clicked')
    setChatbotResponse(null)
    setChatLog([])
    setFirstPropmt(null)
    setSearchTerm(null)
    setCurrentTitle(null)
  }

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  console.log("What is the current chat ",currentChat)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log("What are the unique titles",uniqueTitles)
  
  return (
    <div className='app h-lvh bg-zinc-800 flex'>
    <LeftPane/>
      <section className='main flex flex-col items-center mt-6 justify-center mx-32' style={{ minHeight: 'calc(100vh - 10rem)' }} >{/*w-2/3 flex flex-col justify-end items-center shadow-md */}
      
      {chatLog.length === 0 && (
       
        <div id='extra' className='flex items-center flex-col justify-center w-full h-full'>
        <img className='object-cover w-20  rounded-md' src={robotImageLogo} alt="robotImageLogo" />
        <p className='text-white text-lg font-bold tracking-wide p-3'>How Can I help you Today?</p>
      </div>
      )}
        
        <div className='chats overflow-hidden overflow-y-auto no-scrollbar scroll-smooth w-full max-w-5xl' style={{ height: 'calc(100vh - 8rem)' }}>
          {
            chatLog.map((message, index) => {
              return (
                <div key={index} className={` ${message.type === 'user' ? '' : 'bg-white/[.05] rounded-md'} chat m-4 py-8 px-12 text-sm flex items-start text-white text-justify`}>
                  <img className='chatImg object-cover w-10 mr-8 rounded-md' src={message.type === 'user' ? userIcon : robotImageLogo} alt="" /><p className='text'>{message.message}</p>
                </div>
              )
            })
          }
          {
            isLoading ? (
            <div key={chatLog.length} className={'bg-white/[.05] rounded-md chat m-4 py-8 px-12 text-sm flex items-start text-white text-justify'}>
              <img className='chatImg object-cover w-10 mr-8 rounded-md' src={robotImageLogo} alt="" /><p className='text'>
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
                setFirstPropmt(searchTerm)
                handleSend();
              }
            }}
            /><button type='submit' className='send bg-transparent border-none' onClick={handleSend}><img src={sendBtn} alt="send" /></button>
          </div>
        </div>
      </section>
      <div className="w-1/5 flex flex-col p-4 border-1 bg-zinc-900">
      <RightPane/>

        </div>
    </div>
  )
}

export default Home;