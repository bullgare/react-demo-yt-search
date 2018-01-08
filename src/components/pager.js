import React from 'react';

const Pager = (props) => {
  const links = [];

  if (props.prevPageToken) {
    links.push(<div className="pager-link col-sm-6" key="prev" onClick={() => props.searchCb(props.prevPageToken)}>&larr;</div>);
  }
  if (props.nextPageToken) {
    links.push(<div className="pager-link col-sm-6" key="next" onClick={() => props.searchCb(props.nextPageToken)}>&rarr;</div>);
  }

  return (
    <div className='col-sm-12'>
      {links}
    </div>
  );
}

export default Pager;
