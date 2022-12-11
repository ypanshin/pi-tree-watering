import React, { createContext, useEffect, useState } from "react";
import BoxIdDialog from "./components/box-id-dialog/BoxIdDialog";
import { IError } from "./model/error";
import { ILog } from "./model/log";
import { JsonBaseStorage } from "./services/json-base.storage";
export interface IAppContext {
    loading: boolean;
    lastUpdated?: number;
    log?: ILog;
    boxId?: string;
    error?: IError;
}

export interface IAppRouterParams {
    id: string;
}

const storageKey = 'boxId';

const initialState: IAppContext = {
    loading: true,
    boxId: localStorage.getItem(storageKey) || undefined,
}

const AppContext = createContext<IAppContext>(initialState);


function AppContextProvider(props: any) {

    const [state, setState] = useState<IAppContext>(initialState);

    useEffect(() => {
        if (state.boxId) {
            const storage = new JsonBaseStorage(state.boxId);
            const loadData = async () => {
                try {
                    const log = await storage.get();
                    let timeout = 2000;
                    if (log.config && log.config.onInterval) {
                        const { offInterval, onInterval } = log.config;
                        const min = offInterval < onInterval ? offInterval : onInterval;
                        timeout = timeout > min ? timeout : min;
                        setState({ ...state, loading: false, log, lastUpdated: Date.now() });

                    }
                    setTimeout(loadData, timeout);
                } catch (error) {
                    console.error('error while getting logs', error);
                    setState({ ...state, boxId: undefined, error });
                }
            }
            loadData();
        }
    }, [state.boxId]);

    const handleBoxIdSave = (boxId: string) => {
        localStorage.setItem(storageKey, boxId);
        setState({ ...state, boxId, error: undefined });
    }

    return (
        <div>
            <BoxIdDialog boxId={state.boxId} error={state.error} onSave={handleBoxIdSave}></BoxIdDialog>
            <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
        </div >
    );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };