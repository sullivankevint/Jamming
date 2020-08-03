import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updateName(e.target.value);
  }

  handleSave(e) {}

  render() {
    return(
      <div className="Playlist">
        <input
          defaultValue={this.props.playlistName}
          onChange={this.handleChange}/>
        <TrackList
          tracks={this.props.playlistTracks}
          onAdd={this.props.onAdd}
          inPlaylist={this.props.inPlaylist}/>
        <button
          className="Playlist-save"
          onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

Playlist.propTypes = {
  playlistName: PropTypes.string.isRequired,
  playlistTracks: PropTypes.array.isRequired,
  onAdd: PropTypes.func,
  inPlaylist: PropTypes.func,
  updateName: PropTypes.func,
  onSave: PropTypes.func
};

export default Playlist;
