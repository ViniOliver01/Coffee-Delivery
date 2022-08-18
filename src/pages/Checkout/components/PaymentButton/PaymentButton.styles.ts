import styled from 'styled-components'

export const Container = styled.li`
    border-bottom: 1px solid;
    border-color: ${(props) => props.theme['base-button']};
    display: flex;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    img{
        width: 4rem;
        height: 4rem;
    }
`
export const PaymentButton = styled.button`
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 0.75rem;
    border-radius: 8px;
    background-color: ${(props) => props.theme['base-button']};
    border: 2px solid transparent;
    user-select: none;

    font-size: 0.75rem;
    color: ${(props) => props.theme['base-text']};
    text-transform: uppercase;
    cursor: pointer;
    &:hover{
        background-color: ${(props) => props.theme['base-hover']};
    }
    input{
        /* position: absolute;
        visibility: hidden; */
    }
`