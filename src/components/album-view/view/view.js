import React, { Component } from 'react';

export default class AlbumView extends Component {
  componentDidUpdate(prevProps) {
    if(this.props.albumId !== prevProps.albumId) {
      this.props.fetchAlbumRequest();
    }
  }

  render() {
    const { albumDetails } = this.props;

    if(!albumDetails) {
      return (
        <div>Select an album</div>
      )
    }

    const { title, artist, coverUrl, comments } = albumDetails;

    return (
      <div>
        <h1>{title}</h1>
        <h4>by {artist}</h4>
        <img src={coverUrl} alt="Album cover"/>
        <ul>
          {comments && comments.map((comment, idx) => (
            <li key={idx}>{comment.title}</li> 
          ))}
        </ul>
      </div>
    )
  }
}

