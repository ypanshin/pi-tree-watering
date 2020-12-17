# PI Tree Watering System
The automatic watering system to water christmas tree with monitoring.

## Devices
- [Raspberry PI any model](https://amzn.to/3nE8tsk)
- [Relay JQC-3FF-S-Z](https://amzn.to/38jBsez)
- [Moisture Censor](https://amzn.to/3h5OksS) Do not recommend this one, as it only hold for one week, after it broke because of rust. I already ordered another sensor type for test. However, I used the sensor's processor.
- [Water Pump](https://amzn.to/2WwcDGI)

## Storage [JsonBox](https://jsonbox.io/)
The system uses JsonBox to store the logs.
- navigate to the link and get the box id from the link on hte home page
## System Setup
![Diagram](docs/assets/img/diagram.png)
### Relay
Connect the relay to the Raspberry PI:
- VCC --> Pin 2 (5V)
- GND --> Pin 20 (Ground)
- IN  --> Pin 22 (GPIO 25)

### Moisture Sensor
Connect the moisture sensor to Raspberry PI:
- VCC --> Pin 4 (5V)
- GND --> Pin 6 (Ground)
- DO  --> Pin 3 (GPIO 2)
The original sensor did not hold for me more than a week. It was destroyed by rust. I replaced this sensor with two regular cooper wires that used for the electricity in the house and it worked much better. 
### Water Pump
Connect the water pump to the relay:
- plus --> COM
- minus --> DC Power Supply minus
- Relay ON --> DC Power Supply plus

### Application Installation on Raspberry PI
- `$ git clone https://github.com/ypanshin/pi-tree-watering.git` - clone the repository
- `$ cd pi-tree-watering` - navigate to the project folder
- `$ nano package.json` - update `config` section of `package.json`
- `$ npm i && npm run build && npm start` - install, build and run the application

### Run the application On Raspberry Pi At Startup
Running the application on boot:
```
sudo nano /etc/rc.local
```
On the line before `exit 0` write the following script, replacing `{path to application}` with the directory of your application
```
su pi -c 'sudo npm start --prefix /home/pi/{path to application} < /dev/null &' 
```
Write out the lines in order to save them (CTRL-X) and then `$ sudo reboot` to restart your RPi


