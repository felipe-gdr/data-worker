import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  padding: 10px;
`;

export default class AddReview extends Component {
  state = {
    text: '',
    rating: '',
  }

  handleSubmit = () => {
    const { addReviewRequest } = this.props;
    const { text, rating } = this.state;

    addReviewRequest({ title: text, rating });
  }

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  }

  handleRatingChange = e => {
    this.setState({ rating: Number(e.target.value) });
  }

  render() {
    const { text, rating } = this.state;

    return (
      <Container>
        <div>
          <textarea placeholder="Add review" onChange={this.handleTextChange} value={text} />
        </div>
        <div>
          <select value={rating} onChange={this.handleRatingChange} >
            <option value=''>-</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </Container>
    )
  }
}
