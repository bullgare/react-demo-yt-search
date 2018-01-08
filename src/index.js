import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import Pager from './components/pager';
import YTSearch from './helpers/youtube_api_search';
import _ from 'lodash';
const API_KEY = 'AIzaSyAbOvSXn4Xp17ZAwq6Rz4VIQFBNaL3V1DM';
const MAX_RESULTS = 3;
const DEFAULT_TERM = 'surfboards';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {videos: [], selectedVideo: null, nextPageToken: null, prevPageToken: null, lastTerm: ''};
    this.search(DEFAULT_TERM, null, () => {
      this.onItemSelect(this.state.videos[0]);
    });
  }

  render() {
    const videoSearch = _.debounce(term => this.search(term), 500)

    return (
      <div>
        <SearchBar
          term={DEFAULT_TERM}
          onTermChange={videoSearch}
          onForceSearch={term => this.search(term)} />

        <VideoDetail video={this.state.selectedVideo}/>

        <div className='col-md-4'>
          <VideoList videos={this.state.videos} onSelect={(video) => this.onItemSelect(video)} />

          <Pager
            nextPageToken={this.state.nextPageToken}
            prevPageToken={this.state.prevPageToken}
            searchCb={pageToken => this.search(this.state.lastTerm, pageToken)} />
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
}

ReactDOM.render(<App />, document.querySelector('.container'));
