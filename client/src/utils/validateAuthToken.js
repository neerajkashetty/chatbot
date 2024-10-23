import axios from "axios";

export const validateAuthToken = (userToken) => {
  console.log("dwfwf", userToken);
  return new Promise((resolve, reject) => {
    axios
      .get("https://chatbot-ij0f.onrender.com/api/user/verify", {
        headers: {
          "Content-type": "application/json",
          authorization: userToken,
        },
      })
      .then(({ data }) => {
        return resolve(data);
      })
      .catch((err) => {
        localStorage.clear();
        window.location = "/login";
        return reject(err);
      });
  });
};
