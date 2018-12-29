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

  toggleFavorite = album  => {
    const { markAsFavorite, unmarkAsFavorite } = this.props;

    if(album.isFavorite) {
      unmarkAsFavorite({ albumId: album.id });
    } else {
      markAsFavorite({ albumId: album.id });
    }
  }

  render() {
    const { albums, selectedAlbum, selectAlbum } = this.props;

    return (
      <Container>
        <List>
          {albums.map(album => (
            <div key={album.id}>
              <AlbumCard {...album} onClick={selectAlbum} />
              <button onClick={() => this.toggleFavorite(album)}>favorite {album.isFavorite ? '*' : ''}</button>
            </div>
          ))}
        </List>
        <AlbumView albumId={selectedAlbum}/>
      </Container>
    )
  }
}


