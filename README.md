# Pi Tree Watering System

An automated watering system designed for Christmas trees with monitoring capabilities.

## Devices
- [Raspberry Pi (any model)](https://amzn.to/3nE8tsk)
- [Relay JQC-3FF-S-Z](https://amzn.to/38jBsez)
- [Moisture Sensor](https://amzn.to/3h5OksS) (Note: Avoid the linked sensor as it tends to rust and fail within a week. I recommend using regular copper wires instead.)
- [Water Pump](https://amzn.to/2WwcDGI)

## Siphoning Issue
Siphoning refers to the process of transferring a liquid from one container to another by using a tube or hose that runs from a higher level to a lower level. 

![Diagram](docs/assets/img/siphoning.png)

When the water level in the source container is higher than the end of the tube, water will flow without the need for the pump to be switched on. Make sure that the end of the tube is positioned higher than the water level.

## Storage: [JsonBin](https://jsonbin.io/)
The system utilizes JsonBin to store logs. Visit the provided link, and obtain the box ID from the home page.

## System Setup
![Diagram](docs/assets/img/diagram.png)

### Relay
Connect the relay to the Raspberry Pi:
- VCC → Pin 2 (5V)
- GND → Pin 20 (Ground)
- IN  → Pin 22 (GPIO 25)

### Moisture Sensor
Connect the moisture sensor to Raspberry Pi:
- VCC → Pin 4 (5V)
- GND → Pin 6 (Ground)
- DO  → Pin 3 (GPIO 2)
(Note: Replace the recommended sensor with two regular copper wires for better durability.)

### Water Pump
Connect the water pump to the relay:
- Plus → COM
- Minus → DC Power Supply minus
- Relay ON → DC Power Supply plus

### Application Installation on Raspberry PI
- `$ git clone https://github.com/ypanshin/pi-tree-watering.git` - clone the repository
- `$ cd pi-tree-watering` - navigate to the project folder
- `$ nano package.json` - update `config` section of `package.json`
```
"config": {
    "sensorPin": 3, // the pin that moisture sensor connected to.
    "relayGpio": 25, // the GPIO that the relay connected to
    "onInterval": 1000, // the interval in ms to check the moisture sensor when the relay is on (the pump is working).
    "offInterval": 60000, // the interval in ms to check the moisture sensor when the relay is off (the pump is not working).
    "pumpFlow": 1.5, // the pump flow in litters per minute
    "maxLogItems": 1000, // the maximum items in the log
    "binId": "box_6f937824ca2f42a8a471" // the box id
  },
```
- `$ npm i && npm run build && npm start` - install, build and run the application

### Copy files to Raspberry Pi from another machine
```
scp -r ./dist pi@192.168.0.103:~/apps/pi-tree-watering/dist
```

### Reset the logs and statistics
Get all nodejs processes
```
$ ps aux | grep dist/index
```
Reset the statistics by process signals
```
$ sudo kill -s SIGUSR1 <pid of node dist/index>
```

### Run the application On Raspberry Pi At Startup
Running the application on boot:
```
sudo nano /etc/rc.local
```
On the line before `exit 0` write the following script, replacing `{path to application}` with the directory of your application
```
su pi -c 'sudo npm start --prefix /home/pi/{path to application} < /dev/null &' 
```
Write out the lines to save them (CTRL-X) and then `$ sudo reboot` to restart your RPi

## [Dashboard](https://pi-tree-watering.tech.panshin.me)
The dashboard is an Ionic / React application that displays statistics and logs from the JsonBin.io log file.
Please use the JsonBin ID configured in your Raspberry Pi Application.