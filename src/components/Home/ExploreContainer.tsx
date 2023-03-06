import { IonItem, IonLabel, IonList, IonRippleEffect } from '@ionic/react';
import './ExploreContainer.css';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import { Password, TEST_DATA } from '../../data';
import { useContext, useEffect, useState } from 'react';
import { storageContext } from '../../App';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [passwordList, setPasswordList] = useState<Password[] | []>([]);
  const store = useContext(storageContext);
  useEffect(() => {
    (async () => {
      if (store) {
        const dataList = await store.get('passwordList');
        setPasswordList(dataList);
      }
    })();
  }, [store]);

  return (
    <div className='container'>
      <IonList lines='full'>
        {passwordList.map((item, index) => (
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
