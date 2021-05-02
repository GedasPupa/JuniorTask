import React from 'react';
import TrackList from './TrackList';

class Results extends React.Component {
    render() {
        return (
            <div className="Results">
                <h2>Results</h2>
                <TrackList results={this.props.results}
                             onAdd={this.props.onAdd}
                             records={this.props.records} 

                         isRemoval={false} />
            </div>
        );
    }
}

export default Results;