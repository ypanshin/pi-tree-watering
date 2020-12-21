import React, { useEffect, useState } from 'react';
import './LastUpdated.css';

export interface ILastUpdatedProperties {
    lastUpdated: number | undefined;
}

interface IState {
    seconds: number;
}

let interval: any;

const LastUpdated: React.FC<ILastUpdatedProperties> = (props: ILastUpdatedProperties) => {
    const [state, setState] = useState<IState>({ seconds: -1 })

    useEffect(() => {
        const seconds = props.lastUpdated ? Math.round((Date.now() - props.lastUpdated) / 1000) : -1;
        setState({
            seconds,
        });
        if (interval) {
            clearInterval(interval);
        }
        if (seconds !== -1) {
            interval = setInterval(() => {
                setState(state => ({
                    seconds: state.seconds + 1,
                }));
            }, 1000);
        }

    }, [props.lastUpdated]);


    return (
        <div className="last-updated">
            {state.seconds === -1 ? '' : `Updated ${state.seconds} sec ago`}
        </div>
    );
}

export default LastUpdated;