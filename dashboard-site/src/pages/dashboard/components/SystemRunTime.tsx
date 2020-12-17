import React from 'react';
import moment from 'moment';

interface ISystemRunTimeProps {
    startDate?: number;
}

const SystemRunTime: React.FC<ISystemRunTimeProps> = (props: ISystemRunTimeProps) => {
    const { startDate } = props;
    let text: string = '';
    if (startDate) {
        const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')
        const now = moment();
        const hours = now.diff(startDate, 'hours');
        const minutes = now.subtract(hours, 'hours').diff(startDate, 'minutes');
        if(hours > 0){
            text = `${zeroPad(hours, 2)} Hours `;
        }
        text += `${zeroPad(minutes, 2)} Min`;
    } else {
        text = 'NA';
    }
    return (<h1>{text}</h1>);
}

export default SystemRunTime;
