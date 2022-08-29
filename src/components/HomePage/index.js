import React from 'react';
import PropTypes from 'prop-types';
import TrackList from './TrackList';
import Chart from '../Chart';
import Choices from './Choices';
import { Carousel } from 'react-responsive-carousel';
import LazyloadImage from '../LazyloadImage';

import './carousel.scss';
import './index.sass';

class ChartPanel extends React.Component {
  state = { activeChart: 'pop' };

  handleOnClick(alias) {
    this.props.changeActiveChart(alias);
    this.setState({ activeChart: alias });
  }

  render() {
    const list = [
      { alias: 'pop', title: 'Top 10 Billboard' },
      { alias: 'kpop', title: 'K-Pop Chart' },
      { alias: 'vpop', title: 'V-Pop Chart' },
    ];
    const { activeChart } = this.state;
    return (
      <div>
        <div className='chart-panel'>
          {list.map((item) => (
            <button
              key={item.alias}
              onClick={() => this.handleOnClick(item.alias)}
              className={`sc-ir ${
                activeChart === item.alias ? 'chart-panel-btn-active' : ''
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

const HomePage = (props) => (
  <div>
    <Carousel
      interval={5000}
      showStatus={false}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
    >
    {
      props.tracks.map((e, i) => 
      <div key={e}>
        <LazyloadImage src={e.thumbnail} className='home-banner track-thumb image-wrapper' />
        {/* <p className='home-banner-text'>{e.title}</p> */}
      </div>
    )}
    </Carousel>
    <div className='homepage home-container'>
      <div className='home-nav'>
        <Choices
          fetchTracks={props.fetchTracks}
          activeChoiceId={props.activeChoiceId}
        />
      </div>
      <TrackList {...props} />
      <div className='chart-wrapper'>
        <ChartPanel changeActiveChart={props.changeActiveChart} />
        <Chart chart={props.chart} user={props} />
      </div>
    </div>
  </div>
);

HomePage.propTypes = {
  tracks: PropTypes.array.isRequired,
  chart: PropTypes.object.isRequired,
  changeActiveChart: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  fetchTracks: PropTypes.func.isRequired,
  isFading: PropTypes.bool.isRequired,
  activeChoiceId: PropTypes.string,
};

export default HomePage;
