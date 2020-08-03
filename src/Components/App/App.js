import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from  '../../util/Spotify';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'Playlist',
      playlistTracks: []
    };

    this.toggleTrack = this.toggleTrack.bind(this);
    this.isInPlaylist = this.isInPlaylist.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  isInPlaylist(track) {
    return this.state.playlistTracks.some(x => x.id === track.id);
  }

  toggleTrack(track) {
    const tempPlaylist =this.state.playlistTracks

    //Adds to playlist if not currently in the list
    if (!this.isInPlaylist(track)) {
      tempPlaylist.push(track)
    } else {
      //Finds the index with the ID and removes it from the array
      tempPlaylist.splice(tempPlaylist.findIndex(x => {
        return x.id === track.id;
      }), 1);
    }

    this.setState(tempPlaylist)
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => {
      return track.uri;
    });

    Spotify.savePlaylist(this.state.playlistName, trackURIs,
                         Spotify.getAccessToken(), this.state.userid);
  }

  search(query) {
    Spotify.search(query, Spotify.getAccessToken())
    .then((tracks) => {
      this.setState({
        searchResults: tracks
      });
    });
  }

  render() {
    Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <span>Note: Save Functionalty still not enabled</span>
        <div className="App">
          <SearchBar
            onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.toggleTrack}
              inPlaylist={this.isInPlaylist}/>

            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onAdd={this.toggleTrack}
              inPlaylist={this.isInPlaylist}
              updateName={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
