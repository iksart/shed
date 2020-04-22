import React from 'react';
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';

export const FileSelect = ({ files = [] }) => {
    return (
        <React.Fragment>
            {
                files.map((name, index) => (
                    <InputGroup key={index}>                                
                        <Input disabled value={ name }/>
                        <InputGroupAddon addonType="append">
                            <button type="button" className="btn btn-outline-secondary border btn-sm">
                                <span className='secondary'>
                                    <i className={`oi oi-trash`}/>                
                                </span>
                            </button>                                        
                        </InputGroupAddon>
                    </InputGroup>     
                ))                
            }
            <InputGroup>                                
                <Input disabled placeholder="Новый файл..."/>
                    <InputGroupAddon addonType="append">
                        <button type="button" className="btn btn-outline-secondary border btn-sm">
                            <span>
                                <i className={`oi oi-plus`}/>                
                            </span>
                        </button>                                        
                    </InputGroupAddon>
                </InputGroup>  
        </React.Fragment>
    );
};