import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Menu from './components/Menu/Menu';
import Home from './pages/Home/Home';
import { Form } from './pages/Form/Form';
import { Detail } from './pages/Detail/Detail';
import React, { useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';

setupIonicReact();
export const storageContext = React.createContext<Storage | null>(null);
const App: React.FC = () => {
  const [storageAPI, setStorageAPI] = useState<Storage | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const store = new Storage();
        const storage = await store.create();
        setStorageAPI(storage);
      } catch (error) {
        console.log('Something wrong, not able to set storage');
      }
    })();
  }, [storageAPI]);

  return (
    <storageContext.Provider value={storageAPI}>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId='main'>
            <Menu />
            <IonRouterOutlet id='main'>
              <Route path='/' exact={true}>
                <Redirect to='/home' />
              </Route>
              <Route path='/home' exact={true}>
                <Home />
              </Route>
              <Route exact={true} path='/edit/:id'>
                <Form />
              </Route>
              <Route exact={true} path='/create'>
                <Form />
              </Route>
              <Route exact={true} path='/edit/:id'>
                <Form />
              </Route>
              <Route exact={true} path='/detail/:id'>
                <Detail />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </storageContext.Provider>
  );
};

export default App;
