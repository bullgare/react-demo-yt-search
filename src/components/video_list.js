import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
  const videoItems = props.videos.map(video => {
    return <VideoListItem
      video={video}
      onSelect={props.onSelect}
      key={video.etag} />
  });
  return (
    <ul className='list-group'>
      {videoItems}
    </ul>
  );
}

export default VideoList;
