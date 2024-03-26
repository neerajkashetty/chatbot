const LeftPane = () =>{

    return(
        <section className='side-bar bg-zinc-900  w-1/5 flex flex-col justify-start shadow-lg'>
        <button className='bg-green-900/[.7] rounded-md p-3 m-3 text-white focus:outline-none hover:bg-green-800 hover:border-none transition-colors duration-300'>+ New Chat</button>
        <ul className='recentConversations m-5 text-white space-y-6 cursor-pointer'>
          <li>how are you?</li>
          <li>what are you doing?</li>
        </ul>
        
      </section>
    )

}

export default LeftPane