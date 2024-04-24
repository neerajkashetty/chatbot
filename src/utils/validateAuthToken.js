import axios from "axios";

export const validateAuthToken = (userToken) => {
  console.log("dwfwf", userToken);
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3002/api/user/verify", {
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
