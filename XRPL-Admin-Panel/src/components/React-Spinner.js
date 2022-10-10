import React from 'react';
import { Puff } from 'react-loader-spinner';

function ReactSpinner() {
  return (
    <Puff
      height="70"
      width="70"
      radisu={1}
      color="#2065D1"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      // cssOverride={{ display: 'block', margin: 'auto', justifyContent: 'center' }}
      visible={true}
    />
  );
}

export default ReactSpinner;
