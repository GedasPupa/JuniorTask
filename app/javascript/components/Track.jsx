import React from 'react';
import { Link } from "react-router-dom";

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.addToFavorites = this.addToFavorites.bind(this);
        this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    }

    renderAction() {   
        if (this.props.isRemoval) {
            return (
                <div>
                <button className='Track-action Red' id={this.props.mfr.id} onClick={this.deleteFromFavorites}>Delete from DB!</button>
                <Link to={`/records/${this.props.mfr.id}/edit`}>RENAME</Link>
                <button className='Track-action' onClick={this.deleteFromFavorites}>-</button>
                </div>
            )
        } else {
            return (
                <div>
                <span className="Track-span">Manufacturer ID: {this.props.mfr.Mfr_ID}</span>
                <button className='Track-action' name={this.props.mfr.Mfr_Name} id={this.props.mfr.Mfr_ID} onClick={this.addToFavorites}>+</button>                
                </div>
            )
        }
    }

    createRec(event) {
        const mfr_id = event.target.id;
        const mfr_name = event.target.name;
        console.log(mfr_id);
        const url = "/api/v1/records/create";
        let body1 = {
            Mfr_Name: mfr_name,
            Mfr_ID: mfr_id
        };             
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
            },
        body: JSON.stringify(body1)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        }).then(response => { 
            alert(`Record id: ${response.id} addded!`);
            // const aha = response.id;
            const newMfrID = this.props.mfr;
            newMfrID.id = response.id;
            this.props.onAdd(newMfrID);
        })
        .catch(error => console.log(error.message));
    }

    deleteFromDB(event){
        let id = event.target.id;
        console.log(id);
        const url = `/api/v1/destroy/${id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
    
        fetch(url, {
        method: "DELETE",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        }
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error("Network response was not ook.");
        })
        .then(() => { 
            alert("Record deleted from DB!");
        })
        .catch(error => console.log(error.message));
    }

    addToFavorites(event) {
        let favors = this.props.favorites;
        // console.log(favors);
        let exist = favors.find(el => el.Mfr_ID == this.props.mfr.Mfr_ID);
        // console.log(exist);
        if (exist) {
            alert(`Manufacturer ${this.props.mfr.Mfr_Name} already on a Favorites list!`);
            return;
        } else {
            this.createRec(event);
        }
    }

    deleteFromFavorites(event) {
        this.props.onM(this.props.mfr);
        this.deleteFromDB(event);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.mfr.Mfr_Name}</h3>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;