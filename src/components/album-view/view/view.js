import React, { Component } from 'react';

import AddReview from './add-review';
import Highlight from '../../common/highlight';

export default class AlbumView extends Component {
  componentDidUpdate(prevProps) {
    if(this.props.albumId !== prevProps.albumId) {
      this.props.fetchAlbumRequest();
    }
  }

  render() {
    const { albumDetails, addReviewRequest } = this.props;

    if(!albumDetails) {
      return (
        <div>Select an album</div>
      )
    }

    const { title, artist, coverUrl, reviews } = albumDetails;

    return (
      <div>
        <h1>{title}</h1>
        <h4>by {artist}</h4>
        <img src={coverUrl} alt="Album cover"/>
        <div>
          {reviews && reviews.map((review) => (
            <Highlight key={review.id}>{review.title}</Highlight> 
          ))}
        </div>
        <AddReview addReviewRequest={addReviewRequest} />
      </div>
    )
  }
}

