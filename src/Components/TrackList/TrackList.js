import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {

  render() {
    if(this.props.tracks) {
      return(
        <div className="TrackList">
            {this.props.tracks.map((track) => {
              return (
                <Track
                  track={track}
                  onAdd={this.props.onAdd}
                  isRemoval={this.props.inPlaylist(track)}
                  key={track.id}/>
              );
            })}
        </div>
      );
    } else {
      return(
        <div className="TrackList">
        </div>
      );
    }
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array,
  onAdd: PropTypes.func,
  inPlaylist: PropTypes.func
};

export default TrackList;
