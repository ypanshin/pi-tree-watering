import Menu from './components/Menu';
import DashboardPage from './pages/dashboard/Dashboard';
import LogsPage from './pages/logs/Logs';
import AboutPage from './pages/about/About';
import ConfigPage from './pages/config/Config';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
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
import { AppContextProvider } from './AppContext';

const App: React.FC = () => {

  return (
    <IonApp>
      <AppContextProvider>
        <IonReactHashRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/dashboard" component={DashboardPage} exact />
              <Route path="/logs" component={LogsPage} exact />
              <Route path="/config" component={ConfigPage} exact />
              <Route path="/about" component={AboutPage} exact />
              <Redirect from="/" to="/dashboard" exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactHashRouter>
      </AppContextProvider>
    </IonApp>
  );
};

export default App;
