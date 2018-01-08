import React from 'react';

const Pager = (props) => {
  const links = [];

  if (props.prevPageToken) {
    links.push(<div className="pager-link pager-link-prev" key="prev" onClick={() => props.searchCb(props.prevPageToken)}>&larr;</div>);
  }
  if (props.nextPageToken) {
    links.push(<div className="pager-link pager-link-next" key="next" onClick={() => props.searchCb(props.nextPageToken)}>&rarr;</div>);
  }

  return (
    <div className='col-sm-12'>
      {links}
    </div>
  );
}

export default Pager;
