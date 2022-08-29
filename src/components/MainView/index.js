import React from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash.chunk';
import Pagination from '../Pagination';
import './index.sass';

const MainView = (props) => {
  const { type, isLoading } = props;
  if (isLoading) return <div className="loader"></div>;

  return (
    <div>
      {
        type === 'album'
          ? <AlbumView {...props} />
          : <ArtistView {...props}/>
      }
    </div>
  );
};

MainView.propTypes = {
  albums: PropTypes.array,
  pageChunks: PropTypes.array,
  pageChunkIndex: PropTypes.number,
  changePageChunkIndex: PropTypes.func,
  chunkSize: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  defaultAlbums: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

const AlbumView = (props) => {
  const { params, chunkSize, defaultAlbums, albums, Card, location } = props;
  return (
    <div className="view">
      { !albums.length && location.pathname === '/albums' &&
        <Default origins={defaultAlbums} Card={Card} chunkSize={chunkSize}/>
      }
      
      { chunk(albums, chunkSize).map((chunk, index) =>
        <div key={index} className="album-chunk">
          { chunk.map((album, index) =>
            <Card key={index} {...album} />
          )}
        </div>
      )}

      {
        params.id && params.genre && albums.length ?
          <Pagination
            {...params}
            pageChunks={props.pageChunks}
            pageChunkIndex={props.pageChunkIndex}
            changePageChunkIndex={props.changePageChunkIndex}
            type='album'
            activePage={location.query.page}
          /> : null
      }
    </div>
  );
};

const ArtistView = (props) => {
  const { params, chunkSize, defaultArtists, artists, Card, location } = props;
  return (
    <div className="view">
      { !artists.length && location.pathname === '/artists' &&
        <Default origins={defaultArtists} Card={Card} chunkSize={chunkSize} />
      }
      
      { chunk(artists, chunkSize).map((chunk, index) =>
        <Row key={`row-chunk${index}`} chunk={chunk} Card={Card}/>
      )}

      {
        params.id && params.genre && artists.length ?
          <Pagination
            {...params}
            pageChunks={props.pageChunks}
            pageChunkIndex={props.pageChunkIndex}
            changePageChunkIndex={props.changePageChunkIndex}
            type='artist'
            activePage={location.query.page}
          /> : null
      }
    </div>
  );
};


const Default = ({ origins, Card, chunkSize }) => (
  <div>
    {
      Object.keys(origins).map((key, index) =>
        <DefaultCards
          key={`default-${index}`}
          title={origins[key].title || key}
          albums={origins[key].albums}
          artists={origins[key].artists}
          Card={Card}
          chunkSize={chunkSize}
          items={origins[key].items}
        />
        )
      }
  </div>
);

const DefaultCards = ({ title, albums, artists, Card, chunkSize, items }) => (
  <div className="view-cards">
    <div className="view-cards-title">
      <a href='#'>{title} <i className='ion-chevron-right'></i></a>
    </div>
    <div className="view-cards-row">
      { chunk(items, chunkSize).map((chunk, index) =>
        <Row key={`row-chunk${index}`} chunk={chunk} Card={Card}/>
      )}
    </div>
  </div>
);

const Row = ({ chunk, Card }) => (
  <div className="view-cards-row">
    {
      chunk.map((item, index) =>
        <Card key={`card-${index}`} {...item} />
      )
    }
  </div>
);

export default MainView;
