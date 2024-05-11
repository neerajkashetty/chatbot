
const LeftPane = ({ createNewChat, isRightPaneVisible }) => {


  return (
    <>
    {!isRightPaneVisible && (
    <div className=" absolute border-1 m-4  shadow-md shadow-zinc-700/100 rounded-lg border-gray-300 group bg-zinc-800 opacity-96 flex hover:cursor-pointer group" onClick={createNewChat}>
      <div className="hidden md:block"> <p className="m-3 text-white text-xs text-center font-bold ">New Chat</p>
</div>
      <div className="flex items-center hover:text-white m-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 fill-white">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
</svg>

      </div>

    </div>
  )}
  </>
  );
};

export default LeftPane;
