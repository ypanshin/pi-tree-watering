import React from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';
import { ILogItem } from '../../../model/log';
import _ from 'lodash';
import moment from 'moment';

interface ILogsProps {
    logs?: ILogItem[];
}

const Logs: React.FC<ILogsProps> = (props: ILogsProps) => {
    const { logs } = props;

    const items = logs ? _.sortBy(logs, ['date']).reverse().map((log) =>
        <IonItem key={log.date}>
            <div className="note" slot="start">
                {moment(log.date).format('DD/MM/YYYY HH:mm:SS')}
            </div>
            <IonLabel>
                {log.type}
            </IonLabel>
            <div className="note" slot="end">
                {log.data}
            </div>
        </IonItem>
    ) : [];

    return (
        <IonList>
            {items}
        </IonList>
    );
}

export default Logs;
