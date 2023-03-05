import { IonItem, IonLabel, IonList, IonRippleEffect } from '@ionic/react';
import './ExploreContainer.css';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import { TEST_DATA } from '../../data';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className='container'>
      <IonList lines='full'>
        {TEST_DATA.map((item, index) => (
          <IonItem
            key={index}
            className='ion-activatable ripple-parent rectangle'
            routerLink={`/detail/${item.id}`}
          >
            <IonLabel>{item.title}</IonLabel>
            <IonRippleEffect></IonRippleEffect>
          </IonItem>
        ))}
      </IonList>
      <IonFab className='floating-button'>
        <IonFabButton routerLink='/create'>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </div>
  );
};

export default ExploreContainer;
