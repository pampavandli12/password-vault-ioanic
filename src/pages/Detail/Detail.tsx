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
import {
  arrowBackOutline,
  ellipsisVerticalOutline,
  menu,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Password, TEST_DATA } from '../../data';
import './Detail.css';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

export const Detail = () => {
  const [password, setPassword] = useState<Password | null>(null);
  const { id } = useParams<{ id: string }>();
  const [present] = useIonActionSheet();
  useEffect(() => {
    const filteredPassword = TEST_DATA.filter(
      (item: Password) => item.id === id
    );
    setPassword(filteredPassword[0]);
  }, [id]);
  const handleAction = (detail: OverlayEventDetail) => {
    console.log(detail);
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