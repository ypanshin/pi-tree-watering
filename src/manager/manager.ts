import { Gpio, Direction, Edge, Options } from 'onoff';
import { JsonLogger, LogType } from '../services/logger/json.logger';
import { IAppConfig } from '../config';
import { JsonBoxStorage } from '../services/storage/json-box.storage';

/**
 * Tree waterer
 */
export class Manager {

    private relayGpioReference?: Gpio;
    private interval?: NodeJS.Timeout;
    private logger: JsonLogger;

    /**
     * @param onInterval - the interval to check the sensor when the relay is on (watering)
     * @param offInterval  - the interval to check the sensor when the relay is off
     */
    constructor(
        private config: IAppConfig,
        private rpio: Rpio,
        private Gpio: new (gpio: number, direction: Direction, edge?: Edge, options?: Options) => Gpio,
        logger?: JsonLogger,
    ) {
        this.rpio.open(this.config.sensorPin, rpio.INPUT);

        // switch off relay when Ctrl + C pressed
        process.on('SIGINT', _ => {
            if (this.relayGpioReference) {
                this.logger.addLog(Date.now(), LogType.relay, `off`);
                this.relayGpioReference.unexport();
            }
            process.exit();
        });

        this.logger = logger || new JsonLogger(
            this.config.maxLogItems,
            new JsonBoxStorage(this.config.binId),
        );

    }

    public async init() {
        const loggerConfig = { ...this.config };
        delete (loggerConfig as any).jsonBinPrivateKey;
        delete (loggerConfig as any).jsonBinId;
        await this.logger.init(this.config);

                this.logger.addLog(
                    Date.now(),
                    LogType.init,
                    `${this.config.sensorPin}, ${this.config.relayGpio}, ${this.config.onInterval}, ${this.config.offInterval}, ${this.config.pumpFlow}`);

                this.processInterval();
    }

    public relayOn() {
        // change interval
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.processInterval.bind(this), this.config.onInterval);
        if (!this.relayGpioReference) {
            this.logger.addLog(Date.now(), LogType.relay, `on`);
            // switch on the relay
            this.relayGpioReference = new this.Gpio(this.config.relayGpio, 'out');
            this.relayGpioReference.writeSync(1);
        }
    }

    public relayOff() {
        // change interval
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.processInterval.bind(this), this.config.offInterval);
        // switch off the relay
        if (this.relayGpioReference) {
            // stop pump
            this.logger.addLog(Date.now(), LogType.relay, `off`);
            this.relayGpioReference.writeSync(0);
            this.relayGpioReference.unexport();
            this.relayGpioReference = undefined;
        } else {
            console.warn('The relay already switched off');
        }
    }

    private processInterval() {
        const isDry = this.rpio.read(this.config.sensorPin);
        this.logger.addLog(Date.now(), LogType.moistureSensor, isDry ? 'dry' : 'wet');
        if (isDry) {
            this.relayOn();
        } else {
            this.relayOff();
        }
    }
}