import React from 'react';

interface ITransferredWaterProps {
    onTime?: number;
    pumpFlow?: number;
}

const TransferredWater: React.FC<ITransferredWaterProps> = (props: ITransferredWaterProps) => {
    const { onTime, pumpFlow } = props;

    let text = `NA`;
    if (onTime && pumpFlow) {
        text = `${Math.round(onTime / 60000 * pumpFlow * 1000) / 1000}`;
    }
    return (<h1>{text} Litters</h1>);
}

export default TransferredWater;
