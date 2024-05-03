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
    <div className="relative h-screen w-full bg-zinc-800 flex">
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
          <button className="absolute mr-64 right-20 mt-4" onClick={toggleRightPane}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 fill-color text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664"
              />
            </svg>
          </button>
        )}
      </div>
      <div
        className={
          isRightPaneVisible
            ? "absolute lg:relative right-0 top-0 flex flex-col p-8 border-1 bg-zinc-900 "
            : "hidden"
        }
      >
        <RightPane />
      </div>
    </div>
  );
};

export default Home;
