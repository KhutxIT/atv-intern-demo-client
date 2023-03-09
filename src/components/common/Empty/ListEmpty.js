import React from 'react';
import './empty.scss';

function ListEmpty(props) {
  const { image, content, subContent } = props;
  return (
    <div className="list-empty-wrapper">
      <center>
        <div className="empty-image">{image}</div>
        <div className="empty-content font-size-20">{content}</div>
        <div className="empty-sub-content font-size-14">{subContent}</div>
      </center>
    </div>
  );
}
ListEmpty.defaultProps = {
  image: null,
  content: '',
  subContent: '',
};

export default ListEmpty;
