import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRippleEffect,
  IonToolbar,
} from '@ionic/react';
import {
  arrowBackOutline,
  checkmarkOutline,
  eyeOffOutline,
  eyeOutline,
  syncOutline,
} from 'ionicons/icons';
import './Form.css';
import { generateString, generateUniqueID } from '../../utils/utils';
import { useContext } from 'react';
import { storageContext } from '../../App';
import { Password } from '../../data';
import { useHistory } from 'react-router-dom';

export const Form = () => {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');
  const [website, setWebsite] = useState('');
  const store = useContext(storageContext);
  const history = useHistory();

  const handleTitle = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    setTitle(value);
  };
  const handleWebsite = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    setWebsite(value);
  };
  const handleUsername = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    setUsername(value);
  };
  const handlePassword = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    setPassword(value);
  };
  const handleEmail = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    setEmail(value);
  };
  const handleNotes = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    setNote(value);
  };
  const onsubmit = async () => {
    if (title && email && password) {
      const data: Password = {
        id: generateUniqueID(),
        title,
        website,
        userName: username,
        email,
        password,
        notes: note,
      };
      try {
        if (store) {
          let dataList = await store.get('passwordList');
          dataList = dataList ? [...dataList, data] : [data];
          await store.set('passwordList', dataList);
          history.push(`/home/`);
        } else {
          console.log('store is null');
        }
      } catch (error) {
        console.log('Something wrong, not able to save', error);
      }
    } else {
      console.log('Enter the values properly');
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem
            lines='none'
            routerLink='/home'
            routerDirection='root'
            slot='start'
          >
            <IonIcon size='large' icon={arrowBackOutline}></IonIcon>
          </IonItem>
          <IonItem lines='none' slot='end' onClick={() => onsubmit()}>
            <IonIcon size='large' icon={checkmarkOutline}></IonIcon>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position='floating'>Title</IonLabel>
          <IonInput
            onIonInput={handleTitle}
            placeholder='Enter title'
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Website</IonLabel>
          <IonInput
            onIonInput={handleWebsite}
            placeholder='Enter website'
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Username</IonLabel>
          <IonInput
            onIonInput={handleUsername}
            placeholder='Enter username'
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Email</IonLabel>
          <IonInput
            onIonInput={handleEmail}
            placeholder='Enter email'
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Password</IonLabel>
          <IonInput
            placeholder='Enter password'
            type={showPassword ? 'text' : 'password'}
            onIonInput={handlePassword}
          ></IonInput>
          {showPassword ? (
            <IonIcon
              onClick={() => setshowPassword(!showPassword)}
              slot='end'
              icon={eyeOutline}
            ></IonIcon>
          ) : (
            <IonIcon
              onClick={() => setshowPassword(!showPassword)}
              slot='end'
              icon={eyeOffOutline}
            ></IonIcon>
          )}
        </IonItem>
        <div
          className='ion-activatable ripple-parent rectangle generate-password'
          onClick={() => generateString(10)}
        >
          <IonRippleEffect></IonRippleEffect>
          Generate Password &nbsp;<IonIcon icon={syncOutline}></IonIcon>
        </div>

        <IonItem>
          <IonLabel position='floating'>Notes</IonLabel>
          <IonInput
            onIonInput={handleNotes}
            placeholder='Enter notes'
          ></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
