import styled from 'styled-components'

export const Container = styled.div`
    width: 16rem;
    height: 19rem;
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
    align-items: center;
    gap: 0.5rem;
`
export const Price = styled.div`
    flex: 1;
    p{
        font-size: 14px;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
    }
    span{
        padding-inline:0.25rem;
        font-size: 24px;
        font-family: 'Baloo 2', cursive;
    }
`

export const ItensCount = styled.div`
    width: 4.5rem;
    height: 100%;
    display: flex;
    justify-content: space-around;
    
    align-items: center;
    user-select: none; 
    border-radius: 6px;
    background-color: ${(props) => props.theme['base-button']};
    a {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme['purple']};
    }
    a:hover {
        color: ${(props) => props.theme['purple-dark']};
        cursor: pointer;
    }
`

export const CartButton = styled.div`
    color: ${(props) => props.theme['base-card']};
    background-color: ${(props) => props.theme['purple-dark']};
    border-radius: 6px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover{
        background-color: ${(props) => props.theme['purple']};
    }
`