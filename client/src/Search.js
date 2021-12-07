import React, { useEffect, useState } from 'react';
import Header from './Header';
import './search.css';
import Filter from './Filter';
import { useQuery, search as searchQuery } from './Helper';
import { uid } from 'react-uid';
import { Link } from "react-router-dom";
import Client from './admin/Client';
import Mechanic from './admin/Mechanic';



async function search(queryParams, filter = {}) {
  const query = {
    query: queryParams,
  }
  return await searchQuery(query, filter);
}

export default function Search() {
  // results equiv to this.state
  // setResults equiv to this.setState
  const [results, setResults] = useState([]);
  const query = useQuery().get("query");

  useEffect(() => {
      search(query).then((results) => {
        setResults(results)
      })
  
  }, [])

  const refreshResults = (filter) => {
    search(query, filter.filterOptions).then((results) => {
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
        {this.props.userType === "Client" ? <Client client={this.props} /> : <Mechanic mechanic={this.props} />}
      </div>
    )
  }
}