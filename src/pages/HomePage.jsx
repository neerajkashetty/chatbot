import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import RightPane from '../components/RightPane';
import LeftPane from '../components/LeftPane';
import MiddlePane from '../components/MiddlePane';


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
    <LeftPane createNewChat = {createNewChat} handleChatList = {handleChatList} uniqueTitles= {uniqueTitles}/>
    <MiddlePane chatLog={chatLog} searchTerm={searchTerm} isLoading={isLoading} handleSend={handleSend} handleChange={handleChange} />
    <div className="w-1/5 flex flex-col p-4 border-1 bg-zinc-900">
    <RightPane/>
    </div>
    </div>
  )
}

export default Home;