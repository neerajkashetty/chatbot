import React from "react";
import sendBtn from "../assets/send.svg";
import robotImageLogo from "../assets/robot-assistant.png";
import userIcon from "../assets/user.png";
import TypingAnimation from "./TypingAnimation";
import Spline from '@splinetool/react-spline';
import Robot from '../../src/assets/Robot.json';
import Lottie from "lottie-react";

const MiddlePane = ({
  chatLog,
  searchTerm,
  isLoading,
  handleSend,
  handleChange,
}) => (
  <div className="flex flex-col items-center w-screen relative justify-center">
    {chatLog.length === 0 && (
      <div className="relative top-1/4 flex flex-col h-screen items-center">
        <div className="flex ">
        <p className="text-white basis-1/2 top-1/3  relative text-lg font-bold p-3">
          How Can I help you Today?
        </p>
        <div className="bg-zinc-800 ">
          <Lottie animationData={Robot} loop={true} className="w-60"/>
        </div>
        </div>

        <div className="grid grid-cols-2 gap-4 top-[8rem] relative h-2/5 items-center rounded-lg">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="flex hover:bg-zinc-700 border-gray-300 border sm:h-4/5 rounded-lg opacity-1">
              <button className=" flex flex-col">
                <p className="text-white ml-2 font-bold text-sm ">
                  Give me ideas{" "}
                </p>
                <p className="text-gray-500 text-sm font-bold">
                  {" "}
                  for what to do with my kids' art
                </p>
              </button>
              <div className="hover:fill-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 relative"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="overflow-hidden h-full overflow-y-auto no-scrollbar  w-2/3 scroll-smooth ">
      {chatLog.map((message, index) => (
        <div
          key={index}
          className={` ${
            message.type === "user" ? "" : "bg-white/[.05] rounded-md"
          } chat m-4 py-8 px-12 text-sm flex items-start text-white text-justify`}
        >
          <img
            className="chatImg object-cover w-10 mr-8 rounded-md"
            src={message.type === "user" ? userIcon : robotImageLogo}
            alt=""
          />
          <p className="text">{message.message}</p>
        </div>
      ))}
      {isLoading && (
        <div
          key={chatLog.length}
          className={
            "bg-white/[.05] rounded-lg chat m-4 w-full py-8 px-12 text-sm flex items-start text-white text-justify"
          }
        >
          <img
            className="chatImg object-cover w-10 mr-8 rounded-md"
            src={robotImageLogo}
            alt=""
          />
          <p className="text">
            <TypingAnimation />
          </p>
        </div>
      )}
    </div>

    <div className="relative flex justify-end mb-4 w-4/5 ">
      <div className="p-2  grow basis bg-white/[.05] flex items-center rounded-md shadow-md">
        <input
          type="text"
          placeholder="Send your message"
          className="focus:outline-none outline-none basis-full p-3 flex items-center text-white bg-transparent border-none"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
      </div>
      <div className="flex absolute mt-4 items-center">
        <button
          type="submit"
          className="flex justify-end bg-transparent border-none"
          onClick={handleSend}
        >
          <img src={sendBtn} alt="send" />
        </button>
      </div>
    </div>
  </div>
);

export default MiddlePane;
