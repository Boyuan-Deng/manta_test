import React from 'react';


const Block = ({ blockHeader }) => {  
  return (
    <div id={blockHeader.hash}>
      <div>{`Block Number: ${blockHeader.number}`}</div>
      <div>{`Block Hash: ${blockHeader.hash}`}</div>
    </div>
  );
};

export default Block;