import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import Pager from './components/pager';
import ScrollDetector from './components/scroll_detector';
import YTSearch from './helpers/youtube_api_search';

const API_KEY = 'AIzaSyAbOvSXn4Xp17ZAwq6Rz4VIQFBNaL3V1DM';
const MAX_RESULTS = 3;
const DEFAULT_TERM = 'angular vs react';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      nextPageToken: null,
      prevPageToken: null,
      lastTerm: '',
      clickedOutside: false
    };
    this.search(DEFAULT_TERM, null, () => {
      this.onItemSelect(this.state.videos[0]);
    });

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  render() {
    const videoSearch = _.debounce(term => this.search(term), 500);

    return (
      <div ref="wrapperElement" style={this.generateStyles()}>
        <SearchBar
          term={DEFAULT_TERM}
          onTermChange={videoSearch}
          onForceSearch={term => this.search(term)} />

        <VideoDetail video={this.state.selectedVideo}/>

        <div className='col-md-4'>
          <div className='row'>
            <Pager
              nextPageToken={this.state.nextPageToken}
              prevPageToken={this.state.prevPageToken}
              searchCb={pageToken => this.search(this.state.lastTerm, pageToken)} />
          </div>

          <VideoList videos={this.state.videos} onSelect={(video) => this.onItemSelect(video)} />

          <ScrollDetector/>
        </div>
      </div>
    );
  }

  search(term, pageToken, cb) {
    YTSearch({key: API_KEY, term, maxResults: MAX_RESULTS, pageToken}, data => {
      const videos = data.items || [];
      this.setState({videos});
      this.setState({nextPageToken: data.nextPageToken, prevPageToken: data.prevPageToken, lastTerm: term});
      if (cb) {
        cb();
      }
    });
  }

  onItemSelect(selectedVideo) {
    this.setState({selectedVideo});
  }

  timer = null;

  handleOutsideClick(e) {
    this.setState({ clickedOutside: this.checkIsOutside(e.target) });
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.setState({clickedOutside: false});
      this.timer = null;
    }, 1000);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  generateStyles() {
    if (this.state.clickedOutside) {
      return { backgroundColor: 'red' };
    }

    return {};
  }

  checkIsOutside(node) {
    while (node) {
      if (node === this.refs.wrapperElement) {
        return false;
      }
      node = node.parentNode;
    }

    return true;
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
