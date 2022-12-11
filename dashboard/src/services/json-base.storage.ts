import { IStorage } from "./storage";
import fetch from 'node-fetch';
import { ILog } from "../model/log";

export class JsonBaseStorage implements IStorage {
    private rootUrl = 'https://jsonbase.com';

    constructor(private boxId: string = 'box_6f937824ca2f42a8a471') {
    }

    get(): Promise<ILog> {
        return fetch(`${this.rootUrl}/${this.boxId}/data`)
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