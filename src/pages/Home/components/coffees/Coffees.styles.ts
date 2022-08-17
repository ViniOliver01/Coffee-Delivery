import styled from 'styled-components'

export const Container = styled.div`
    width: 16rem;
    height: fit-content;
    background-color: ${(props) => props.theme['base-card']};
    border-radius: 6px 36px 6px 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-inline: 20px;
    padding-bottom: 20px;

    img{
        width: 120px;
        height: 120px;
        position: relative;
        top: -20px;
        filter: drop-shadow(12px 12px 12px #222);
    }
    ul{
        gap: 0.25rem;
        display: flex;
        margin-bottom: 1rem;
    }
    li{
        list-style-type: none;
        border-radius: 100px;
        background-color: ${(props) => props.theme['yellow-light']};
        color: ${(props) => props.theme['yellow-dark']};

        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;

        padding-inline: 0.5rem;
        padding-block: 0.25rem;
    }
    h2{
        font-size: 20px;
        font-family: 'Baloo 2', cursive;
        color: ${(props) => props.theme['base-subtitle']};
        margin-bottom: 0.5rem;
    }
    h3{
        font-size: 14px;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        color: ${(props) => props.theme['base-label']};
        text-align: center;
        justify-self: flex-start;
        flex: 1;
    }
`

export const ShopSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    /* Add Iten Efect on CartButton */
    .addCartEfect{
        background-color: ${(props) => props.theme['green']};
        font-size: 0.8rem;
        transition: 0.3s;

        &:hover{
        background-color: ${(props) => props.theme['green']};
        font-size: 0.8rem;
        }
    }
`
export const Price = styled.div`
    flex: 1;
    color: ${(props) => props.theme['black']};
    p{
        font-size: 1.25rem;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
    }
    span{
        font-size: 2.25rem;
        font-family: 'Baloo 2', cursive;
        padding-inline:0.25rem;
    }
`

export const ItensCount = styled.div`
    width: 100%;
    height: 2.375rem;
    display: flex;
    justify-content: space-between;
    
    align-items: center;
    user-select: none; 
    border-radius: 6px;
    margin-bottom: 0.5rem;
    background-color: ${(props) => props.theme['base-button']};

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        width: 2.375rem;
        height: 2.375rem;
        color: ${(props) => props.theme['purple']};
        background-color: ${(props) => props.theme['white']};
    }
    a:hover {
        color: ${(props) => props.theme['purple-dark']};
        background-color: ${(props) => props.theme['base-hover']};
        cursor: pointer;
    }
`

export const CartButton = styled.div`
    width: 100%;
    height: 2.375rem;
    color: ${(props) => props.theme['base-card']};
    background-color: ${(props) => props.theme['purple-dark']};
    border-radius: 6px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    gap: 0.5rem;

    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: bold;

    &:hover{
        background-color: ${(props) => props.theme['purple']};
    }
`
export const IconCartButton = styled.div`
    position: relative;

    span{
        width: 8px;
        height: 8px;
        top: -8px;
        right: 0;
        position: absolute;
        align-self: flex-end;
        justify-self: flex-end;
    }
`
