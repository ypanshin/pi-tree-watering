import { IStorage } from "./storage";
import fetch from 'node-fetch';
import { ILog } from "../model/log";

export class FileStorage implements IStorage {
    constructor(private url: string) {
    }

    get(): Promise<ILog> {
        return fetch(this.url, { headers: { 'ngrok-skip-browser-warning': 'skip' } })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    const { status, statusText } = response;
                    return Promise.reject({ status, statusText });
                }
            });
    }
}