import { ILog } from "../logger/json.logger";

export interface IStorage {
    load(): Promise<ILog>;
    save(log: ILog): Promise<void>;
}