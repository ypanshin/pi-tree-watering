import React from 'react';
import { IonSkeletonText } from '@ionic/react';

const Skeleton: React.FC = () => {
    return (<IonSkeletonText animated style={{ width: '100%' }} />);
}

export default Skeleton;
