import { IConfig } from '../../config';
import { IStorage } from '../storage/storage';

export enum LogType {
    init = 'init',
    relay = 'relay',
    moistureSensor = 'moistureSensor',
}
export interface ILog {
    config: IConfig,
    /**
     * The start of the service date
     */
    startDate: number;
    /**
     * The time the relay was on in milliseconds
     */
    onTime: number;
    logs: [{
        type: LogType;
        date: number;
        data: string;
    }]
}

export class JsonLogger {
    private log: ILog = {} as ILog;
    private lastOn?: number;
    constructor(private maxLogItems: number, private storage: IStorage) {
    }

    public async init(config: IConfig) {
        this.log = await this.storage.load();
        this.log.onTime = this.log.onTime || 0;
        this.log.startDate = Date.now();
        this.log.config = config;
        await this.storage.save(this.log);
    }

    public async addLog(date: number, type: LogType, data: string) {
        if (type === LogType.relay) {
            if (this.lastOn) {
                this.log.onTime += date - this.lastOn;
            }
            if (data !== 'off') {
                this.lastOn = date;
            } else {
                this.lastOn = undefined;
            }
        }

        this.log.logs = this.log.logs || [];
        if (this.log.logs.length > this.maxLogItems) {
            this.log.logs.splice(0, 1);
        }
        this.log.logs.push({
            date,
            type,
            data,
        });
        console.log(new Date(date), type, data);
        await this.storage.save(this.log);
    }
}
