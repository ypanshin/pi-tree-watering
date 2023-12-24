import React, { createContext, useEffect, useState } from "react";
import StorageParameterDialog from "./components/storage-param-dialog/StorageParamDialog";
import { IError } from "./model/error";
import { ILog } from "./model/log";
import { FileStorage } from "./services/file.storage";
export interface IAppContext {
    loading: boolean;
    lastUpdated?: number;
    log?: ILog;
    parameter?: string;
    error?: IError;
}

export interface IAppRouterParams {
    id: string;
}

const storageKey = 'storageParameter';

const initialState: IAppContext = {
    loading: true,
    parameter: localStorage.getItem(storageKey) || undefined,
}

const AppContext = createContext<IAppContext>(initialState);


function AppContextProvider(props: any) {

    const [state, setState] = useState<IAppContext>(initialState);

    useEffect(() => {
        if (state.parameter) {
            const storage = new FileStorage(state.parameter);
            const loadData = async () => {
                try {
                    const log = await storage.get();
                    let timeout = 2000;
                    if (log.config && log.config.onInterval) {
                        const { offInterval, onInterval } = log.config;
                        const min = offInterval < onInterval ? offInterval : onInterval;
                        timeout = timeout > min ? timeout : min;
                        setState((prevState) => ({ ...prevState, loading: false, log, lastUpdated: Date.now() }));

                    }
                    setTimeout(loadData, timeout);
                } catch (error) {
                    console.error('error while getting logs', error);
                    setState((prevState) => ({ ...prevState, parameter: undefined, error: error as IError }));
                }
            }
            loadData();
        }
    }, [state.parameter]);

    const handleStorageParameterSave = (boxId: string) => {
        localStorage.setItem(storageKey, boxId);
        setState((prevState) => ({ ...prevState, parameter: boxId, error: undefined }));
    }

    return (
        <div>
            <StorageParameterDialog storageParameter={state.parameter} error={state.error} onSave={handleStorageParameterSave}></StorageParameterDialog>
            <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
        </div >
    );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };