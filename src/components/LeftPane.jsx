import plus from '../assets/plus.svg';
import { useState } from 'react';
import search from '../assets/search.svg'

const LeftPane = ({ createNewChat, handleChatList, uniqueTitles }) => {
  const [conversations, setConversations] = useState([]);

  const handlechatlist = () => {
    setConversations([...conversations, 'New Conversation']);
  };

  console.log(uniqueTitles);

  return (
    <section className="bg-zinc-900 w-1/5 hidden flex flex-col justify-start shadow-lg overflow-y-auto no-scrollbar scroll-smooth">
      <p
        className="bg-green-900/[.7] rounded-md p-3 m-3 text-white text-center font-bold focus:outline-none hover:bg-green-800 hover:border-none hover:cursor-pointer transition-colors duration-300"
        onClick={handlechatlist}
      >
        New Chat <img src={plus} alt="plusicon" width={'28px'} className="absolute top-6 left-28" />
      </p>
      <div className='grid justify-items-center'>
      <div className='relative flex items-center  text-white focus-within:text-bold  '>
      <input className='bg-zinc-800 rounded-lg w-full h-8  pl-10 pr-3 text-start border-none ring-1 ring-gray-900 focus:ring-gray-800 hover:ring-2 ' placeholder='Search' />
      <img src={search} alt="plusicon" width={'24px'} className='absolute ml-2 focus-within:bg-white pointer-events-none'/>
      </div>
      </div>
      <ul className=" m-3 text-white space-y-3">
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