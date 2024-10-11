import React from 'react';

const Title = (props) => {
  const { txt } = props;
  if (!txt) {
    return null;
  }
  return (<div className="common-title">{txt}</div>
  );
};

export default Title;
