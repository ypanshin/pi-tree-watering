import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './About.css';

interface IState {
  markdown?: string;
}

const AboutPage: React.FC<IState> = () => {

  const [state, setState] = useState<IState>({});

  useEffect(() => {
    const loadMarkdown = async () => {
      let markdown = await fetch('https://raw.githubusercontent.com/ypanshin/pi-tree-watering/master/README.md')
        .then((response) => response.text());
      // Fix images paths
      markdown = markdown.replace('docs/', '');

      setState({ markdown });
    }

    loadMarkdown();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {!state.markdown ? <IonSkeletonText animated style={{ width: '100%' }} /> : <ReactMarkdown children={state.markdown as string}></ReactMarkdown>}
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;
