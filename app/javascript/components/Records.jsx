import React from "react";
import { Link } from "react-router-dom";
import Results from "./Results";
// import AllMfr from "./AllMfr";
import Favorites from "./Favorites";

class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // records: [],
      results: [],
      favorites: []
    };

    this.addToFavorites = this.addToFavorites.bind(this);
    this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    // this.getManufacturersList = this.getManufacturersList.bind(this);
  }

  handleErrors(response) {
    if (!response.ok) {
      // return response.status;
      throw Error(response.statusText);
    }
    return response.json();
  };

  componentDidMount() {
    const url = "/api/v1/records/index";
    const url2 = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json"
    
    fetch(url).then(this.handleErrors) 
    .then(response => this.setState({ favorites: response }))
    .catch(error => console.log(error.message));
  
    fetch(url2)
    .then(this.handleErrors)
    .then(jsonResponse => {
        const results = jsonResponse.Results.map(result => ({
          id: 0,  
          Mfr_ID: result.Mfr_ID,
          Mfr_Name: result.Mfr_Name            
        }));
      this.setState({ results: results });
    }).catch(error => console.log(error.message));
  }

  addToFavorites(mfr) {
    const mfrs = this.state.favorites;
    mfrs.push(mfr);
    this.setState({favorites: mfrs});
  }

  deleteFromFavorites(mfr) {
    const mfrs = this.state.favorites;
    let filtered = mfrs.filter(mfr2 => mfr2.Mfr_ID !== mfr.Mfr_ID);
    this.setState({favorites: filtered});
  }

  render() {
    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Select your favorite manufacturers!</h1>
            <p className="lead text-muted">
             Welcome to the Junior Task website - an innovative classic, sports, and exotic cars’ listing platform. 
             The online marketplace was born from our passion for classic cars. 
             Junior Task officially launched in April 2021 and in more than 1 day, 
             our database had more than 93 car manufacturers list.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <button onClick={this.getManufacturersList} className="btn custom-button">
                Disabled..
              </button>
            </div>
            <div className="box">
            <Results results={this.state.results}
                       onAdd={this.addToFavorites}
                       favorites={this.state.favorites} 
                       />
            <Favorites results={this.state.favorites}
                       favorites={this.state.favorites}
                           onM={this.deleteFromFavorites} />
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}
export default Records;