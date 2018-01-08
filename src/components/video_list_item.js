import React from 'react';

const VideoListItem = (props) => {
  const video = props.video.snippet;
  const onSelect = props.onSelect || (() => {});
  return (
    <li className='list-group-item' onClick={() => onSelect(props.video)}>
      <div className='video-list media'>
        <div className='media-left'>
          <img className='media-object' src={video.thumbnails.default.url} />
        </div>

        <div className='media-body'>
          <div className='media-body'>
            {video.title}
          </div>
        </div>
      </div>
    </li>
  );
}

export default VideoListItem;
