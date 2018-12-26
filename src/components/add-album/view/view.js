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
  state = {
    title: '',
    artist: '',
    coverUrl: '',
  }

  handleClickAdd = () => {
    const { addAlbumRequest } = this.props;

    addAlbumRequest(this.state);
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value});
  }

  handleChangeArtist = e => {
    this.setState({ artist: e.target.value});
  }

  handleChangeCoverUrl = e => {
    this.setState({ coverUrl: e.target.value});
  }

  render() {
    return (
      <Container>
        <h1>Add Album</h1>

        <fieldset>
          <label htmlFor="title">Title</label>
          <input id="title" onChange={this.handleChangeTitle} />
        </fieldset>
        <fieldset>
          <label htmlFor="artist">Artist</label>
          <input id="artist" onChange={this.handleChangeArtist} />
        </fieldset>
        <fieldset>
          <label htmlFor="coverUrl">Cover Image</label>
          <input id="coverUrl" placeholder="URL" onChange={this.handleChangeCoverUrl} />
        </fieldset>
        <button type="submit" onClick={this.handleClickAdd}>Add</button>
      </Container>
    )
  }
}
