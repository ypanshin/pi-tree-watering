import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { appsOutline, appsSharp, cogOutline, cogSharp, informationOutline, informationSharp, logoGithub, readerOutline, readerSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Dashboard',
    url: 'dashboard',
    iosIcon: appsOutline,
    mdIcon: appsSharp
  },
  {
    title: 'Logs',
    url: 'logs',
    iosIcon: readerOutline,
    mdIcon: readerSharp
  },
  {
    title: 'Configuration',
    url: 'config',
    iosIcon: cogOutline,
    mdIcon: cogSharp
  },
];

const configPages: AppPage[] = [
  {
    title: 'About',
    url: 'about',
    iosIcon: informationOutline,
    mdIcon: informationSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>PI Tree Watering System</IonTitle>
          <IonButtons slot="end">
            <IonButton target="_blank" rel="noopener noreferrer" href="https://github.com/ypanshin/rpi-tree-watering">
              <IonIcon slot="icon-only" ios={logoGithub} md={logoGithub} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList>
          {configPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
