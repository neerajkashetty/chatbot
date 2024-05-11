import { Menu } from "@headlessui/react";
import { useState } from "react";
import { usernameState } from "../atoms/user";
import { useRecoilState } from "recoil";

const RightPane = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [username, setUserName] = useRecoilState(usernameState);

  const onLogOut = () => {
    localStorage.clear();
    window.location = "/Login";
    setUserName("");
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
      console.log(uploadedFiles)
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
      <Menu
        as="div"
        className="bg-gray-600/50 shadow-md rounded-md border-white shadow hover:cursor-pointer flex justify-between w-44 h-12 mt-5 absolute"
      >
        <div>
          <Menu.Button className="flex font-bold text-gray-200 ml-2 mt-3 text-sm text-left w-full mb-4">
            {" "}
            {username.user}
            <div className="ml-1 ">
              <svg
                className="fill-black bg-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </Menu.Button>
        </div>
        <div>
          <Menu.Items className="absolute bg-gray-300 right-0 mt-12 ml-36  w-56 origin-top-right  rounded-md bg-blue shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <div className="flex bg-gray text-black font-semibold text-sm w-56 mt-2 z-50">
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
                <div className="bg-gray flex text-black font-semibold text-sm w-56 mt-3 z-50">
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
              <hr className="border-gray-300 my-1 mt-2" />

              <Menu.Item>
                <div className="flex bg-gray text-black font-semibold  text-sm w-56 pb-2 mt-3 z-50">
                  <button onClick={onLogOut}>Logout</button>
                  <div className="ml-2">
                    <svg
                      className="ml-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeidth="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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

      <div className="flex mb-4">
        <h2 className="text-lg font-semibold mb-4 mt-52 ml-16 text-blue-400">
          Knowledge Base
        </h2>
      </div>
      <div className="rounded-md ml-10 w-56 bg-gray-600/50 h-1/2">
        <label>
          <p className="font-semibold text-center text-white hover:subpixel-antialiased">
            Documents for your bot
          </p>
          <p className="text-gray-400 text-xs non-italic px-8 pt-4 font-medium">
            Please upload the documents here (Accepted File Types: .Pdf, .Doc,
            .Docx). The maximum file size for each upload is 5MB. Maximum number
            of file uploads are 5.
          </p>
        </label>
        <div>
          <label htmlFor="fileInput" className="cursor-pointer">
            <div className="p-8 mt-12 ml-12 rounded-md border-2 border-blue-300 w-1/2 h-1/4 border-dotted outline-4">
              <div className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <div className="absolute justify-start align-text-top w-16">
                <p className="text-xs text-blue-300 font-semibold">Add files</p>
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
        {uploadedFiles && (
        <div className="w-56 h-auto bg-gray-600/25 mt-10 rounded-b-md">
          <h3 className="text-xs font-semibold text-gray-200">
            Uploaded Documents:
          </h3>
          <hr className="border-gray-400 border-dashed my-1 mt-2" />
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex">
              <p className="flex text-xs font-bold text-gray-200 mt-4">{`${
                index + 1
              }. ${file.name}`}</p>
              <div className="mt-2 ml-auto">
                <svg
                  className="cursor-pointer mt-3 w-3 h-3"
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
        )}
      </div>
    </div>
  );
};

export default RightPane;
