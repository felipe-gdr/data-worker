import React, { Component } from 'react';
import styled from 'styled-components';

import AddReview from './add-review';
import Highlight from '../../common/highlight';

const Container = styled.div`
  width: 500px;
`;

const Reviews = styled.div`
  max-height: 100px;
  overflow: auto;
`;

const Cover = styled.div`
  height: 180px; 

  > img {
    max-height: 100%;
  }
`;

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
      <Container>
        <h1>{title}</h1>
        <h4>by {artist}</h4>
        <Cover>
          <img src={coverUrl} alt="Album cover"/>
        </Cover>
        <Reviews>
          {reviews && reviews.map((review) => (
            <Highlight key={review.id}>{review.title}</Highlight> 
          ))}
        </Reviews>
        <AddReview addReviewRequest={addReviewRequest} />
      </Container>
    )
  }
}

