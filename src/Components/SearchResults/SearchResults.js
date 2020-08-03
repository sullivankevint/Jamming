import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {

  render() {
    // console.log(this.props.searchResults);
    // console.log(typeof this.props.searchResults);
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          tracks={this.props.searchResults}
          isRemoval={false}
          onAdd={this.props.onAdd}
          inPlaylist={this.props.inPlaylist}/>
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResults: PropTypes.array,
  onAdd: PropTypes.func,
  inPlaylist: PropTypes.func
};

export default SearchResults;
