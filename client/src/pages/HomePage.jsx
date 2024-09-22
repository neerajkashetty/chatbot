import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import RightPane from "../components/RightPane";
import LeftPane from "../components/LeftPane";
import MiddlePane from "../components/MiddlePane";
import { v4 as uuid } from 'uuid';
import { useParams, useNavigate } from "react-router-dom";

const Home = () => {
  const { conversationId: paramConversationId } = useParams();
  const navigate = useNavigate();
  
  const [chatLog, setChatLog] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRightPaneVisible, setIsRightPaneVisible] = useState(false);
  const [conversationId, setConversationId] = useState(paramConversationId);
  const [sources, setSources] = useState([]);
  const [chats, setChats] = useState([]);

  const toggleRightPane = () => {
    setIsRightPaneVisible(!isRightPaneVisible);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSend = async (data) => {
    const messageToSend = data ? data : searchTerm;
    console.log(messageToSend);

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
      ]);
    }
  };

  const getSources = (docs) => {
    const uniqueSources = new Set();

    docs.forEach((doc) => {
      const source = doc[0];
      uniqueSources.add(source);
    });

    return Array.from(uniqueSources);
  };

  const delayedChatbotResponse = async (messageToSend) => {
    const response = await axios.post("http://localhost:3002/api/ai", {
      userInput: messageToSend,
    });

    const botMessages = response.data.response;

    const conversation = await axios.post("http://localhost:3002/api/conversation/conversations-new", {
      userId: "1",
      userMessage: messageToSend,
      botMessage: botMessages,
      conversationId: conversationId
    });
    console.log(conversation);

    const sources = getSources(response.data.sources);
    setSources(sources);
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "chatbot", message: response.data.response },
    ]);

    setIsLoading(false);
  };

  const ConversationsOfUser = async (userId, conversationId) => {
    const combinedChatLog = [];

    try {
      const response = await axios.post("http://localhost:3002/api/conversation/conversations", {
        userId,
        conversationId,
      });

      const conversations = response.data.data;

      if (conversations) {
        conversations.userMessages.forEach((userMessage, index) => {
          combinedChatLog.push({ type: "user", message: userMessage });
          if (conversations.botMessages[index]) {
            combinedChatLog.push({ type: "bot", message: conversations.botMessages[index] });
          }
        });

        setChatLog(combinedChatLog);
      } else {
        console.log("New user");
      }
    } catch (error) {
      console.log("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    const userId = 1;
    if (paramConversationId) {
      setConversationId(paramConversationId);
      ConversationsOfUser(userId, paramConversationId);
    } else {
      const newConversationId = uuid();
      setConversationId(newConversationId);
      navigate(`/home/${newConversationId}`, { replace: true });
    }
    // eslint-disable-next-line
  }, [paramConversationId, navigate]);

  const createNewChat = useCallback(() => {
    if (chatLog.length !== 0) {
      setChatLog([]);
    }
    setSearchTerm(null);
    setIsLoading(false);
    const newConversationId = uuid();
    setConversationId(newConversationId);
    navigate(`/home/${newConversationId}`);
  }, [chatLog, navigate]);
console.log(conversationId)
  return (
    <div className="dark:bg-zinc-800 bg-white text-black relative h-screen w-full flex overflow-x-hidden overflow-y-hidden">
      <MiddlePane
        chatLog={chatLog}
        searchTerm={searchTerm}
        isLoading={isLoading}
        handleSend={handleSend}
        handleChange={handleChange}
        sources={sources}
      />
      <LeftPane
        createNewChat={createNewChat}
        isRightPaneVisible={isRightPaneVisible}
      />
      <div className="flex">
        <div className="lg:hidden right-2 w-8 h-8 absolute border-1 m-4 active:translate-y-1 shadow-md shadow-zinc-700/100 rounded-lg border-gray-300 ">
            <button className="m-1" onClick={toggleRightPane}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 fill-current text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
        </div>
      </div>
      <div
        className={`lg:absolute lg:right-0 lg:top-0 lg:flex lg:flex-col h-screen lg:p-8 border-2 dark:border-1 dark:border-gray-600 dark:bg-zinc-900 transition-transform duration-400 ease-in-out
        ${
          isRightPaneVisible
            ? "absolute right-0 top-0 flex flex-col h-screen p-8 dark:border-1 dark:bg-zinc-900 bg-white transition-all delay-300 duration-500 translate-x-1"
            : "absolute right-0 top-0 flex flex-col h-screen p-8 dark:border-1 dark:bg-zinc-900 bg-white lg:translate-x-1 lg:relative transition-all delay-300 duration-500 translate-x-full"
        }`}
      >
        <RightPane 
          chats={chats}
          setConversationId = {ConversationsOfUser}
          toggleRightPane = {toggleRightPane}
        />
      </div>
    </div>
  );
};

export default Home;
