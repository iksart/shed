import React from 'react';
import { DateTimeWork, DictionaryUtils } from '../../../util';
import { VALUE_STATE_DONE } from '../../../const';

export const colorCellByTime = (WrappedComponent) => (props) => {
    const { className, ...restProps } = props;
    const { row: { dateDone = 0, dateEnd = 0, idState = -1 } = {} } = restProps;   
    const isDoneToday = DateTimeWork.compareDates(new Date(), dateDone);      
    const diffToEnd = DateTimeWork.diffOnlyDates(new Date(), dateEnd, 'days');    
    let newClassName = className;
    if (isDoneToday && idState === VALUE_STATE_DONE) newClassName = `${newClassName} bg-primary`;
    else if (!DictionaryUtils.isTaskOpen(idState)) newClassName = `${newClassName} bg-success`;  
    else if (DictionaryUtils.isTaskOpen(idState) && diffToEnd > 0) newClassName = `${newClassName} bg-danger`;     
    else if (DictionaryUtils.isTaskOpen(idState) && diffToEnd >= -1 && diffToEnd <= 0) newClassName = `${newClassName} bg-warning`;     
    let componentProps = { ...restProps, className: newClassName };    
    return <WrappedComponent { ...componentProps }/>;
}