import React from "react";
import { Link } from "react-router-dom";
import Results from "./Results";
import AllMfr from "./AllMfr";
import Favorites from "./Favorites";

class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      results: [{Mfr_ID: 111, Mfr_Name: 'ZAPAROZ'}, {Mfr_ID: 222, Mfr_Name: 'LUCID'}, {Mfr_ID: 333, Mfr_Name: 'NIO'}],
      favorites: []
    };

    this.addToFavorites = this.addToFavorites.bind(this);
    this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    this.getManufacturersList = this.getManufacturersList.bind(this);
  }
  componentDidMount() {
    const url = "/api/v1/records/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ records: response, favorites: response }))
      .catch(error => console.log(error.message));
  }

  addToFavorites(mfr) {
    const mfrs = this.state.favorites;
    if (mfrs.find(mfr1 => mfr1.Mfr_ID === mfr.Mfr_ID)) {
      return;
    }
    mfrs.push(mfr);
    this.setState({favorites: mfrs});
  }
  deleteFromFavorites(mfr) {
    const mfrs = this.state.favorites;
    let filtered = mfrs.filter(mfr2 => mfr2.Mfr_ID !== mfr.Mfr_ID);
    this.setState({favorites: filtered});
  }
  getManufacturersList() {
    AllMfr.getManufacturersList().then(result => {
      this.setState({ results: result })
    })
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
                Get Mfrs List
              </button>
            </div>
            <div className="box">
            <Results results={this.state.results}
                       onAdd={this.addToFavorites}
                       records={this.props.records} />
            <Favorites results={this.state.favorites}
                       records={this.state.records}
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