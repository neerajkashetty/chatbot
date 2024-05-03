import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import RightPane from "../components/RightPane";
import LeftPane from "../components/LeftPane";
import MiddlePane from "../components/MiddlePane";
import hamburger from "../assets/hamburger.svg";

const Home = () => {
  const [chatLog, setChatLog] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [chatbotResponse, setChatbotResponse] = useState(null);

  const [isRightPaneVisible, setIsRightPaneVisible] = useState(false);

  const toggleRightPane = () => {
    setIsRightPaneVisible(!isRightPaneVisible);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSend = async () => {
    if (searchTerm.trim() !== "") {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "user", message: searchTerm },
      ]);
      setSearchTerm("");
      // Trigger delayed chatbot response
      setIsLoading(true);
      delayedChatbotResponse();
    }
  };

  const handleChatList = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setChatbotResponse(null);
    setSearchTerm(null);
  };

  const delayedChatbotResponse = async () => {
    const response = await axios.post("http://localhost:3002/api/ai", {
      userInput: searchTerm,
    });
    // Add chatbot response to chat log after 2 seconds
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "chatbot", message: response.data.response.text },
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!currentTitle && chatbotResponse !== null) {
      console.log("What is the current title", currentTitle);
    }
    if (currentTitle && chatbotResponse !== null) {
      setPreviousChats((previousChats) => [
        ...previousChats,
        {
          title: currentTitle,
          type: "user",
        },
        {
          title: currentTitle,
          content: chatbotResponse,
          type: "chatbot",
        },
      ]);
    }
  }, [chatbotResponse, currentTitle]);

  const createNewChat = () => {
    setChatbotResponse(null);
    setChatLog([]);
    setSearchTerm(null);
    setCurrentTitle(null);
  };

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );
  const uniqueTitles = ["skadha", "kjashkjfh", "kjahfkjafh"];

  return (
    <div className="relative h-screen w-full bg-zinc-800 flex overflow-x-hidden lg:overflow-x-visible">
      <LeftPane
        createNewChat={createNewChat}
        handleChatList={handleChatList}
        uniqueTitles={uniqueTitles}
      />
      <MiddlePane
        chatLog={chatLog}
        searchTerm={searchTerm}
        isLoading={isLoading}
        handleSend={handleSend}
        handleChange={handleChange}
      />
      <div className="lg:hidden">
        {!isRightPaneVisible && (
          <button className="mr-4 mt-2" onClick={toggleRightPane}>
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
      <div
        className={`lg:absolute lg:right-0 lg:top-0 lg:flex lg:flex-col h-screen lg:p-8 lg:border-1 lg:bg-zinc-900 transition-transform duration-200 ease-in-out
          ${
            isRightPaneVisible
              ? "absolute right-0 top-0 flex flex-col h-screen p-8 border-1 bg-zinc-900 transition-all  translate-x-0"
              : "translate-x-full lg:translate-x-0 absolute ml-[54rem] lg:ml-0 lg:relative"
          }`}
      >
        <RightPane />
      </div>
    </div>
  );
};

export default Home;
