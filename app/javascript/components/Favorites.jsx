import React from 'react';
import TrackList from './TrackList';

class Favorites extends React.Component {
    // refresh(event) {
    //     event.preventDefault();
    //     this.props.history.push("/records");
    // }
    reload() {
        location.reload();
    }

    render() {
        return (
            <div className="Playlist">
                <h2>Favorites</h2>
                <TrackList results={this.props.results}
                               onM={this.props.onM} 
                           records={this.props.records} 
                         isRemoval={true} />
                <button className="btn custom-button" onClick={this.reload}>Refresh from DB!</button>
            </div>
        );
    }
}

export default Favorites;