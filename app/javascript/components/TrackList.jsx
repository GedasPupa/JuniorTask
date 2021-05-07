import React from 'react';
import Track from './Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.results.map(mfr => {
                        return <Track mfr={mfr} 
                                      key={mfr.Mfr_ID}
                                  favorites={this.props.favorites}
                                    onAdd={this.props.onAdd}
                                      onM={this.props.onM}
                                isRemoval={this.props.isRemoval} />
                    })
                }
            </div>
        );
    }
}

export default TrackList;