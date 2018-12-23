import React, { Component } from 'react';
import styled from 'styled-components';

import './app.css';
import AlbumNavigator from './album-navigator';
import AddAlbum from './add-album';

const Container = styled.div`
  margin-top: 100px;
`

class App extends Component {
  render() {
    return (
      <Container>
        <AlbumNavigator />
        <AddAlbum />
      </Container>
    );
  }
}

export default App;
