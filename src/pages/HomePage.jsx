import React, { useState } from 'react';
import { Menu } from '@headlessui/react';


const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onLogOut = () =>{
    localStorage.clear()
    window.location = "/Login"
  }

  const handleSend = () => {
    if (searchTerm.trim() !== '') {
      setMessages([...messages, searchTerm]);
      setSearchTerm('');
    }
  };

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
            <p className="text-sm text-blue-400">{conversation.message}</p>
          </div>
        ))}
      </div>
      
      <div className="flex-1 md:w-96 mb-8 bg-white p-4 flex flex-col justify-end">
      {messages.map((message, index) => (
        <div key={index} className="bg-blue-300 text-sm font-semibold px-3 py-1 rounded-md border border-solid border-neutral-300 mb-8 w-96 ml-72 items-stretch">
          {message}
        </div>
      ))}
  <div className='bottom flex-col'>
    <div className='ml-32 w-2/3 relative bottom-2 flex flex-wrap items-stretch border-r '>
      <input
        type='search'
        className='relative rounded-lg m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto  border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
        placeholder='Tell us your query'
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={(e) => {
          if(e.key === 'Enter'){
            handleSend();
          }
        }}
      />
      <button
        className="relative bg-gray-200 flex items-center rounded-lg bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 focus-visible:outline-indigo-600 active:shadow-lg"
        onClick={handleSend}
     >
        Send
      </button>
    </div> 
  </div>
</div>


      <div className="w-1/5 bg- p-4 border-l border-gray-200">
      <div className='flex  absolute items-center'>
      <div className='absolute inline-flex rounded-full shadow-md bg-gray-100 w-12 h-12 ml-12 mt-20 p-3  z-10'>
      <svg className='fill-white h-7 mt-2 ml-2'xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
      </div>

        <div>
        <Menu as='div' className='bg-gray-100 shadow-md rounded-md hover: cursor-pointer flex justify-between w-36 h-10 mt-5 ml-20 absolute'>
          <div>
          <Menu.Button className='flex font-bold text-blue-400 ml-6 mt-3 text-sm text-left w-full mb-4'>Neeraj1234
          <div className='ml-1 '>
          <svg className='fill-black bg-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
          </svg> 
          </div></Menu.Button>
          </div>
          <div>
          <Menu.Items className="absolute bg-gray-100 right-0 mt-12 ml-36  w-56 origin-top-right  rounded-md bg-blue shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className='px-1 py-1'>
          <Menu.Item><div className='flex bg-gray text-black font-semibold text-sm w-56 mt-2 z-50'>Edit profile
          <div className='ml-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
           <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          </div>
          </div></Menu.Item>
          <Menu.Item><div className='bg-gray flex text-black font-semibold text-sm w-56 mt-3 z-50'>Settings
          <div className="ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
           <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

          </div>
          </div></Menu.Item>
          <hr className="border-gray-300 my-1 mt-2" />

          <Menu.Item><div className='flex bg-gray text-black font-semibold  text-sm w-56 pb-2 mt-3 z-50'>
          <button onClick={onLogOut}>Logout</button>
          <div className='ml-2'>
          <svg className="ml-8"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
          </svg>
          </div>
          </div></Menu.Item>
          

        </div>
         </Menu.Items>
         
          </div>
         </Menu>
         </div>


      </div>

        <div className='flex mb-4'>
        <h2 className="text-lg font-semibold mb-4 mt-52 ml-16 text-blue-400">
          Knowledge Base
        </h2>
        </div> 
        <div className='rounded-md ml-10 w-56 bg-gray-50  h-1/2'>
          <p className='font-semibold text-center hover:subpixel-antialiased'>Documents for your bot</p>
          <p className='text-gray-400 text-xs non-italic px-8 pt-4 font-medium '>Please upload the documents in here, the maximum file size for each upload is 5MB.</p>
        <div className=' p-8 mt-12 ml-12 rounded-md border-2 border-blue-300 w-1/2 h-1/4 border-dotted outline-4'>
          <div className='ml-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        </div>
        <div className='absoulte  justify-start align-text-top w-16 '>
        <p className='text-xs text-blue-300 font-semibold '>Add Pdf's and Doc's</p>
        </div>
        </div>
        <div className='w-56 h-1/3 bg-gray-50 mt-10 rounded-b-md'>
          <h3 className='text-xs  font-semibold text-gray-500'>Uploaded Documents:</h3>
          <hr className="border-gray-400 border-dashed my-1 mt-2" />
          <div className='flex'>
          <p className='flex text-xs font-bold text-gray-500 mt-4'>1.Machine_learning.doc </p>
          <div  className='mt-3'>
          <svg className='mt-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          </div>
          </div>
          
          </div>  

        </div>
      </div>
    </div>
  );
};

export default Home;