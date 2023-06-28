
import React from 'react';

const renderCustomLink = ({ source, target, path, linkDatum }: any) => {
  const linkStyles = {
    stroke: linkDatum.target.data.collapsed ? 'red' : '#999',
    strokeWidth: 2,
    fill: 'none',
    strokeDasharray: linkDatum.target.data.collapsed ? '2 2' : '5 5',
    projection: 'diagonal', // Add the projection property here
  };

  return (
    <g>
      <path d={path({ source, target })} style={linkStyles} />
    </g>
  );
};

export default renderCustomLink;