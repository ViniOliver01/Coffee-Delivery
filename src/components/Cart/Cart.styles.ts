import styled from 'styled-components'

export const Container = styled.div`
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: ${(props) => props.theme['yellow-light']};
    color: ${(props) => props.theme['yellow-dark']};

    text-decoration: none;
    position: relative;
`
export const CountItens = styled.div`
    width: 20px;
    height: 20px;
    font-size: 0.75rem;

    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme['yellow-dark']};
    color: white;
`
