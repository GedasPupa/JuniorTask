import React from "react";
import { Link } from "react-router-dom";

class NewMfr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        manufacturers: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/records/create";
        const { manufacturers } = this.state;    
        const body1 = {manufacturers};             
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
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
        .then(response => this.props.history.push(`/list/${response.id}`))
        .catch(error => console.log(error.message));
    }

    render() {
        return (
        <div className="container mt-5">
            <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1 className="font-weight-normal mb-5">
                Add a new recipe to our awesome recipe collection.
                </h1>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="recipeName">Manufacturer name</label>
                    <input
                    type="text"
                    name="manufacturers"
                    id="recipeName"
                    className="form-control"
                    required
                    onChange={this.onChange}
                    />
                </div>
                <button type="submit" className="btn custom-button mt-3">
                    Create Mfr
                </button>
                <Link to="/lists" className="btn btn-link mt-3">
                    Back to recipes
                </Link>
                </form>
            </div>
            </div>
        </div>
        );
    }

}

export default NewMfr;