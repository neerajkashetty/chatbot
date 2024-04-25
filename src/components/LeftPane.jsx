import plus from '../assets/plus.svg';
import { useState } from 'react';

const LeftPane = ({ createNewChat, handleChatList, uniqueTitles }) => {
  const [chatlist, setChatlist] = useState(false);
  const [conversations, setConversations] = useState([]);

  const handlechatlist = () => {
    setChatlist(true);
    setConversations([...conversations, 'New Conversation']);
  };

  console.log(uniqueTitles);

  return (
    <section className="side-bar bg-zinc-900 w-1/5 flex flex-col justify-start shadow-lg overflow-y-auto no-scrollbar scroll-smooth">
      <p
        className="bg-green-900/[.7] rounded-md p-3 m-3 text-white text-center font-bold focus:outline-none hover:bg-green-800 hover:border-none hover:cursor-pointer transition-colors duration-300"
        onClick={handlechatlist}
      >
        New Chat <img src={plus} alt="plusicon" width={'28px'} className="absolute top-6 left-28" />
      </p>
      <ul className="recentConversations m-3 text-white space-y-3">
        {conversations.map((conversation, index) => (
          <div
            key={index}
            className="p-3 text-white bg-zinc-800 rounded-lg hover:cursor-pointer hover:bg-zinc-900"
            onClick={() => console.log(conversation)}
          >
            {conversation}
          </div>
        ))}
      </ul>
    </section>
  );
};

export default LeftPane;