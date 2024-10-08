import React, { useEffect, useRef, useState, Fragment } from "react";
import sendBtn from "../assets/send.svg";
import userIcon from "../assets/user.png";
import LoadingAnimation from "./LoadingAnimation";
import Robot from "../../src/assets/Robot.json";
import Voice from "../../src/assets/Mic.json";
import Lottie from "lottie-react";
import ReactMarkdown from "react-markdown";
import Thumsup from "../../src/assets/thumsup.svg";
import Thumsdown from "../../src/assets/thumsdown.svg";
import FeedbackModal from "./FeedBack";
import TypingAnimation from "./TypingAnimation";
import { Dialog, Transition } from "@headlessui/react";

const MiddlePane = ({
  chatLog,
  searchTerm,
  isLoading,
  handleSend,
  handleChange,
  sources,
}) => {
  const chatContainerRef = useRef(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      const lastmessage = chatContainerRef.current.lastElementChild;

      if (lastmessage) {
        lastmessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chatLog]);
  console.log(chatLog);
  const customprompt = [
    {
      title: "Give me Ideas",
      Example: "What kind of books should i read",
    },
    {
      title: "All about tesla",
      Example: "What is the manufacturer of telsa think",
    },
    {
      title: "Newtons third law",
      Example: "what is the explanation of the law",
    },
    {
      title: "What is the ability of this bot",
      Example: "like i am five years old",
    },
  ];

  return (
    <div className="flex flex-col items-center w-screen relative justify-center">
      {chatLog.length === 0 && (
        <div className="relative top-1/4 flex flex-col h-screen items-center">
          <div className="flex ">
            <p className="dark:text-white text-black text-black basis-1/3 top-1/3  relative text-lg font-bold p-3">
              <TypingAnimation text="Hoow Can I help you Today ?" />
            </p>
            <div className="dark:bg-zinc-800">
              <Lottie animationData={Robot} loop={true} className="w-60" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 top-8 relative h-[10rem] lg:h-2/5 overflow-hidden items-center rounded-lg">
            {customprompt.map((custom, index) => (
              <div key={index} className="flex border-gray-300 group hover:bg-zinc-700  overflow-invisible text-white border sm:h-4/5 rounded-lg opacity-1">
                <button
                  className="basis-full p-2 h-16 flex flex-col"
                  onClick={() => handleSend(custom.title)}
                >
                  <p className="dark:text-white text-black  ml-2 font-bold text-sm ">
                    {custom.title}
                  </p>
                  <p className="text-gray-500 text-sm font-bold">
                    {custom.Example}
                  </p>
                </button>
                <div className="relative justify-end p-2 flex items-center invisible group-hover:visible  right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 relative"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className="overflow-hidden h-full overflow-y-auto no-scrollbar  w-2/3 scroll-smooth "
        ref={chatContainerRef}
      >
        {chatLog.map((message, index) => (
          <div className="flex flex-col ">
            <div
              key={index}
              className={` ${
                message.type === "user"
                  ? "text-sm flex text-black"
                  : "dark:bg-white/[.05] bg-gray-300 shadow-md  rounded-md"
              } chat m-4  max-w-max items-start`}
            >
              <img
                className="chatImg object-cover w-10 m-4 rounded-md"
                src={message.type === "user" ? userIcon : "hidden"}
                alt=""
              />
              <div className="flex flex-col">
                <div className="text-black dark:text-gray-300 text-sm p-4 markdown">
                  <ReactMarkdown children={message.message} />
                </div>
                {message.type !== "user" && (
                  <div className="flex items-end gap-2 m-2 justify-end">
                    <button
                      className="hover:-translate-y-1 text-blue-300 "
                      onClick={() => setShowFeedback(true)}
                    >
                      <img
                        src={Thumsup}
                        className="text-white fill-current"
                        height={14}
                        width={14}
                        alt=""
                      />
                    </button>
                    <button className="hover:-translate-y-1">
                      <img src={Thumsdown} height={14} width={14} alt="" />
                    </button>
                  </div>
                )}
                {showFeedback && (
                  <FeedbackModal
                    show={showFeedback}
                    onClose={() => setShowFeedback(false)}
                  />
                )}
              </div>
            </div>
            {message.type === "user" && !isLoading && (
              <div>
                <div className="dark:text-white text-black font-bold text-md flex m-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>

                  <p className="ml-1">Sources</p>
                </div>
                <div className="grid grid-cols-2 w-2/3">
                  {sources.map((source) => (
                    <div className="ml-6 p-2 rounded-lg shadow-md  overflow-hidden shadow-gray-600 border-1 border-gray-300 hover:bg-zinc-700 bg-gray-100 dark:bg-zinc-800">
                      <p className="dark:text-gray-300 text-black font-bold text-start text-sm">
                        Relevant Links
                      </p>
                      <a
                        className="dark:text-white text-gray-800 text-xs flex"
                        href={source}
                        target={sources}
                      >
                        {source}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div
            key={chatLog.length}
            className={
              "dark:bg-white/[.05]  bg-gray-400 rounded-lg m-4 w-full py-8 px-12 text-sm flex items-start text-white text-justify"
            }
          >
            <LoadingAnimation />
          </div>
        )}
      </div>
      <div className="flex w-full gap-10 justify-center">
        <div className="relative flex justify-end p-2 w-4/5">
          <div className="bg-gray-100 p-2 lg:mb-2 mb-1 grow basis dark:bg-white/[.05] flex items-center rounded-md shadow-lg">
            <div className="flex items-center m-2 rounded-lg dark:text-gray-100 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Send your message"
              className="dark:bg-transparent bg-gray-100 text-blue-900 focus:outline-none outline-none basis-full p-3 flex items-center dark:text-white"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend(searchTerm);
                }
              }}
            />
          </div>
          <div className="flex absolute m-4 items-center">
            <button
              type="submit"
              className="flex bg-transparent border-none"
              onClick={() => handleSend(searchTerm)}
            >
              <img src={sendBtn} alt="send" />
            </button>
          </div>
        </div>
      </div>
      <Transition show={isDialogOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsDialogOpen(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center h-full">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative bg-white dark:bg-gray-700 rounded w-1/3 h-1/3 flex justify-center items-center z-20">
                <div className="flex items-center justify-center">
                  <Lottie
                    animationData={Voice}
                    loop={true}
                    className="w-40 h-40"
                  />
                </div>
                <div className="mt-4 text-center dark:text-white">
                  {isDialogOpen ? "I am listening..." : "Processing..."}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MiddlePane;
