import React, { Component } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  margin: auto;

  fieldset {
    margin-bottom: 10px;

    label {
      margin-right: 10px;
    }

    input {
      width: 200px;
    }
  }
`

export default class AddAlbum extends Component {

  handleClickAdd = () => {
    const { addAlbumRequest } = this.props;

    addAlbumRequest({});
  }

  render() {
    return (
      <Container>
        <h1>Add Album</h1>

        <fieldset>
          <label htmlFor="title">Title</label>
          <input id="title" />
        </fieldset>
        <fieldset>
          <label htmlFor="artist">Artist</label>
          <input id="artist" />
        </fieldset>
        <fieldset>
          <label htmlFor="coverImage">Cover Image</label>
          <input id="coverImage" placeholder="URL" />
        </fieldset>
        <button type="submit" onClick={this.handleClickAdd}>Add</button>
      </Container>
    )
  }
}
