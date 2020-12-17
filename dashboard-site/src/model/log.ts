export enum LogType {
    init = 'init',
    relay = 'relay',
    moistureSensor = 'moistureSensor',
}

export interface ILogItem {
    type: LogType;
    date: number;
    data: string;
}

export interface ILog {
    config: {
        sensorPin: number;
        relayGpio: number;
        onInterval: number;
        offInterval: number;
        /**
         * The pump flow in litter/minute
         */
        pumpFlow: number;
    },
    /**
     * The start of the service date
     */
    startDate: number;
    /**
     * The time the relay was on in milliseconds
     */
    onTime: number;
    logs: ILogItem[];
}