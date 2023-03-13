import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
} from '@ionic/react';

import { documentOutline } from 'ionicons/icons';
import './Menu.css';
import { useContext, useRef } from 'react';
import { storageContext } from '../../App';
import Papa, { UnparseConfig } from 'papaparse';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const Menu: React.FC = () => {
  const store = useContext(storageContext);
  const fileReaderInput = useRef(null);

  const writeFile = async (csvFile: any) => {
    try {
      await Filesystem.writeFile({
        path: '/Passwords/passwordlist.csv',
        data: csvFile,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
        recursive: true,
      });
      console.log('file has been downloaded');
    } catch (error) {
      console.log(error);
    }
  };
  // @ts-ignore: next-line
  const readFile = async ({ data }) => {
    console.log('This is file data', data);
    if (store) {
      try {
        let PasswordList = await store?.get('passwordList');
        PasswordList = PasswordList ? [...PasswordList, ...data] : [...data];
        await store.set('passwordList', PasswordList);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Something wrong, please try again later');
    }
  };
  const handleFileRead = async (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    const fileContent = Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: readFile,
    });
  };
  const exportHandler = async (): Promise<void> => {
    if (store) {
      const config: UnparseConfig = { quotes: false };
      let dataList = await store.get('passwordList');
      const fields = Object.keys(dataList[0]);
      const data: any[] = [];
      dataList.forEach((element: any) => {
        const dataField = [];
        for (let index = 0; index < fields.length; index++) {
          dataField.push(element[fields[index]]);
        }
        data.push(dataField);
      });
      const csvFile = Papa.unparse({ fields: fields, data: data }, config);
      writeFile(csvFile);
    }
  };
  const importHandler = async (): Promise<void> => {
    // @ts-ignore: next-line
    fileReaderInput.current.click();
  };
  return (
    <IonMenu contentId='main' type='overlay'>
      <IonContent>
        <IonList id='labels-list'>
          <IonItem lines='none' onClick={exportHandler}>
            <IonIcon slot='start' icon={documentOutline} />
            <IonLabel>Export to csv</IonLabel>
          </IonItem>
          <IonItem lines='none' onClick={importHandler}>
            <IonIcon slot='start' icon={documentOutline} />
            <input
              type='file'
              hidden
              ref={fileReaderInput}
              accept='.csv'
              onChange={(event) => handleFileRead(event)}
            />
            <IonLabel>Import from csv</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
