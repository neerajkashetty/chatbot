import { Menu, Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { usernameState, theme } from "../atoms/user";
import { useRecoilState } from "recoil";
import axios from "axios";

const RightPane = ({ setConversationId , toggleRightPane}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [username, setUserName] = useRecoilState(usernameState);
  const [enabled, setEnabled] = useRecoilState(theme);
  const [chats, setChats] = useState();
  const [istrue, setIsTrue] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (enabled) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    pullConversations();
  }, [enabled]);

  const onLogOut = () => {
    localStorage.clear();
    window.location = "/Login";
    setUserName("");
  };

  const pullConversations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/conversation/conversations-list",
        {
          params: {
            userId: 1,
          },
        }
      );
      const conversationData = response.data.data.conversationData;
      console.log("Fetched conversation data:", conversationData);
      if (Array.isArray(conversationData)) {
        // eslint-disable-next-line
        const firstMessages = conversationData.map((conversation) => {
          const userMessage = conversation.userMessage;
          if (Array.isArray(userMessage) && userMessage.length > 0) {
            return {
              conversationid: conversation.conversationId,
              firstMessage: userMessage[0],
            };
          }
        });
        setChats(firstMessages.reverse());
        setIsTrue(true);
        console.log("Chats state after setting:", conversationData);
      } else {
        console.error("Fetched data is not an array:", conversationData);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const deleteConversation = async (conversationId) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/conversation/delete-conver",
        {
          conversationId,
        }
      );
      console.log("deleted succesfully", response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (uploadedFiles.length >= 5) {
        alert("You can only upload a maximum of 5 files.");
        return;
      }
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Please upload files of type pdf, doc, or docx.");
        return;
      }
      setUploadedFiles((prevFiles) => [...prevFiles, selectedFile]);
      event.target.value = null;
      console.log(uploadedFiles);
    }
  };

  const handleDeleteFile = (indexToDelete) => {
    const updatedFiles = uploadedFiles.filter(
      (file, index) => index !== indexToDelete
    );
    setUploadedFiles(updatedFiles);
  };

  return (
    <div className="flex flex-col items-center lg:relative">
      <div className="flex items-center justify-start lg:justify-center w-full">
        <div className="flex w-1/6 justify-start text-white lg:hidden">
          <button onClick={toggleRightPane}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <Menu
          as="div"
          className="dark:bg-zinc-900/100 bg-gray-400 z-50 shadow rounded-lg flex  basis-6 border-gray-300 shadow-zinc-700/100 hover:cursor-pointer"
        >
          <div className="bg-zinc-700 shadow-md h-8 m-1 w-8 flex items-center justify-center rounded-3xl text-white text-center font-bold">
            N
          </div>
          <div>
            <Menu.Button className="flex font-bold  dark:text-gray-300  text-black text-sm text-left w-full p-2">
              {" "}
              <p>{username.user}</p>
            </Menu.Button>
          </div>
          <div>
            <Menu.Items className="absolute bg-zinc-800 right-0 mt-12  shadow-md shadow-zinc-700/100 w-full rounded-md">
              <div className="px-1 py-1">
                <Menu.Item>
                  <div className="flex bg-gray text-gray-300 font-semibold hover:cursor-text text-sm p-2">
                    <p>neeraj.kasheety29@gmail.com</p>
                  </div>
                </Menu.Item>
                <hr className="border-gray-600 my-1 mt-2" />

                <Menu.Item>
                  <div className="flex text-gray-300 hover:bg-zinc-700 rounded-lg font-semibold text-sm w-full p-2 items-center justify-start">
                    Edit profile
                    <div className="ml-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className="text-gray-300 hover:bg-zinc-700 rounded-lg flex text-black font-semibold text-sm p-2 h-full  z-50">
                    Settings
                    <div className="ml-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                </Menu.Item>
                <hr className="border-gray-600 my-1 mt-2" />
                <Menu.Item>
                  <div className="flex text-gray-300 hover:bg-zinc-700 rounded-lg font-semibold text-sm p-2">
                    <button onClick={onLogOut}>Logout</button>
                    <div className="ml-2">
                      <svg
                        className="ml-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                        />
                      </svg>
                    </div>
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </div>
        </Menu>
      </div>
      <div className="">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="dark:bg-black bg-gray-900 relative inline-flex shadow-md shadow-zinc-700 rounded-lg mt-8 border-1 border-gray-300 h-5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75"
        >
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-7" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>

      <div className="w-full m-4 dark:bg-zinc-800 bg-gray-200 rounded-md shadow-md overflow-hidden scroll-smooth shadow-zinc-700 border-1 border-gray-300">
        <div className="dark:text-gray-300 text-black text-lg font-bold">
          Chats
        </div>
        <div className="w-full h-full overflow-y-scroll scroll-m-0 text-start">
          <div className="text-sm p-1 text-black dark:text-gray-400 font-semibold">
            Today
          </div>
          {istrue &&
            chats.map((chat, index) => (
              <div
                key={index}
                className="flex justify-start group dark:hover:bg-zinc-700 hover:bg-gray-400 scroll-smooth dark:text-gray-200 text-black  w-full rounded-lg text-sm p-2"
              >
                <button
                  onClick={() => setConversationId(1, chat.conversationid)}
                  className="w-full text-start"
                >
                  <p>{chat.firstMessage}</p>
                </button>
                <button
                  onClick={() => deleteConversation(chat.conversationid)}
                  className="invisible group-hover:visible text-end group-hover:fill-red-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col basis-36 ">
        <h2 className="text-lg font-semibold p-2 text-center text-black dark:text-gray-400">
          Knowledge Base
        </h2>
        <div className="rounded-md flex flex-col items-center justify-center w-56 bg-gray-200 dark:bg-zinc-800 border-1 shadow-md shadow-zinc-700 h-4/5">
          <div>
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center justify-center "
            >
              <div className="p-4 rounded-md border-2  border-blue-300 h-1/12 border-dotted outline-4">
                <div className="ml-2 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 dark:text-white font-bold"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <div className="justify-start align-text-top w-16">
                  <p className="text-xs text-center text-blue-300 font-semibold">
                    Add files
                  </p>
                </div>
              </div>
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="absolute mt-36">
          <p className="text-gray-400 text-md font-bold text-center mt-2 ">
            {" "}
            Uploaded Files
          </p>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex ">
              <p className="flex text-xs font-bold text-gray-200 mt-4">{`${
                index + 1
              }. ${file.name}`}</p>
              <div className="mt-2 ml-auto">
                <svg
                  className="cursor-pointer text-white font-bold mt-2 ml-2 w-4 h-4"
                  onClick={() => handleDeleteFile(index)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPane;
