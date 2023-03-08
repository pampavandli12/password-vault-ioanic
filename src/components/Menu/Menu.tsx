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
  const readFile = async () => {
    const contents = await Filesystem.readFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    console.log('secrets:', contents);
  };
  const handleFileRead = async (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    const config = {
      delimiter: '', // auto-detect
      newline: '', // auto-detect
      quoteChar: '"',
      escapeChar: '"',
      header: false,
      transformHeader: undefined,
      dynamicTyping: false,
      preview: 0,
      encoding: '',
      worker: false,
      comments: false,
      step: undefined,
      complete: undefined,
      error: undefined,
      download: false,
      downloadRequestHeaders: undefined,
      downloadRequestBody: undefined,
      skipEmptyLines: false,
      chunk: undefined,
      chunkSize: undefined,
      fastMode: undefined,
      beforeFirstChunk: undefined,
      withCredentials: undefined,
      transform: undefined,
      delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
    };
    try {
      const fileContent = await Papa.parse(file);
      console.log(fileContent);
    } catch (error) {
      console.log(error);
    }
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
      //   console.log(csvFile);
      //   let blob = new Blob([csvFile]);
      //   let a = window.document.createElement('a');
      //   a.href = window.URL.createObjectURL(blob);
      //   a.download = 'testCSV.csv';
      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
      // }
    }
  };
  const importHandler = async (): Promise<void> => {
    // let dataList = await store.get('passwordList');
    // dataList = dataList ? [...dataList, data] : [data];
    // await store.set('passwordList', dataList);
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
