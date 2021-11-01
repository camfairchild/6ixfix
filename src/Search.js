import React, { useEffect, useState } from 'react';
import Header from './Header';
import './search.css';
import Filter from './Filter';

import { useLocation } from "react-router-dom";

import { uid } from 'react-uid';


function useQuery() {
  // gets browser location and then grabs query params
  // https://reactrouter.com/web/example/query-parameters
  return new URLSearchParams(useLocation().search);
}

async function search(queryParams, filter=null) {
  // makes api call to search for postings with filter
  // returns an array of filtered post data
  const fakeResult = [{
    'title': 'Title',
    'author': 'JSmith1234',
    'text': 'blah blah blah blah',
    'profile': {
      'picture': '/images/defaultprofpic.png',
      'link': '/',
      'name': 'JSmith1234'
    }
  },
  {
    'title': 'Title2',
    'author': 'JAppleseed',
    'text': 'Lorem Ipsum Dolor Sit Amet',
    'profile': {
      'picture': '/images/defaultprofpic.png',
      'link': '/',
      'name': 'JAppleseed'
    }
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
      <Header page="search"/>
      <SearchResults results={results} query={query}/>
      <Filter refreshResults={refreshResults}/>
    </div>
  );
}

export class SearchResults extends React.Component {
  render() {
    console.log(this.props.query)
    return (
      <div className="results">
        <h1>Search Results for: "{this.props.query.toString()}"</h1>
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
    <div className="result">
      <img className="profpic" src={this.props.profile?.picture} alt={`${this.props.author}'s profile'`}/>
      <div className="content">
        <h2 className="title"><a href={this.props.profile?.link}>{this.props.title}</a></h2>
        <span className="author">{this.props.author}</span>
        <p className="text">{this.props.text}</p>
      </div>
    </div>
    )
  }
}