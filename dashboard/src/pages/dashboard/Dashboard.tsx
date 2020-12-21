import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext } from 'react';
import { AppContext, IAppContext } from '../../AppContext';
import LastUpdated from '../../components/last-updated/LastUpdated';
import RunTime from './components/RunTime';
import Skeleton from './components/Skeleton';
import SystemRunTime from './components/SystemRunTime';
import TransferredWater from './components/TransferredWater';
import './Dashboard.css';

const DashboardPage: React.FC = () => {

  const { loading, lastUpdated, log } = useContext<IAppContext>(AppContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
          <div slot="end">
            <LastUpdated lastUpdated={lastUpdated}></LastUpdated>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>The pump run time</IonCardSubtitle>
            <IonCardTitle>Pump Run</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {loading ? <Skeleton></Skeleton> : <RunTime onTime={log?.onTime}></RunTime>}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>The water transferred</IonCardSubtitle>
            <IonCardTitle>Water</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {loading ? <Skeleton></Skeleton> : <TransferredWater onTime={log?.onTime} pumpFlow={log?.config?.pumpFlow}></TransferredWater>}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>The system runs for</IonCardSubtitle>
            <IonCardTitle>Run Hours</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {loading ? <Skeleton></Skeleton> : <SystemRunTime startDate={log?.startDate}></SystemRunTime>}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default DashboardPage;
