import { ILog } from "../logger/json.logger";
import { IStorage } from "./storage";
import fetch from 'node-fetch';

export class JsonBaseStorage implements IStorage {
    private rootUrl = 'https://jsonbase.com';

    constructor(private binId: string) { }

    load(): Promise<ILog> {
        const url = `${this.rootUrl}/${this.binId}/data`;
        return fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(Promise.reject);
                }
            })
            .catch((error) => {
                console.error('error while loading', error);
                return fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify({ config: {} }),
                    headers: { 'Content-Type': 'application/json' }
                }).then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(response.status);
                    }
                });
            });
    }

    save(log: ILog): Promise<void> {
        const url = `${this.rootUrl}/${this.binId}/data`;
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