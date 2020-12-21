import React from 'react';

interface IRuntTimeProps {
    onTime?: number;
}

const RunTime: React.FC<IRuntTimeProps> = (props: IRuntTimeProps) => {
    const text = props.onTime ? `${Math.round(props.onTime / 1000)}` : `NA`;
    return (<h1>{text} Sec</h1>);
}

export default RunTime;
