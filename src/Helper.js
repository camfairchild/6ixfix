import React from "react";
import { useLocation } from "react-router";

export async function getUser() {
  // grabs the current user from local storage
  return new Promise((resolve, reject) => {
    const mock = {
      role: "Client",
      fullName: "testClient",
      userName: "user",
      password: "user",
    };
    const client = {
      name: 'Jimmy Parker', 
      type: 'Client',
      userName: 'jPark23',
      location: 'Markham',
      profilePic: null,
      link: '/',
      email: "parkerj97@hotmail.com",
      carMake: 'Honda',
      carModel: 'Civic',
      carYear: '2012',
      serviceRequested: 'Oil Change',
      numViews: 10
      }

    const mechanic = {
      name: 'John Doe', 
      type: 'Mechanic',
      userName: 'jDoe123',
      location: 'Toronto',
      profilePic: null,
      link: '/',
      email: "abc@gmail.com",
      mechType: 'Private',
      certified: true, //can also potentially have a list of certifications based on the profile
      numViews: 32
      }

      
    resolve(mock);
  });
}

export async function getUserByUserName(userName) {
  // makes a call to the server to get the user by userName
  return new Promise((resolve, reject) => {
    const mock = {
      role: "Client",
      fullName: "testClient",
      userName: userName,
      password: "user",
      picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
    };
    resolve(mock);
  });
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
    resolve(mock);
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

export function getMostRecentMessages(userName, token = null) {
  // returns the most recent message for each contact the user has by userName
  // token is a login token for authentication
  userName = userName || "";
  return new Promise((resolve, reject) => {
    let mock = [];
    if (userName.toLowerCase().includes("mechanic")) {
      mock = {
        client1: {
          from: "client1",
          to: userName,
          message: "test message 3",
          time_: new Date("2021-10-31T13:01:00+00:00"),
        },
        client2: {
          from: userName,
          to: "client2",
          message: "test message 5",
          time_: new Date("2021-10-29T16:35:19+00:00"),
        },
      };
    } else {
      mock = {
        mech1: {
          from: "mech1",
          to: userName,
          message: "test message 3",
          time_: new Date("2021-10-31T13:01:00+00:00"),
        },
        mech2: {
          from: userName,
          to: "mech2",
          message: "test message 5",
          time_: new Date("2021-10-29T16:35:19+00:00"),
        },
        mech3: {
          from: userName,
          to: "mech3",
          message: "test message 5",
          time_: new Date("2021-10-29T16:35:19+00:00"),
        },
        mech4: {
          from: userName,
          to: "mech4",
          message: "test message 5",
          time_: new Date("2021-10-29T16:35:19+00:00"),
        },
        mech5: {
          from: userName,
          to: "mech5",
          message: "test message 5",
          time_: new Date("2021-10-29T16:35:19+00:00"),
        },
        mech6: {
          from: userName,
          to: "mech6",
          message: "test message 19",
          time_: new Date("2021-10-28T16:06:19+00:00"),
        },
      };
    }
    resolve(mock);
  });
}

export async function getContacts(userName, token = null) {
  // makes GET request to the server
  // gets the contacts of a user by userName
  // token is a login token for authentication
  userName = userName || "";
  return new Promise((resolve, reject) => {
    let mock = [];
    if (userName.toLowerCase().includes("mechanic")) {
      mock = [
        {
          role: "Client",
          fullName: "testClient1",
          userName: "client1",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
        {
          role: "Client",
          fullName: "testClient2",
          userName: "client2",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
        {
          role: "Client",
          fullName: "testClient3",
          userName: "client3",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
        {
          role: "Client",
          fullName: "testClient4",
          userName: "client4",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
        {
          role: "Client",
          fullName: "testClient5",
          userName: "client5",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
      ];
    } else {
      mock = [
        {
          role: "Mechanic",
          fullName: "testMech1",
          userName: "mech1",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
        {
          role: "Mechanic",
          fullName: "testMech2",
          userName: "mech2",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
        {
          role: "Mechanic",
          fullName: "testMech3",
          userName: "mech3",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
        {
          role: "Mechanic",
          fullName: "testMech4",
          userName: "mech4",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
        {
          role: "Mechanic",
          fullName: "testMech5",
          userName: "mech5",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
        {
          role: "Mechanic",
          fullName: "testMech6",
          userName: "mech6",
          password: "user",
          picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`,
        },
      ];
    }
    resolve(mock);
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

export function sendMessage(socket, message) {
  // sends message over socket
  return new Promise((resolve, reject) => {
    // TODO: send message over socket
    const messageEvent = new CustomEvent("message", {
      detail: message,
    });
    document.dispatchEvent(messageEvent);
    console.log("message passed");
    resolve(["200", message]);
  });
}

export function useQuery() {
  // gets browser location and then grabs query params
  // https://reactrouter.com/web/example/query-parameters
  const { search } = useLocation();
  
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
