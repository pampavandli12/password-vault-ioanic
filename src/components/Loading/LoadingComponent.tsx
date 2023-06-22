import { IonSpinner } from '@ionic/react';
import React from 'react';
import './LoadingComponent.css';

export const LoadingComponent = () => {
  return (
    <div id='loading-container'>
      <IonSpinner></IonSpinner>
    </div>
  );
};
