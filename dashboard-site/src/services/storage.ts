import { ILog } from "../model/log";

export interface IStorage {
    get(): Promise<ILog>;
}