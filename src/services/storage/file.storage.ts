import { ILog } from "../logger/json.logger";
import { IStorage } from "./storage";
import fetch from 'node-fetch';
import * as fs from 'fs';

export class FileStorage implements IStorage {
    fileName = 'logs.json';

    constructor() {
    }

    async load(): Promise<ILog | undefined> {
        try {
            return JSON.parse(fs.readFileSync(this.fileName, 'utf8'));
        } catch (err) {
            console.error('error while loading', err);
        }
    }

    async save(log: ILog): Promise<void> {
        try {
            fs.writeFileSync(this.fileName, JSON.stringify(log));
        } catch (err) {
            console.error('Error writing to log file', err);
        }
    }
}
