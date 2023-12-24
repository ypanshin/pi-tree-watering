import { ILog } from "../logger/json.logger";

export interface IStorage {
    load(): Promise<ILog | undefined>;
    save(log: ILog): Promise<void>;
}