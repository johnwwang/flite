import React from 'react';

export default function Dbtest (){
  return <div>
    <p>{process.env.TEST_ENV}</p>
  </div>
}