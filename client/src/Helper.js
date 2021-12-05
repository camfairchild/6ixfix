import React from "react";
import { useLocation } from "react-router";
import axios from "axios";
import ReactSession from 'react-client-session';

let base_url;
if (process.env.REACT_APP_ENV === "development") {
  base_url = "http://localhost:5000/";
} else {
  base_url = "https://app-6ixfix.herokuapp.com/";
}

const instance = axios.create({
  baseURL: base_url,
  withCredentials: true,
})

export async function getUser() {
  // grabs the current user from local storage
  return new Promise(async (resolve, reject) => {
    let user = {
      userName: ReactSession.get("username"),
      userId: ReactSession.get("userId"),
      userType: ReactSession.get("userType"),
    }
    if (!user) {
      reject(null)
    } else {
      resolve(user)
    }
  });
}

export function getUserByUserName(userName) {
  // makes a call to the server to get the profile by userName
  return getProfileByuserName(userName)
}

export async function getMessages(userName, token = null) {
  // makes GET request to the server
  // gets the message history of a user by userName
  // token is a login token for authentication
  userName = userName || "";
  return new Promise((resolve, reject) => {
    let mock = [];
    if (userName.toLowerCase().includes("mechanic")) {
      mock = {
        client1: [
          {
            from: "client1",
            to: userName,
            message: "test message 3",
            time_: new Date("2021-10-31T13:01:00+00:00"),
          },
          {
            from: userName,
            to: "client1",
            message: "test message 2",
            time_: new Date("2021-10-31T12:34:10+00:00"),
          },
          {
            from: "client1",
            to: userName,
            message: "test message 1",
            time_: new Date("2021-10-31T12:30:23+00:00"),
          },
        ],
        client2: [
          {
            from: userName,
            to: "client2",
            message: "test message 5",
            time_: new Date("2021-10-29T16:35:19+00:00"),
          },
          {
            from: userName,
            to: "client2",
            message: "test message 4",
            time_: new Date("2021-10-29T16:23:17+00:00"),
          },
        ],
      };
    } else {
      mock = {
        mech1: [
          {
            from: "mech1",
            to: userName,
            message: "test message 3",
            time_: new Date("2021-10-31T13:01:00+00:00"),
          },
          {
            from: userName,
            to: "mech1",
            message: "test message 2",
            time_: new Date("2021-10-31T12:34:10+00:00"),
          },
          {
            from: "mech1",
            to: userName,
            message: "test message 1",
            time_: new Date("2021-10-31T12:30:23+00:00"),
          },
        ],
        mech2: [
          {
            from: userName,
            to: "mech2",
            message: "test message 5",
            time_: new Date("2021-10-29T16:35:19+00:00"),
          },
          {
            from: userName,
            to: "mech2",
            message: "test message 4",
            time_: new Date("2021-10-29T16:23:17+00:00"),
          },
        ],
        mech3: [
          {
            from: userName,
            to: "mech3",
            message: "test message 5",
            time_: new Date("2021-10-29T16:35:19+00:00"),
          },
        ],
        mech4: [
          {
            from: userName,
            to: "mech4",
            message: "test message 5",
            time_: new Date("2021-10-29T16:35:19+00:00"),
          },
        ],
        mech5: [
          {
            from: userName,
            to: "mech5",
            message: "test message 5",
            time_: new Date("2021-10-29T16:35:19+00:00"),
          },
        ],
        mech6: [
          {
            from: userName,
            to: "mech6",
            message: "test message 19",
            time_: new Date("2021-10-28T16:06:19+00:00"),
          },
        ],
      };
    }
  });
}

export function addMessageListener(socket, listener) {
  // handles the messages sent from the server
  // socket is the socket that the messages are sent to
  // calls the listener everytime the socket receives a message

  // TODO: change this to use the socket.io library
  document.addEventListener("message", listener);
}

export function removeMessageListener(socket, listener) {
  // removes the listener from the socket

  // TODO: change this to use the socket.io library
  document.removeEventListener("message", listener);
}

export function getMostRecentMessages() {
  // returns the most recent message for each contact the user has
  return new Promise((resolve, reject) => {
    instance.get(`/messages/`).then((res) => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject(res.data);
      }
    });
  });
}

export async function getContacts(userName, token = null) {
  // makes GET request to the server
  // gets the contacts of a user using session
  return new Promise(async (resolve, reject) => {
    const result = await instance.get('api/messages/')
    if (result.status !== 200) {
      console.error(result.data)
      reject(null)
    } else {
      // TODO:
      resolve(result.data)
    }
  });
}

function dateDiff(first, second) {
  // gets number of days between two dates
  // https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
  const lengthDay = 1000 * 60 * 60 * 24;
  return Math.round((second - first) / lengthDay);
}

export function formatTime(time_) {
  const now = new Date();
  let result = "";
  const daysDiff = dateDiff(now, time_);
  const daysFromToday = Math.abs(now.getDate() - time_.getDate());
  if (daysDiff >= 364) {
    // if time_ is a year or more away
    // add year to timestamp
    result = time_.toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (daysDiff >= 7) {
    // if time_ is a week or more away
    // format with month and day
    result = time_.toLocaleString("default", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (daysFromToday >= 2) {
    // if time_ is a week or less away
    // but a different day
    // format with day of week
    result = time_.toLocaleString("default", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (daysFromToday === 1) {
    // if time_ is yesterday
    result =
      time_.toLocaleString("default", {
        hour: "2-digit",
        minute: "2-digit",
      }) + ", Yesterday";
  } else {
    // date is same day
    result = time_.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return result;
}

export async function sendMessage(message) {
  return new Promise((resolve, reject) => {
    if (!message) {
      reject("No message to send");
    }
    const options = {
      url: `/api/messages/`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        message
      }
    };

    instance(options).then(res => {
      if (res.status !== 200) {
        return reject(res.data);
      }

      const messageEvent = new CustomEvent("message", {
        detail: message,
      });
      document.dispatchEvent(messageEvent);
      resolve(["200", message]);
    })
  });
}

export function useQuery() {
  // gets browser location and then grabs query params
  // https://reactrouter.com/web/example/query-parameters
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export async function getProfileByuserName(userName) {
  // makes API call to get profile based on userName
  if (!userName) {
    // TODO: fix this
    return null;
  } else {
    const result = await instance.get(`api/profiles/${userName}`)
    if (result.status === 200) {
      return result.data;
    } else {
      console.error(result.data, result.status)
      return null;
    }
  }
}

export async function updateProfile(newProfile) {

}

export async function uploadImage(image, caption) {
  try {
    const formData = new FormData();
    formData.append("picture", image)
    formData.append("caption", caption || null)
    const response = await instance.post(`api/clientPictures/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.error(error)
  }
}


export async function uploadProfilePic(image) {
  try {
    const formData = new FormData();
    formData.append("picture", image)
    const response = await instance.post(`api/profilePic/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function login_(userName, password) {
  const result = await instance.post('api/auth/login/', {
    userName, password
  })
  if (result.status === 200) {
    const { userName, _id } = result.data.user
    ReactSession.set('userName', userName)
    ReactSession.set('_id', _id)
    const profile = await getProfileByuserName(userName)
    ReactSession.set('userType', profile.userType)
  }
  return result
}

export async function signup_(userName, password, confirmPassword, email, type) {
  const result = await instance.post('api/auth/signup/', {
    userName, password, confirmPassword, email, type
  })
  if (result.status === 200) {
    const { user, user_id } = result.data
    ReactSession.set('userName', user.userName)
    ReactSession.set('_id', user_id)
    ReactSession.set('userType', user.userType)
  }
  return result
}

export async function logout() {
  const result = await instance.post('api/auth/logout/')
  if (result.status === 200) {
    ReactSession.clear()
  }
  return result
}

export async function getAllProfiles() {
  const result = await instance.get(`api/profiles`)
    if (result.status === 200) {
      return result.data;
    } else {
      console.error(result.data, result.status)
      return null;
    }
}

export async function deleteUser(id) {
  const result = await instance.delete(`api/profiles/${id}`)
  if (result.status === 200) {
    return result.data
  } else {
    console.error(result.data, result.status)
    return null;
  }
}

export async function getAllClients() {
  const result = await instance.get(`api/clients`)
    if (result.status === 200) {
      return result.data;
    } else {
      console.error(result.data, result.status)
      return null;
    }
}

export async function getAllMechanics() {
  const result = await instance.get(`/api/mechanics`)
    if (result.status === 200) {
      return result.data;
    } else {
      console.error(result.data, result.status)
      return null;
    }
}