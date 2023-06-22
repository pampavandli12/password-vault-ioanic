import React from 'react';
import './EmptyContainer.css';

export const EmptyComponent = () => {
  return (
    <div id='empty-container'>
      <img src='/assets/empty.png' alt='' className='img' />
      <h3>No Passwords found</h3>
      <p className='info'>Please click on add button to create new Password</p>
    </div>
  );
};
