import React from 'react';
import { IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';
import './Skeleton.css';

const Skeleton: React.FC = () => {
    return (
        <IonList>
            <IonItem>
                <div className="note" slot="start">
                    <IonSkeletonText animated />
                </div>
                <IonLabel>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                </IonLabel>
                <div className="note" slot="end">
                    <IonSkeletonText animated />
                </div>
            </IonItem>
            <IonItem>
                <div className="note" slot="start">
                    <IonSkeletonText animated />
                </div>
                <IonLabel>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                </IonLabel>
                <div className="note" slot="end">
                    <IonSkeletonText animated />
                </div>
            </IonItem>
            <IonItem>
                <div className="note" slot="start">
                    <IonSkeletonText animated />
                </div>
                <IonLabel>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                </IonLabel>
                <div className="note" slot="end">
                    <IonSkeletonText animated />
                </div>
            </IonItem>
        </IonList>
    );
}

export default Skeleton;
