import React, { useEffect, useState } from 'react';
import Header from './Header';
import './search.css';
import Filter from './Filter';
import {USER_ICON, LOCATION_ICON, EMAIL_ICON } from "./Icons/icons";
import { useQuery } from './Helper';
import { uid } from 'react-uid';
import {Link} from "react-router-dom";



async function search(queryParams, filter = null) {
  // makes api call to search for postings with filter
  // returns an array of filtered post data
  const fakeResult = [{
    name: 'John Doe',
    type: 'Mechanic',
    userName: 'jDoe123',
    location: 'Toronto',
    profilePic: null,
    link: '/',
    email: "abc@gmail.com"
  },
  {
    name: 'Nav',
    type: 'Client',
    userName: 'brownBoy1',
    location: 'Rexdale',
    profilePic: '/images/Nav.jpeg',
    link: '/',
    email: "nav@yahoo.com"
  },
  {
    name: 'Jimmy Parker',
    type: 'Client',
    userName: 'jPark23',
    location: 'Markham',
    profilePic: null,
    link: '/',
    email: "parkerj97@hotmail.com"
  },
  {
    name: 'Drake',
    type: 'Mechanic',
    userName: 'drizzy86',
    location: 'Degrassi',
    profilePic: '/images/Drake-Profile-Pic.png',
    link: '/',
    email: "drake@ovo.com"
  },
  {
    name: 'Shawn Carter',
    type: 'Client',
    userName: 'carter97',
    location: 'Brampton',
    profilePic: null,
    link: '/',
    email: "shawn27@carter.com"
  },
  {
    name: 'Kenneth Crane',
    type: 'Mechanic',
    userName: 'craneK78',
    location: 'Waterloo',
    profilePic: null,
    link: '/',
    email: "kenneth@crane.com"
  }]
  return new Promise((resolve, reject) => resolve(fakeResult))
}

export default function Search() {
  // results equiv to this.state
  // setResults equiv to this.setState
  const [results, setResults] = useState([]);
  let query = useQuery().get("query");

  useEffect(() => {
    search(query).then((results) => {
      setResults(results)
    })
  }, [])

  const refreshResults = (filter) => {
    search(query, filter).then((results) => {
      setResults(results)
    })
  }

  return (
    <div>
      <Header page="search" />
      <div className="search-container" >
        <Filter refreshResults={refreshResults} />
        <SearchResults results={results} query={query} />
      </div>
    </div>
  );
}

export class SearchResults extends React.Component {
  render() {
    console.log(this.props.query)
    return (
      <div className="results">
        <h1>{this.props.query ? `Search Results for: "${this.props.query.toString()}"` : "Browsing Postings"}</h1>
        {this.props.results.map((result) =>
          <Result key={uid(result)} {...result} />
        )}
      </div>
    )
  }
}

export class Result extends React.Component {
  render() {
    return (
      // <div className="result">
      //   <img className="profpic" src={this.props.profile?.picture} alt={`${this.props.author}'s profile'`}/>
      //   <div className="content">
      //     <h2 className="title"><a href={`/profile/${this.props.author}`}>{this.props.title}</a></h2>
      //     <span className="author">{this.props.author}</span>
      //     <p className="text">{this.props.text}</p>
      //   </div>
      // </div>
      <div className="result dashboard__result">
        <div className="profile-container">
          <img src={this.props.profilePic !== null ? this.props.profilePic : '/images/defaultprofpic.png'} />
        </div>
        <div className="profile-info-container">
          <h4>{this.props.name}</h4>
          <div className={this.props.type === 'Mechanic' ? "user__type__tag tag__mechanic" : "user__type__tag tag__client"}>{this.props.type}</div>
          <div className='icon-text-container'>
            <div className='profile-icon'>{USER_ICON}</div>
            <div className='icon-text'>{this.props.userName}</div>
          </div>
          <br />
          <div className='icon-text-container'>
            <div className='profile-icon'>{LOCATION_ICON}</div>
            <div className='icon-text'>{this.props.location}</div>
          </div>
          <br />
          <div className='icon-text-container'>
            <div className='profile-icon'>{EMAIL_ICON}</div>
            <div className='icon-text'><a href={"mailto:" + this.props.email}>{this.props.email}</a></div>
          </div>
          {/* <div className="profile-icon">{USER_ICON} {user.userName}</div>
                                    <br/>
                                    <div className='profile-icon'>{LOCATION_ICON} {user.location}</div>
                                    <div className='profile-icon'>{EMAIL_ICON}<a href={"mailto:" + user.email}>{user.email}</a></div> */}
        </div>
        <div className="get-profile-btn-container">
          <Link className="profile-btn" to={`/profile/${this.props.userName}`}>
            Continue to profile
          </Link>
        </div>

      </div>
    )
  }
}