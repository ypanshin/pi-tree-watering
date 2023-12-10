import { ILog } from "../logger/json.logger";
import { IStorage } from "./storage";
import fetch from 'node-fetch';

export class JsonBinStorage implements IStorage {
    private rootUrl = 'https://api.jsonbin.io/v3/b';

    constructor(private binId: string) {
    }

    load(): Promise<ILog> {
        const url = `${this.rootUrl}/${this.binId}/latest`;
        return fetch(url, { headers: { 'X-Bin-Meta': 'false' } })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(Promise.reject);
                }
            })
            .catch((error) => console.error('error while loading', error));
    }

    save(log: ILog): Promise<void> {
        const url = `${this.rootUrl}/${this.binId}`;
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(log),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(Promise.reject);
                }
            })
            .catch((error) => console.error('error while saving', error));
    }
}
