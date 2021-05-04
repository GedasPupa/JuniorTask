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
            const exist = this.props.records.find(el => el.Mfr_ID == this.props.mfr.Mfr_ID);
            if (exist !== undefined) {
                return (
                    <div>
                    <button className='Track-action Red' id={this.props.mfr.id} onClick={this.deleteFromDB}>Delete from DB!</button>
                    <Link to={`/records/${this.props.mfr.id}/edit`}>RENAME</Link>
                    <button className='Track-action' onClick={this.deleteFromFavorites}>-</button>
                    </div>
                )
            } else {
                return (
                    <div>
                    <button className='Track-action BlueL' name={this.props.mfr.Mfr_Name} id={this.props.mfr.Mfr_ID} onClick={this.createRec}>SAVE TO DB!</button>
                    <button className='Track-action' onClick={this.deleteFromFavorites}>-</button>
                    </div> 
                )
            }
        } else {
            return (
                <div>
                <span className="Track-span">Manufacturer ID: {this.props.mfr.Mfr_ID}</span>
                <button className='Track-action' onClick={this.addToFavorites}>+</button>                
                </div>
           )
        }
    }
    
    addToFavorites() {
        this.props.onAdd(this.props.mfr);
    }

    deleteFromFavorites() {
        this.props.onM(this.props.mfr);
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
        console.log(body1);
        console.log(JSON.stringify(body1));
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
        .then(response => alert(`Record id: ${response.id} addded!`))
        .catch(error => console.log(error.message));
    }

    deleteFromDB(event){
        const id = event.target.id;
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
            // this.props.history.push("/records");
        })
        .catch(error => console.log(error.message));
    }
    // moved to --> Edit
    // rename(event) {
    //     const id = event.target.id;
    //     const mfr_name = event.target.name;
    //     console.log(id); // test
    //     console.log(mfr_name); // test
    //     const url = `/api/v1/${id}/edit`;
    //     if (mfr_name.length == 0)
    //     return;
    //     const body1 = {mfr_name};             
    //     const token = document.querySelector('meta[name="csrf-token"]').content;
    //     fetch(url, {
    //     method: "PUT",
    //     headers: {
    //         "X-CSRF-Token": token,
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body1)
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //         return response.json();
    //         }
    //         throw new Error("Network response was not ok.");
    //     })
    //     .then(response => this.props.history.push(`/record/${response.id}`))
    //     .catch(error => console.log(error.message));
    // }

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