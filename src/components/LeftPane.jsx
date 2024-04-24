const LeftPane = ({createNewChat, handleChatList, uniqueTitles}) =>{

    return(
      <section className='side-bar bg-zinc-900  w-1/5 flex flex-col justify-start shadow-lg overflow-y-auto no-scrollbar scroll-smooth'>
      <button className='bg-green-900/[.7] rounded-md p-3 m-3 text-white focus:outline-none hover:bg-green-800 hover:border-none transition-colors duration-300' onClick={createNewChat}>+ New Chat</button>
      <ul className='recentConversations m-3 text-white space-y-3'>
        {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleChatList(uniqueTitle)} className='cursor-pointer hover:bg-white/[.05] p-3 rounded-md transition-colors duration-300'>{uniqueTitle.length > 20 ? `${uniqueTitle.slice(0, 20)}...` : uniqueTitle}</li>)}
      </ul>
    </section>
    )

}

export default LeftPane