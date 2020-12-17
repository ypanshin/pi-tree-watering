
export interface IConfig {
    sensorPin: number;
    relayGpio: number;
    onInterval: number;
    offInterval: number;
    /**
     * The pump flow in litter/minute
     */
    pumpFlow: number;
}

export interface IAppConfig extends IConfig {
    maxLogItems: number;
    commitInterval: number;
    storageKey?: string;
    binId: string;
}

