import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext } from 'react';
import { IAppContext, AppContext } from '../../AppContext';
import LastUpdated from '../../components/last-updated/LastUpdated';
import Logs from './components/Logs';
import Skeleton from './components/Skeleton';
import './Logs.css';

const LogsPage: React.FC = () => {

  const { loading, lastUpdated, log } = useContext<IAppContext>(AppContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Logs</IonTitle>
          <div slot="end">
            <LastUpdated lastUpdated={lastUpdated}></LastUpdated>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading ? <Skeleton></Skeleton> : <Logs logs={log?.logs}></Logs>}
      </IonContent>
    </IonPage>
  );
};

export default LogsPage;
