import styled from 'styled-components';

export const DevButtonWrapper = styled.div` 
    margin-right: 3px; 
    ${props => props.paddingRight ? `padding-right: ${props.paddingRight}px;` : null }
    ${props => props.width ? `width: ${props.width}px;` : null}
    ${props => props.cursor ? `cursor: ${props.cursor};` : null }
    ${props => props.height ? `height: ${props.height};` : null}
`;