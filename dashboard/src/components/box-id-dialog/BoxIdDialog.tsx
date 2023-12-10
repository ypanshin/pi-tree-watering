import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { IError } from '../../model/error';

interface IState {
    showBoxIdForm: boolean;
    boxId?: string;
}

interface IProps {
    boxId?: string;
    error?: IError;
    onSave: (boxId: string) => void
}

const BoxIdDialog: React.FC<IProps> = ({ boxId, error, onSave }) => {
    const [state, setState] = useState<IState>({ showBoxIdForm: !boxId || !!error, boxId });

    useEffect(() => {
        setState((prevState) => {
            const newState = { ...prevState };
            if (!!error) {
                newState.showBoxIdForm = true;
            }
            return { ...newState, boxId };
        });
    }, [error, boxId]);

    const setBoxId = (boxId: string) => {
        setState({ ...state, boxId });
    }

    const saveBoxId = () => {
        if (state.boxId) {
            setState({ ...state, showBoxIdForm: false });
            onSave(state.boxId);
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
                        <IonTitle>Box Id</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => saveBoxId()}>Save</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <p>
                        This application is client for Pi tree watering system.
                    </p>
                    <p>
                        The watering system uses <a href="https://jsonbin.io" target="_blank" rel="noopener noreferrer">jsonbox.io</a> as the logs storage.
                        Please visit this site to obtain the bin id.
                    </p>
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Enter Bin Id</IonLabel>
                            <IonInput value={state.boxId} onIonChange={e => setBoxId(e.detail.value!)} required clearInput></IonInput>
                        </IonItem>
                    </IonList>
                    {getError(error)}
                </IonContent>
            </IonPage>
        </IonModal>
    );
}

export default BoxIdDialog;