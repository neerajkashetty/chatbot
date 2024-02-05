import React from 'react';
import { Menu } from '@headlessui/react';


const Home = () => {
  const recentConversations = Array.from({ length: 11 }, (_, index) => ({
    id: index + 1,
    user: `User ${index + 1}`,
    message: `Conversations and its Description Summary`,
  }));

  return (
    <div className="flex h-screen bg-black-300">
      <div className="w-1/5 bg-white p-4 border-r border-gray-200 font-mono">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Recent Conversations
        </h2>
        {recentConversations.map((conversation) => (
          <div key={conversation.id} className="mb-4">
            <span className="font-bold text-gray-700">
              Conversation {conversation.id}:
            </span>
            <p className="text-sm text-blue-200">{conversation.message}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">ChatBar</h2>
      </div>

      <div className="w-1/5 bg- p-4 border-l border-gray-200">
      <div className='flex  absolute items-center'>
      <div className='absolute inline-flex rounded-full shadow-md bg-gray-100 w-12 h-12 mt-5 p-3  z-10'>
      <svg className='fill-white h-7 mt-2 ml-2'xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
      </div>
      
        <Menu as='div' className='bg-gray-100 shadow-md rounded-md hover: cursor-pointer flex justify-between w-36 h-10 mt-5 ml-8 overflow-hidden relative'>
          <Menu.Button className='font-bold ml-6 mt-2 text-sm text-left w-full mb-4'>Neeraj1234
          </Menu.Button>
          <div className='mt-2 mr-4 '>
          <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
          </svg>
          
          <Menu.Items className="absolute right-0 mt-1 w-56 h-56 origin-top-right divide-y divide-gray-100 rounded-md bg-green-200 shadow-lg ring-1 ring-black/5 focus:outline-none">
        <Menu.Item><div className='bg-gray text-black text-lg'>Logout</div></Menu.Item>
      </Menu.Items>
          </div>
      </Menu>
          </div>

        <div className='flex mb-4'>
        <h2 className="text-lg font-semibold mb-4 mt-24 text-gray-700">
          Knowledge Base
        </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;