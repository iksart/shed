import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input, Row, CustomInput } from 'reactstrap';
import { DateTimePicker } from 'react-widgets';
import Select from 'react-select';
import { DevGridUtils } from '../../util';
import { FileSelect } from '../control';
import 'react-widgets/dist/css/react-widgets.css';

const styleDateRemindLabel = { textAlign: 'right', paddingTop: 0 };

export const TaskModal = ({ showModal, toggle, title, currTask = {}, users = [], states = [], priorities = [], projects = [], events = [], toggleRemind, filesState = [] }) => {        
    const { 
        name = '', 
        idAuthor = -1, 
        idExecutor = -1, 
        dateCreate = new Date(), 
        dateBegin = new Date(), 
        dateEnd = new Date(), 
        idState = -1, 
        idPriority = -1, 
        idProject = -1, 
        idEvent = -1,
        isRemind = false,
        dateRemind = new Date()
    } = currTask;            
    const userOptions = DevGridUtils.getStandartOptions(users);    
    const stateOptions = DevGridUtils.getStandartOptions(states);
    const priorityOptions = DevGridUtils.getStandartOptions(priorities);
    const projectOptions = DevGridUtils.getStandartOptions(projects);
    const eventOptions = DevGridUtils.getStandartOptions(events);
    return (
        <Modal isOpen={showModal} size="lg" centered>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <Form>
                <ModalBody>                                
                    <FormGroup row>
                        <Label for="task" sm={2}>Описание задачи</Label>
                        <Col sm={10}>
                            <Input type="textarea" id="task" defaultValue={name} placeholder="Новая задача..."/>                                                                    
                        </Col>
                    </FormGroup>   
                    <Row>
                        <Col sm={6}>
                            <FormGroup row>
                                <Label for="author" sm={4}>Автор</Label>
                                <Col sm={8}>            
                                    <Select 
                                        id="author"
                                        value={ userOptions.find(item => item.value === idAuthor) } 
                                        options={userOptions} onChange={(e)=>{ }} 
                                        placeholder="Выбор автора..."
                                    />  
                                </Col>
                            </FormGroup>                    
                        </Col>
                        <Col sm={6}>
                            <FormGroup row>
                                <Label for="executor" sm={4}>Исполнитель</Label>
                                <Col sm={8}>
                                    <Select id="executor" options={userOptions} value={userOptions.find(item => item.value === idExecutor)} placeholder="Выбор исполнителя..."/>                                    
                                </Col>
                            </FormGroup>                    
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <FormGroup>
                                <Label for="dateCreate">Дата создания</Label>                            
                                <DateTimePicker format='DD.MM.YYYY' time={false} defaultValue={dateCreate}/>                            
                            </FormGroup>                                
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label for="dateBegin">Дата начала</Label>                            
                                <DateTimePicker format='DD.MM.YYYY' time={false} defaultValue={dateBegin}/>                            
                            </FormGroup>                                
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label for="dateEnd">Дата окончания</Label>                            
                                <DateTimePicker format='DD.MM.YYYY' time={false} defaultValue={dateEnd}/>                            
                            </FormGroup>                                
                        </Col>                                                      
                    </Row>                                            
                    <Row>
                        <Col sm={3}>
                            <FormGroup>
                                <Label for="state">Состояние</Label>      
                                <Select id="state" options={stateOptions} value={stateOptions.find(item => item.value === idState)} placeholder="Выбор..."/>                                
                            </FormGroup> 
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label for="priority">Важность</Label>  
                                <Select id="priority" options={priorityOptions} value={priorityOptions.find(item => item.value === idPriority)} placeholder="Выбор..."/>                                
                            </FormGroup> 
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <Label for="project">Проект</Label>                                  
                                <div className="d-flex">                                
                                    <button type="button" className="btn btn-outline-secondary border btn-sm">
                                        <span className='secondary'>
                                            <i className={`oi oi-plus`}/>                
                                        </span>
                                    </button>    
                                    <Select 
                                        className="select-width-all" 
                                        id="project" 
                                        options={projectOptions} 
                                        value={projectOptions.find(item => item.value === idProject)} 
                                        placeholder="Выбор проекта..."
                                    />                                
                                </div>
                            </FormGroup> 
                        </Col>                            
                    </Row>
                    <FormGroup row>
                        <Label for="event" sm={2}>Мероприятие</Label>
                        <Col sm={10}>
                            <Select id="event" options={eventOptions} value={eventOptions.find(item => item.value === idEvent)} placeholder="Выбор мероприятия..."/>                            
                        </Col>
                    </FormGroup>  
                    <Row>
                        <Col sm={2}>                            
                            <CustomInput type="checkbox" label="Напомнить" id="isRemind" defaultChecked={isRemind} onClick={() => { toggleRemind(); console.log(currTask, isRemind); }}/>                                                           
                        </Col>
                        <Col sm={10}>
                            <FormGroup row>
                                <Label style={styleDateRemindLabel} for="dateRemind" sm={7}>Дата и время напоминания</Label>
                                <Col sm={5}>
                                    <DateTimePicker 
                                        id="dateRemind" format='DD.MM.YYYY HH:mm:ss' value={ isRemind ? dateRemind : undefined } onChange={(e) => {} } disabled={!isRemind}
                                    />                                                                   
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>      
                    <FormGroup row>
                        <Label sm={2}>Прикрепленные файлы</Label>
                        <Col sm={10}>     
                            <FileSelect files={filesState}/>          
                        </Col>
                    </FormGroup>   
                </ModalBody>
                <ModalFooter style={{ justifyContent: 'center' }}>
                    <button type="submit" className="btn btn-outline-dark border">
                        <span style={{ fontWeight: 'bold' }}>
                            <i className={`oi oi-check`} style={{ marginRight: '5px' }}/>Ок                
                        </span>
                    </button> 
                    <button type="button" className="btn btn-outline-dark border">
                        <span style={{ fontWeight: 'bold' }}>Отмена</span>
                    </button>     
                </ModalFooter>
            </Form>                
        </Modal>
    );
}