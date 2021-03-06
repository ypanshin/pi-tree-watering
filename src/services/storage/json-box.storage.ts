import { ILog } from "../logger/json.logger";
import { IStorage } from "./storage";
import fetch from 'node-fetch';

export class JsonBoxStorage implements IStorage {
    private rootUrl = 'https://jsonbox.io';

    constructor(private binId: string) {
    }

    load(): Promise<ILog> {
        const url = `${this.rootUrl}/${this.binId}`;
        return fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(Promise.reject);
                }
            })
            .then((array) => {
                if (array[0]) {
                    return array[0];
                } else {
                    console.log('The array is empty, create the object')
                    return fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({ config: {} }),
                        headers: { 'Content-Type': 'application/json' }
                    }).then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return Promise.reject(response.status);
                        }
                    });
                }
            })
            .catch((error) => console.error('error while loading', error));
    }

    save(log: ILog): Promise<void> {
        const url = `${this.rootUrl}/${this.binId}/${(log as any)._id}`;
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