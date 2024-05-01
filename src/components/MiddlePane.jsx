import React from "react";
import sendBtn from "../assets/send.svg";
import robotImageLogo from "../assets/robot-assistant.png";
import userIcon from "../assets/user.png";
import TypingAnimation from "./TypingAnimation";

const MiddlePane = ({
  chatLog,
  searchTerm,
  isLoading,
  handleSend,
  handleChange,
}) => (
  <div
    className="flex flex-col items-center w-screen justify-center">
    {chatLog.length === 0 && (
      <div className="relative top-44 flex flex-col hidden items-center">
        <img
          className="w-20  rounded-md"
          src={robotImageLogo}
          alt="robotImageLogo"
        />
        <p className="text-white text-lg font-bold p-3">
          How Can I help you Today?
        </p>
      </div>
    )}

    <div className="overflow-hidden h-full overflow-y-auto no-scrollbar scroll-smooth ">
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
            "bg-white/[.05] rounded-md chat m-4 py-8 px-12 text-sm flex items-start text-white text-justify"
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

    <div className="relative flex mb-4 w-4/5 ">
      <div className="p-2 grow bg-white/[.05] flex rounded-md shadow-md">
        <input
          type="text"
          placeholder="Send your message"
          className="focus:outline-none outline-none p-3 text-white bg-transparent border-none"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button
          type="submit"
          className="justify-end bg-transparent border-none"
          onClick={handleSend}
        >
          <img src={sendBtn} alt="send" />
        </button>
      </div>
    </div>
  </div>
);

export default MiddlePane;
