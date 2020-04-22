import React from 'react';
import { DevButtonWrapper } from '../../wrapper';
import { DateTimePicker } from 'react-widgets';
import { DATE_FORMAT } from '../../../const';

export const ToolbarDate = () => (
    <DevButtonWrapper width="180" height='1.9rem' className="d-flex">           
        <div className="btn btn-sm border dt-btn" title="Сбросить"><i className="oi oi-brush"/></div>
        <DateTimePicker format={DATE_FORMAT} time={false}/>                         
    </DevButtonWrapper>   
);