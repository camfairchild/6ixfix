import React from "react";
import { useLocation } from "react-router";
import _ from 'lodash';

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

export function getProfileByuserName(userName) {
    // makes API call to get profile based on userName
    
    return new Promise((resolve, reject) => {
      const payload = {
          userName
      }
      console.log("Makes API Call:", payload);

      // mock profiles
      const profiles = [
        {
          fullName: 'Kermit T. Frog',
          type: 'Client',
          userName: 'kermitTheFrog',
          location: 'The Muppets Studio',
          picture: process.env.PUBLIC_URL + '/images/kermit.webp',
          link: '/profile/kermitTheFrog',
          email: "kermit@disney.com",
          bio: "Hi-ho! It's me, Kermit the Frog!",
          bannerImage: process.env.PUBLIC_URL + '/images/kermitBanner.webp',
          carMake: 'Ford',
          carModel: 'Escape Hybrid',
          carYear: '2006',
          serviceRequested: 'Full Inspection',
          mechType: null,
          certified: null,
          rate: null,
          numViews: 52,
          carPics: [
            {
              picture: process.env.PUBLIC_URL + '/images/kermitFord.webp',
              caption: 'My Ford Escape Hybrid',
            },
            { picture: process.env.PUBLIC_URL + '/images/kermitFord2.jpg',
              caption: 'Driving',
            },
          ]
        },
        {
          fullName: 'Jimmy Parker',
          type: 'Client',
          userName: 'jPark23',
          location: 'Markham',
          picture: null,
          link: '/profile/jpark23',
          email: "parkerj97@hotmail.com",
          bio: `Hi, My name is Jimmy Parker. I'm a third-year university student on a budget and a not-so-reliable car. 
          Looking for a mechanic who can take care of my automobile mainetenance needs`,
          bannerImage: null,
          carMake: 'Honda',
          carModel: 'Civic',
          carYear: '2012',
          serviceRequested: 'Oil Change',
          mechType: null,
          certified: null,
          rate: null,
          numViews: 10,
          carPics: []
        },
        {
          fullName: 'Nav',
          type: 'Client',
          userName: 'brownBoy1',
          location: 'Markham',
          picture: process.env.PUBLIC_URL + '/images/Nav.jpeg',
          link: '/profile/brownBoy1',
          email: "nav@yahoo.com",
          bio: `What's good, it's your boy Nav! I'm a top 5 soundcloud rapper, the first brown boy ever.
          I need some help with my corolla, bless up.`,
          bannerImage: null,
          carMake: 'Toyota',
          carModel: 'Corolla',
          carYear: '2007',
          serviceRequested: 'Brake Maintenance',
          mechType: null,
          certified: null,
          rate: null,
          numViews: 35,
          carPics: []
        },
        {
          fullName: 'Shawn Carter',
          type: 'Client',
          userName: 'carter97',
          location: 'Brampton',
          picture: null,
          link: '/profile/carter97',
          email: "shawn27@carter.com",
          bio: `Hey my name is Shawn. I'm a teacher at a Brampton high school and am looking for a 
          nice, reliable mechanic to take care of my new Jetta.`,
          bannerImage: null,
          carMake: 'Volkswagen',
          carModel: 'Jetta',
          carYear: '2018',
          serviceRequested: 'Full Inspection',
          mechType: null,
          certified: null,
          rate: null,
          numViews: 52,
          carPics: []
        },
        {
          fullName: 'John Doe',
          type: 'Mechanic',
          userName: 'jDoe123',
          location: 'Toronto',
          picture: null,
          link: '/profile/jDoe123',
          email: "abc@gmail.com",
          bio: `Hello potential clients! My name is John and I'm a certified private mechanic.
          I offer a variety of services including oil changes, brake maintenance and tire changes.
          I'm looking for new clients so please get in touch!`,
          bannerImage: null,
          carMake: null,
          carModel: null,
          carYear: null,
          serviceRequested: null,
          mechType: 'Private',
          rate: '$25/hr',
          certified: true,
          numViews: 32,
          carPics: []
        },
        {
          fullName: 'Kenneth Crane',
          type: 'Mechanic',
          userName: 'craneK78',
          location: 'Waterloo',
          picture: null,
          link: '/profile/craneK78',
          email: "kenneth@crane.com",
          bio: `Hi friends! My name is Kenn and I'm a certified dealer mechanic working for 
          Waterloo's Carimex Auto Sales. I offer a variety of services with a full warranty on everything! Get in touch
          to book an appointment and get more information.`,
          bannerImage: null,
          carMake: null,
          carModel: null,
          carYear: null,
          serviceRequested: null,
          mechType: 'Dealer',
          rate: '$45/hr',
          certified: true,
          numViews: 27,
          carPics: []
        },{
          fullName: 'Kenneth Crane',
          type: 'Mechanic',
          userName: 'user2',
          location: 'Waterloo',
          picture: null,
          link: '/profile/craneK78',
          email: "kenneth@crane.com",
          bio: `Hi friends! My name is Kenn and I'm a certified dealer mechanic working for 
          Waterloo's Carimex Auto Sales. I offer a variety of services with a full warranty on everything! Get in touch
          to book an appointment and get more information.`,
          bannerImage: null,
          carMake: null,
          carModel: null,
          carYear: null,
          serviceRequested: null,
          mechType: 'Dealer',
          rate: '$45/hr',
          certified: true,
          numViews: 27,
          carPics: []
        },
        {
          fullName: 'Drake',
          type: 'Mechanic',
          userName: 'drizzy86',
          location: 'Degrassi',
          picture: process.env.PUBLIC_URL + '/images/Drake-Profile-Pic.png',
          link: '/profile/drizzy86',
          email: "drake@ovo.com",
          bio: `Yeah! It's ya boy Drizzy. I got tired of the music scene so I decided to try out
          this mechanic life style. Hit me up for details and I'll hook you up with a banger deal!`,
          bannerImage: null,
          carMake: null,
          carModel: null,
          carYear: null,
          serviceRequested: null,
          mechType: 'Private',
          rate: '$20/hr',
          certified: false,
          numViews: 52,
          carPics: []
        },

        
      ]
      // mock data recieved from state
      let profile;
      if (userName && userName !== 'jsmith123') {
        if (_.map(profiles, 'userName').includes(userName)) {
          profile = _.find(profiles, {userName});
        } else {
          profile = {
            fullName: 'User FullName',
            type: 'Client',
            userName: 'user',
            location: 'Toronto',
            picture: process.env.PUBLIC_URL + '/images/defaultprofpic.png',
            link: '/profile/user',
            email: "user@example.com",
            bio: "I love my car! I have the best car and everyone needs to know about it!",
            bannerImage: process.env.PUBLIC_URL + '/images/defaultbanner.jpg',
            carMake: 'Nissan',
            carModel: 'Altima',
            carYear: '2008',
            serviceRequested: 'Oil change',
            numViews: 17,
            carPics: [
              {
                picture: process.env.PUBLIC_URL + '/images/altima.jpg',
                caption: 'My Nissan Altima',
              }
            ]
          }
        }
      }
      resolve(profile)
    })  
}
