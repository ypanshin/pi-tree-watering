import { IStorage } from "./storage";
import fetch from 'node-fetch';
import { ILog } from "../model/log";

export class JsonBinStorage implements IStorage {
    private rootUrl = 'https://jsonbin.io/v3/b';

    constructor(private boxId: string = 'box_6f937824ca2f42a8a471') {
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
            });
    }
}