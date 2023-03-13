import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonToolbar,
  useIonActionSheet,
} from '@ionic/react';
import { arrowBackOutline, ellipsisVerticalOutline } from 'ionicons/icons';
import { useContext } from 'react';
import { storageContext } from '../../App';
import { Password } from '../../data';

import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './Detail.css';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

export const Detail = () => {
  const [password, setPassword] = useState<Password | null>(null);
  const store = useContext(storageContext);
  const { id } = useParams<{ id: string }>();
  const [present] = useIonActionSheet();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      if (store) {
        let dataList = await store.get('passwordList');
        const filteredPassword = dataList.filter(
          (item: Password) => item.id === id
        );
        setPassword(filteredPassword[0]);
      }
    })();
  }, [id, store]);
  const deleteHandler = async (id: string | undefined) => {
    if (store) {
      const passwordList = await store.get('passwordList');
      const newList =
        passwordList && passwordList.filter((item: Password) => item.id !== id);
      store.set('passwordList', newList);
      history.push('/home');
    } else {
      console.log('Something wrong, please try again');
    }
  };
  const editHandler = (id: string | undefined) => {
    console.log('edit ahs to be implemenetd later');
  };
  const handleAction = (detail: OverlayEventDetail) => {
    console.log(detail);
    switch (detail.data.action) {
      case 'delete':
        return deleteHandler(password?.id);
      case 'edit':
        return editHandler(password?.id);
      default:
        break;
    }
  };
  const openOptionSheet = () => {
    present({
      header: 'Choose Option',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Edit',
          data: {
            action: 'edit',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
      onDidDismiss: ({ detail }) => handleAction(detail),
    });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem
            lines='none'
            routerLink='/home'
            slot='start'
            routerDirection='root'
          >
            <IonIcon size='large' icon={arrowBackOutline}></IonIcon>
          </IonItem>

          <IonItem lines='none' slot='end' onClick={openOptionSheet}>
            <IonIcon size='large' icon={ellipsisVerticalOutline}></IonIcon>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='container-padding'>
        {password ? (
          <>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h1>{password.title}</h1>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>UserName: &nbsp; {password.userName}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Email: &nbsp; {password.email}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Password: &nbsp; {password.password}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>{password.notes}</IonLabel>
              </IonItem>
            </IonList>
          </>
        ) : (
          <IonSpinner></IonSpinner>
        )}
      </IonContent>
    </IonPage>
  );
};
