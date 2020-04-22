import React from 'react';
import { DevAddButton, DevButton, DevEditButton, DevDeleteButton } from '../button';
import { ToolbarBlock, ToolbarSpan, ToolbarDate, ToolbarLegendBlock } from '.';
import { DevButtonWrapper, DevButtonRowWrapper, DevRowsWrapper } from '../../wrapper';
import { Dropdown } from '../../control';
import { compose, withStateHandlers } from 'recompose';

const taskExternalToolButtons = [
    { icon: "account-login", hint: "Экспорт в Excel", text: "Экспорт" }, 
    { icon: "bar-chart", hint: "Диаграмма", text: "Диаграмма" }, 
    { icon: "browser",  hint: "Отчеты", text:"Отчеты" },
    { icon: "people", hint: "Задачи по сотрудникам", text: "По сотрудникам" },
    { icon: "layers", hint: "Задачи по проектам", text: "По проектам" }
];

const taskFilterDatesToolButtons = [
    { icon: "clock", hint: "Текущий день", text: "День" }, { icon: "calendar", hint: "Текущий месяц", text: "Месяц", wrapperProps: { className: "border-right" }}
];

const taskFilterLegendToolButtons = [
    { title: 'Задача выполнена или закончена', color: 'success' }, 
    { title: 'Задача просрочена', color: 'danger' }, 
    { title: 'Задача должна быть закрыта в течении суток', color: 'warning' },
    { title: 'Задача выполнена сегодня', color: 'primary' }
];

const propsChangeState = { 
    color: 'dark', icon: 'loop-circular', text: 'Сменить состояние', menuItems: [{ text: 'Создана' }, { text: 'В работу' }, { text: 'Приостановить' },  { text: 'Закрыть' }] 
};

const ChangeStateDropdown = compose(withStateHandlers({ dropdownOpen: false }, { toggle: ({ dropdownOpen }) => () => ({ dropdownOpen: !dropdownOpen }) }))(Dropdown);

export const TaskToolbarRootComponent = (props) => {    
    const { children, openTask, toggleFilter } = props;    

    const taskStandartControlToolButtons = [
        { buttonComponent: DevAddButton, text: "Новая задача", onExecute: () => { openTask(); } }, 
        { buttonComponent: DevEditButton, text: "Изменить" }, 
        { buttonComponent: DevDeleteButton, text: "Удалить", wrapperProps: {  className: "border-right" } }
    ];

    const taskFilterToolButtons = [
        { icon: "cog", hint: "Фильтр", wrapperProps: { className: "border-right", paddingRight: 6 }, onExecute: () => { toggleFilter(); } }, 
        { icon: "wifi", hint: "Активные задачи", text: "Активные" }, 
        { icon: "warning", hint: "Просроченные задачи", text: "Просроченные" },
        { icon: "heart", hint: "Мои задачи", text: "Мои" },
        { icon: "star", hint: "Задачи на контроле", text: "На контроле" },
        { icon: "grid-three-up", hint: "Все задачи", text: "Все" },
        { icon: "bell", hint: "Не прочитанные задачи", text: "Не прочитанные", wrapperProps: { className: "border-right" } }
    ];

    return (
        <div className="card-header d-flex position-relative dx-g-bs4-toolbar">        
            <DevRowsWrapper className="d-flex flex-column">                    
                <DevButtonRowWrapper className="d-flex border-bottom">
                    <ToolbarBlock buttons={taskExternalToolButtons}/>
                </DevButtonRowWrapper>
                <DevButtonRowWrapper className="d-flex border-bottom">
                    <DevButtonWrapper className="border-right" paddingRight="6">
                        { children }
                    </DevButtonWrapper>
                    <ToolbarBlock buttons={taskStandartControlToolButtons}/>                  
                    <DevButtonWrapper>  
                        <ChangeStateDropdown { ...propsChangeState }/>                        
                    </DevButtonWrapper> 
                    <DevButtonWrapper>
                        <DevButton icon="paperclip" hint="Прикрепить файл" color="dark" text="Прикрепить"/>
                    </DevButtonWrapper>                                          
                </DevButtonRowWrapper>
                <DevButtonRowWrapper className="d-flex">
                    <ToolbarBlock buttons={taskFilterToolButtons}/>
                    <ToolbarSpan className="text-dark" title='Завершение задачи' text = 'Завершить: с'/>    
                    <ToolbarDate/>                    
                    <ToolbarSpan className="text-dark" text = 'по'/>                      
                    <ToolbarDate/>                    
                    <ToolbarBlock buttons={taskFilterDatesToolButtons}/>
                    <ToolbarSpan className="text-dark" title='Задачи по времени выполнения' text="По времени"/>                    
                    <ToolbarLegendBlock buttons={taskFilterLegendToolButtons}/>
                </DevButtonRowWrapper>        
            </DevRowsWrapper>                    
        </div>
    );
}