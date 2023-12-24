import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { IError } from '../../model/error';

interface IState {
    showBoxIdForm: boolean;
    storageParameter?: string;
}

interface IProps {
    storageParameter?: string;
    error?: IError;
    onSave: (boxId: string) => void
}

const StorageParameterDialog: React.FC<IProps> = ({ storageParameter, error, onSave }) => {
    const [state, setState] = useState<IState>({ showBoxIdForm: !storageParameter || !!error, storageParameter });

    useEffect(() => {
        setState((prevState) => {
            const newState = { ...prevState };
            if (!!error) {
                newState.showBoxIdForm = true;
            }
            return { ...newState, storageParameter };
        });
    }, [error, storageParameter]);

    const setStorageParameter = (storageParameter: string) => {
        setState({ ...state, storageParameter });
    }

    const saveStorageParameter = () => {
        if (state.storageParameter) {
            setState({ ...state, showBoxIdForm: false });
            onSave(state.storageParameter);
        }
    }

    const getError = (error?: IError) => {
        if (error) {
            return <IonText color="danger"><p>Error while getting data {error.status}</p></IonText>;
        }
    }

    return (
        <IonModal isOpen={state.showBoxIdForm} backdropDismiss={false}>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Storage Parameter</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => saveStorageParameter()}>Save</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <p>
                        This application is client for Pi tree watering system.
                    </p>
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Enter Storage Parameter</IonLabel>
                            <IonInput value={state.storageParameter} onIonChange={e => setStorageParameter(e.detail.value!)} required clearInput></IonInput>
                        </IonItem>
                    </IonList>
                    {getError(error)}
                </IonContent>
            </IonPage>
        </IonModal>
    );
}

export default StorageParameterDialog;