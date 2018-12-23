import React, { Component } from 'react';
import styled from 'styled-components';

import AlbumCard from './album';
import AlbumView from '../../album-view';

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 900px;
  margin: auto;
`;

export default class AlbumNavigator extends Component {
  constructor(props) {
    super(props);

    props.fetchAlbumsRequest();
  }

  render() {
    const { albums, selectedAlbum, selectAlbum } = this.props;

    return (
      <Container>
        <List>
          {albums.map(album => (
            <AlbumCard key={album.id} {...album} onClick={selectAlbum} />
          ))}
        </List>
        <AlbumView albumId={selectedAlbum}/>
      </Container>
    )
  }
}


