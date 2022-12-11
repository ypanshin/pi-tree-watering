import { IStorage } from "./storage";
import fetch from 'node-fetch';
import { ILog } from "../model/log";

export class JsonBoxStorage implements IStorage {
    private rootUrl = 'https://jsonbox.io';

    constructor(private boxId: string = 'box_6f937824ca2f42a8a471/data') {
    }

    get(): Promise<ILog> {
        return fetch(`${this.rootUrl}/${this.boxId}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    const { status, statusText } = response;
                    return Promise.reject({ status, statusText });
                }
            })
            .then((array) => array[0] || {});
    }
}