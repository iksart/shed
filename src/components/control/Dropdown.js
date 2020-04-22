import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const iconStyle = { marginRight: 5 };

export const Dropdown = ({ dropdownOpen, toggle, size = 'sm', color = 'secondary', icon = '', text = '', menuItems = [] }) => {
  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={() => { toggle(); }}>
        <DropdownToggle outline caret size={ size } color={ color }>
          <i className={`oi oi-${icon}`} style={ iconStyle } />
          {text}
        </DropdownToggle>
        <DropdownMenu>
        {
          menuItems.map((props, index) => {
            const { text } = props;            
            return <DropdownItem key={index}>{text}</DropdownItem>;
          })
        }
        </DropdownMenu>
    </ButtonDropdown>    
  );
}