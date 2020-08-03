import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };

    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchTerm)
  }

  handleChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    return(
      <div className="SearchBar">
        <input
          onChange={this.handleChange}
          placeholder="Enter A Song, Album, or Artist" />
        <button
          onClick={this.search}
          className="SearchButton">SEARCH</button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
};
export default SearchBar;
