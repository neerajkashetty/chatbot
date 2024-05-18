import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import RightPane from "../components/RightPane";
import LeftPane from "../components/LeftPane";
import MiddlePane from "../components/MiddlePane";
import { Switch } from '@headlessui/react'

const Home = () => {
  const [chatLog, setChatLog] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRightPaneVisible, setIsRightPaneVisible] = useState(false);
  const [sources, setSources] = useState([]);
  const [chats , setChats] = useState([]);
  const [enabled, setEnabled] = useState(false)

  const toggleRightPane = () => {
    setIsRightPaneVisible(!isRightPaneVisible);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSend = async (data) => {
    const messageToSend = data ? data : searchTerm;
    console.log(messageToSend)
  
    if (messageToSend.trim() !== "") {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "user", message: messageToSend },
      ]);
      setSearchTerm("");
      // Trigger delayed chatbot response
      setIsLoading(true);
      delayedChatbotResponse(messageToSend);
      setChats((prevChats) => [
        messageToSend,
        ...prevChats.reverse()
      ])

    }
  };

  const getSources = (docs) => {
    const uniqueSources = new Set();
  
    docs.forEach((doc) => {
      // Assuming each 'doc' is an array and the source is the first item in the array
       const source = doc[0];
      uniqueSources.add(source);
    });
  
    return [uniqueSources];
  };
  


  const delayedChatbotResponse = async (messageToSend) => {
    const response = await axios.post("http://localhost:3002/api/ai", {
      userInput: messageToSend,
    });
    console.log(response.data.sources)
   const sources =  getSources(response.data.sources);
    setSources(sources)
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "chatbot", message: response.data.response },
    ]);

    setIsLoading(false);
  };


  const ConversationsOfUser = async () =>{
    const combinedChatLog = [];

    const response = await axios.post("http://localhost:3002/api/conversations", {
      userId: 24,
    })

    console.log(response)
    const conversations = response.data.data;

    if(conversations){
    
    conversations.forEach((conversation) => {

      combinedChatLog.push({
        type: "user",
        message: conversation.userInput,
        id: conversation.id,
      });
    
      combinedChatLog.push({
        type: "chatbot",
        message: conversation.botResponse,
        id: conversation.id,
      });
    });
    
    setChatLog((prevChatLog) => [
      ...prevChatLog,
     //...combinedChatLog,
    ]);
    console.log(chatLog)
  }else{
    console.log("New user")
  }
  }

  useEffect(() => {
    ConversationsOfUser();// eslint-disable-next-line
  }, []);

  const createNewChat = () => {
   setChatLog([])
   setSearchTerm(null)
   setIsLoading(false)
   console.log('cloick')

    
  };

  

  return (
    <div className={`${enabled ? 'bg-zinc-800' : 'bg-white'} relative h-screen w-full  flex overflow-x-hidden overflow-y-hidden`}>
      <MiddlePane
        chatLog={chatLog}
        enabled={enabled}
        searchTerm={searchTerm}
        isLoading={isLoading}
        handleSend={handleSend}
        handleChange={handleChange}
        sources = {sources}
      />
      <LeftPane
        createNewChat={createNewChat}
        isRightPaneVisible={isRightPaneVisible}
      />
      <div className="flex">
      <div className=" ">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-gray-900' : 'bg-blue-300'}
          relative inline-flex h-5 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-10' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      </div>
      <div className="lg:hidden right-2 w-8 h-8 absolute border-1 m-4 active:translate-y-1 shadow-md  shadow-zinc-700/100 rounded-lg border-gray-300 ">
        {!isRightPaneVisible && (
          <button className="m-1 " onClick={toggleRightPane}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 fill-current text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
        )}
        {isRightPaneVisible && (
          <button
            className="absolute mr-64 right-20 mt-4"
            onClick={toggleRightPane}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-7 h-7 fill-color text-white"
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      </div>
      <div
        className={`lg:absolute lg:right-0 lg:top-0 lg:flex lg:flex-col h-screen lg:p-8 lg:border-1 lg:bg-zinc-900 transition-transform duration-400 ease-in-out
        ${
          isRightPaneVisible
            ? "absolute right-0 top-0 flex flex-col h-screen p-8 border-1 bg-zinc-900 transition-all delay-300 duration-500 translate-x-1"
            : "absolute right-0 top-0 flex flex-col h-screen p-8 border-1 bg-zinc-900 lg:translate-x-1 lg:relative transition-all delay-300 duration-500 translate-x-full"
        }`}
      >
        <RightPane 
         chats= {chats}
        />
      </div>
    </div>
  );
};

export default Home;
