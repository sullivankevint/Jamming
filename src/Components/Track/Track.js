import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';

class Track extends React.Component {

  constructor(props) {
    super(props);

    this.toggleTrack = this.toggleTrack.bind(this);
  }

  toggleTrack() {
    this.props.onAdd(this.props.track);
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <button
          className="Track-action"
          onClick={this.toggleTrack}>
          {this.props.isRemoval ? '-' : '+'}</button>
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
  isRemoval: PropTypes.bool,
  onAdd: PropTypes.func
};

export default Track;
