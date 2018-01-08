import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
const API_KEY = 'AIzaSyBAr82rpRLx5WeqqwE4Di5DPv4W7gqb9qo';
const DEFAULT_TERM = 'surfboards';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {videos: [], selectedVideo: null};
    this.search(DEFAULT_TERM, () => {
      this.onItemSelect(this.state.videos[0]);
    });
  }

  render() {
    const videoSearch = _.debounce(term => this.search(term), 5000)

    return (
      <div>
        <SearchBar
          term={DEFAULT_TERM}
          onTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList videos={this.state.videos} onSelect={(video) => this.onItemSelect(video)} />
      </div>
    );
  }

  search(term, cb) {
    YTSearch({key: API_KEY, term}, data => {
      const videos = data || [];
      this.setState({videos});
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
