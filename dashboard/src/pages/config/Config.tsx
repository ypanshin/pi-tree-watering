import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext } from 'react';
import { AppContext, IAppContext } from '../../AppContext';
import Skeleton from '../dashboard/components/Skeleton';
import './Config.css';

const ConfigPage: React.FC = () => {
  const { loading, log } = useContext<IAppContext>(AppContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Configuration</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <h2>Moisture Sensor Pin</h2>
              <p>The pin number that the moisture sensor connected to.</p>
            </IonLabel>
            <div className="note" slot="end">{loading ? <Skeleton></Skeleton> : log?.config.sensorPin}</div>
          </IonItem>
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <h2>Relay GPIO</h2>
              <p>The GPIO number that the relay connected to.</p>
            </IonLabel>
            <div className="note" slot="end">{loading ? <Skeleton></Skeleton> : log?.config.relayGpio}</div>
          </IonItem>
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <h2>On Interval</h2>
              <p>The interval to check the moisture sensor when relay is on.</p>
            </IonLabel>
            <div className="note" slot="end">{loading ? <Skeleton></Skeleton> : `${log?.config.onInterval} ms`}</div>
          </IonItem>
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <h2>Off Interval</h2>
              <p>The interval to check the moisture sensor when relay is off.</p>
            </IonLabel>
            <div className="note" slot="end">{loading ? <Skeleton></Skeleton> : `${log?.config.offInterval} ms`}</div>
          </IonItem>
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <h2>Pump Flow</h2>
              <p>The pump flow.</p>
            </IonLabel>
            <div className="note" slot="end">{loading ? <Skeleton></Skeleton> : `${log?.config.pumpFlow} l/min`}</div>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ConfigPage;
