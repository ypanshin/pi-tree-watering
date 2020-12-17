import { IAppConfig } from "./config";
import { Manager } from "./manager/manager";
import rpio from 'rpio';
import { Gpio } from 'onoff';


const config: IAppConfig = require('../package.json').config;

const manager = new Manager(config, rpio, Gpio);

