import React from "react";
import { Link } from "react-router-dom";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      manufacturer: { Mfr_Name: "" },
      changedName: ""    
      };

    this.onChange = this.onChange.bind(this);
    this.rename = this.rename.bind(this);
  }

  componentDidMount() {
    const {
      match: {
          params: { id }
        }
      } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => this.setState({ manufacturer: response, changedName: "" }))
    .catch(() => this.props.history.push("/records"));
  }
    
  onChange(event) {
    this.setState({ changedName: {Mfr_Name: event.target.value}})

  }

  rename(event) {
      event.preventDefault();
      const id = this.state.manufacturer.id;
      const mfr_name = this.state.changedName.Mfr_Name;
      console.log(id); // test
      console.log(mfr_name); // test
      const url = `/api/v1/record/${id}`;
      if (mfr_name.length == 0)
      return;
      const body1 = {mfr_name};             
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
      method: "PATCH",
      headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(body1)
      })
      .then(response => {
          if (response.ok) {
          return response.json();
          }
          throw new Error("Network response was not ok.");
      })
      .then(response => {alert(`Record ${id} updated successfully!`);
          console.log(response.id);})
      .catch(error => console.log(error.message));
  }

    render() {
      const { manufacturer } = this.state;
      return (
        <div className="">
          <div className="hero position-relative d-flex align-items-center justify-content-center">
              <div className="overlay bg-dark position-absolute" />
                  <h1 className="display-4 position-relative text-white">
                  {manufacturer.Mfr_Name}
                  </h1>
              </div>
              <div className="container py-5">
                  <div className="col-sm-12 col-lg-2">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="newM">New manufacturer name:</label>
                        <input
                        type="text"
                        name="Mfr_Name"
                        id="newM"
                        className="form-control"
                        required
                        onChange={this.onChange}
                        placeholder="e.g. Lucid Motors"
                        />
                    </div>
                    <button type="submit" className="btn custom-button mt-3" onClick={this.rename}>
                      CHANGE
                    </button><br></br>
                  </form>
                  </div>
              <Link to="/lists" className="btn btn-link">
                  Back to lists
              </Link>
          </div>
        </div>
      );
    }

}
export default Edit;