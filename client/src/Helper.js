import React from "react";
import { useLocation } from "react-router";
import axios from "axios";

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

export async function checkSession() {
  try {
    const result = await instance.get("api/auth/checkSession");
    return result.status === 200;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function getUserByUserName(userName) {
  // makes a call to the server to get the profile by userName
  return getProfileByuserName(userName)
}

export async function getMessages(date = null) {
  // makes GET request to the server
  // gets the message history of a user by userName
  // token is a login token for authentication
  const result = await instance.get(`api/messages/${date || ""}`);
  if (result.status === 200) {
    return result.data
  } else {
    console.log("error getting messages");
    console.log(result.data);
    return null
  }
}

export function addMessageListener(listener) {
  // handles the messages sent from the server
  // socket is the socket that the messages are sent to
  // calls the listener everytime the socket receives a message

  // TODO: change this to use the socket.io library
  document.addEventListener("message", listener);
}

export function removeMessageListener(listener) {
  // removes the listener from the socket

  // TODO: change this to use the socket.io library
  document.removeEventListener("message", listener);
}

export async function getMostRecentMessages() {
  // returns the most recent message for each contact the user has
  try {
    const result = await instance.get(`api/messages/recent/`)
    if (result.status === 200) {
      return result.data;
    } else {
      return null
    }
  } catch (error) {
    console.log("error getting recent messages");
    console.log(error);
    return null;
  }
}

export async function startPollingForMessages() {
  const interval = setInterval(async () => {
    console.log('checking for new messages')
    // last time interval was checked + 1 second
    const date = (new Date()) - 1000 * 6;

    try {
      // get messages since last check
      const messages = await getMessages(date);
      if (messages) {
        messages.forEach(message => {
          document.dispatchEvent(new CustomEvent("message", { detail: message }));
        });
      }
    } catch (error) {
      stopPollingForMessages()
    }
  }, 1000 * 5); // every 5 seconds
  return interval
}

export async function stopPollingForMessages(interval) {
  const int = setInterval(() => {}, 0)
  // clears all intervals
  for (let i = 0; i < int; i++) {
    clearInterval(i);
  }
  clearInterval(interval);
}

export async function getContacts() {
  // makes GET request to the server
  // gets the contacts of a user using session
  try {
  const result = await instance.get('api/messages/contacts')
  if (result.status !== 200) {
    console.error(result.data)
    return null
  } else {
    return result.data
  }
} catch (error) {
  console.log(error)
  return null
}
}

function dateDiff(first, second) {
  // gets number of days between two dates
  // https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
  const lengthDay = 1000 * 60 * 60 * 24;
  return Math.round((second - first) / lengthDay);
}

export function formatTime(time_) {
  console.log("time:", time_)
  if (!(time_ instanceof Date)) {
    time_ = new Date(time_);
  }
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

    instance.post('api/messages/',{
      message
    }).then(res => {
      if (res.status !== 200) {
        return reject(res.data);
      }

      const messageEvent = new CustomEvent("message", {
        detail: res.data,
      });
      console.log("message sent", messageEvent);
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

export async function updateProfile(newProfile, user) {
  console.log(newProfile)
  let url = `api/profiles/`
  if (user.userType === 'Admin') {
    url = `api/profiles/${newProfile.userName}`
  }
  const result = await instance.put(url, newProfile)
  if (result.status !== 200) {
    console.log("error: cannot update profile")
  } else {
    console.log(result)
  }
}

export async function uploadImage(image, caption, userName=null) {
  try {
    const formData = new FormData();
    formData.append("picture", image)
    formData.append("caption", caption || null)
    let url = `api/clientPictures/`
    if (userName) {
      url = `api/clientPictures/${userName}/`
    } 
    const response = await instance.post(url, formData, {
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


export async function uploadProfilePic(image, userName=null) {
  try {
    const formData = new FormData();
    formData.append("picture", image)
    let url = `api/profilePic/`
    if (userName) {
      url = `api/profilePic/${userName}/`
    } 
    const response = await instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response)
    return response.data.picture.url
  } catch (error) {
    console.error(error)
  }
}

export async function login_(userName, password) {
  const result = await instance.post('api/auth/login/', {
    userName, password
  })
  return result
}

export async function signup_(userName, password, confirmPassword, email, type) {
  const result = await instance.post('api/auth/signup/', {
    userName, password, confirmPassword, email, type
  })
  return result
}

export async function logout() {
  const result = await instance.put('api/auth/logout/')
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
  const result = await instance.delete(`api/admin/profiles/${id}`)
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
  const result = await instance.get(`api/mechanics`)
  if (result.status === 200) {
    return result.data;
  } else {
    console.error(result.data, result.status)
    return null;
  }
}

export async function search(query, filter) {
  query = query.query || "";
  console.log(query, filter)
  const result = await instance.get(`api/search/`, {
    params: {
      query: query,
      ...filter
    }
  })
  if (result.status === 200 || result.status === 304) {
    return result.data;
  } else {
    console.error(result.data, result.status)
    return [];
  }
}

export async function getFilterOptions() {
  const result = await instance.get(`api/search/filterOptions/`)
  if (result.status === 200) {
    return result.data;
  } else {
    console.error(result.data, result.status)
    return [];

  }
}

export async function sendHelpForm(helpForm) {
  const result = await instance.post(`api/help`, helpForm)
  if (result.status === 200) {
    return result.data;
  } else {
    console.error(result.data, result.status)

    return null;
  }
}