import { IStorage } from "./storage";
import fetch from 'node-fetch';
import { ILog } from "../model/log";

export class JsonBinStorage implements IStorage {
    private rootUrl = 'https://api.jsonbin.io/v3/b';

    constructor(private boxId: string) {
    }

    get(): Promise<ILog> {
        return fetch(`${this.rootUrl}/${this.boxId}/latest`, { headers: { 'X-Bin-Meta': 'false' } })
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