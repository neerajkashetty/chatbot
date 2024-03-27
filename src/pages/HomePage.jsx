import React, { useState } from 'react';
import { useEffect } from 'react';
import { Menu } from '@headlessui/react';
import sendBtn from '../assets/send.svg';
import robotImageLogo from '../assets/robot-assistant.png';
import userIcon from '../assets/user.png';
import TypingAnimation from '../components/TypingAnimation';


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
      try {
        const response = await delayedChatbotResponse();
        setChatbotResponse(response);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChatList = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setChatbotResponse(null)
    setFirstPropmt(null)
    setSearchTerm(null)
  }
  

  const delayedChatbotResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus possimus iure, laborum provident optio odio illo error facilis quod in ratione, facere dicta? Inventore saepe culpa porro laboriosam! Debitis aliquam necessitatibus obcaecati vero, et earum architecto delectus, facilis cupiditate tempora eius, quos doloremque sint neque laboriosam commodi. Sunt, voluptas amet!");
      }, 10000);
    });
  };
  

  // console.log(chatLog)


  useEffect(() => {
    // console.log(currentTitle, searchTerm, chatLog)
    if (!currentTitle && firstPropmt && chatbotResponse !== null) {
      setCurrentTitle(firstPropmt);
    }
    if(currentTitle && firstPropmt  && chatbotResponse !== null){
      setPreviousChats(previousChats => (
        [...previousChats,
          {
            title: currentTitle,
            role: 'user',
            content: firstPropmt
          },
          {
            title: currentTitle,
            role: 'chatbot',
            content: chatbotResponse
          }
        ]
      ))
    }
  }, [chatbotResponse, currentTitle, firstPropmt])

  console.log(previousChats)
  console.log(currentTitle)

  const createNewChat = () => {
    console.log('clicked')
    setChatbotResponse(null)
    setChatLog([])
    setFirstPropmt(null)
    setSearchTerm(null)
    setCurrentTitle(null)
  }

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(uniqueTitles)
  
  return (
    <div className='app h-lvh bg-zinc-800 flex'>
      <section className='side-bar bg-zinc-900  w-1/5 flex flex-col justify-start shadow-lg overflow-y-auto no-scrollbar scroll-smooth'>
        <button className='bg-green-900/[.7] rounded-md p-3 m-3 text-white focus:outline-none hover:bg-green-800 hover:border-none transition-colors duration-300' onClick={createNewChat}>+ New Chat</button>
        <ul className='recentConversations m-3 text-white space-y-3'>
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleChatList(uniqueTitle)} className='cursor-pointer hover:bg-white/[.05] p-3 rounded-md transition-colors duration-300'>{uniqueTitle.length > 20 ? `${uniqueTitle.slice(0, 20)}...` : uniqueTitle}</li>)}
        </ul>

        
      </section>
      <section className='main flex flex-col items-center mt-6 justify-center mx-32' style={{ minHeight: 'calc(100vh - 10rem)' }} >{/*w-2/3 flex flex-col justify-end items-center shadow-md */}
      {currentChat.length === 0 && (
        <div id='extra' className='flex items-center flex-col justify-center w-full h-full'>
        <img className='object-cover w-20  rounded-md' src={robotImageLogo} alt="robotImageLogo" />
        <p className='text-white text-lg font-bold tracking-wide p-3'>How Can I help you Today?</p>
      </div>
      )}
        
        <div className='chats overflow-hidden overflow-y-auto no-scrollbar scroll-smooth w-full max-w-5xl' style={{ height: 'calc(100vh - 8rem)' }}>
          {
            currentChat.map((message, index) => {
              return (
                <div key={index} className={` ${message.role === 'user' ? '' : 'bg-white/[.05] rounded-md'} chat m-4 py-8 px-12 text-sm flex items-start text-white text-justify`}>
                  <img className='chatImg object-cover w-10 mr-8 rounded-md' src={message.role === 'user' ? userIcon : robotImageLogo} alt="profile-image" /><p className='text'>{message.content}</p>
                </div>
              )
            })
          }
          {
            isLoading ? (
            <div key={chatLog.length} className={'bg-white/[.05] rounded-md m-4 py-8 px-12 text-sm flex items-start text-white text-justify'}>
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
                setFirstPropmt(searchTerm)
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