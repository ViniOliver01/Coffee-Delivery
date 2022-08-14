import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: space-evenly;
    margin-bottom: 5rem;
`


export const FormInput = styled.div`
    background-color: ${(props) => props.theme['base-card']};
    border-radius: 6px;
    margin-left: 10rem;
    height: fit-content;
    
    form{  
        margin-inline: 2.5rem;
        margin: 0 2.5rem 2.5rem;
        display: grid;
        grid-template-areas:
		"cep cep cep"
		"rua rua rua"
		"numero complemento complemento"
		"bairro cidade uf"
		;
        grid-template-columns: 200px 276px 60px;
        grid-row-gap: 1rem;
        grid-column-gap: 0.75rem;
    }
    form .cep {
        grid-area: cep;
    }
    form .rua {
        grid-area: rua;
    }
    form .numero {
        grid-area: numero;
    }
    form .complemento {
        grid-area: complemento;
    }
    form .bairro {
        grid-area: bairro;
    }
    form .cidade {
        grid-area: cidade;
    }
    form .uf {
        grid-area: uf;
    }
`
export const InputText = styled.input`
    height: 2.6rem;
    padding: 0.75rem;
    border-radius: 4px;
    border: 2px solid;
    border-color: ${(props) => props.theme['base-button']};
    background-color: ${(props) => props.theme['base-input']};

    &::placeholder{
        color: ${(props) => props.theme['base-label']};
        font-size: 0.875rem;
        font-weight: normal;
    } 
    &:focus{
        outline-color: ${(props) => props.theme['yellow-dark']};
    }
`


export const HeaderItem = styled.div`
    display: flex;
    margin: 2.5rem 2.5rem 2rem;

    .icon{
        margin-right: 0.5rem;
    }
    .yellow{
        color: ${(props) => props.theme['yellow-dark']};
    }
    .purple{
        color: ${(props) => props.theme['purple']};
    }
    div{

    }
    h1{
        color: ${(props) => props.theme['base-subtitle']};
        font-size: 16px;
        height: 21px;
        font-weight: normal;
    }
    h2{
        color: ${(props) => props.theme['base-text']};
        font-size: 14px;
        height: 21px;
        font-weight: normal;
    }
`
export const CartList = styled.div`
    background-color: ${(props) => props.theme['base-card']};
    padding: 40px;
    border-radius: 6px 44px 6px 44px;
    margin-right: 10rem;
    width: 28rem;
    height: fit-content;

    .InfoPrices{
        width: 100%;
        display: grid;
        grid-template-columns: auto auto;
        margin-bottom: 0.5rem;
    }
    div .left{
        text-align: start;
    }
    div .right{
        text-align: end;
    }
    button {
        margin-top: 1.5rem;
        width: 100%;
        border-radius: 6px;
        outline: none;
        border: none;
        background-color: ${(props) => props.theme['yellow']};
        padding-block: 0.75rem;
        color: white;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }
    button:hover {
        background-color: ${(props) => props.theme['yellow-dark']};
    }
    h4{
        font-size: 14px;
        font-weight: normal;
        color: ${(props) => props.theme['base-text']};
    }
    h4.right{
        font-size: 16px;
    }
    h3{
        font-size: 20px;
        font-weight: bold;
        color: ${(props) => props.theme['base-subtitle']};
    }
`
export const PaymentMethod = styled.div`

`
export const PaymentButton = styled.div`
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
`
export const PaymentButtonList = styled.div`
    display: flex;
    margin: 0 2.5rem 2.5rem;
    gap: 0.75rem;
    .active{
        background-color: ${(props) => props.theme['purple-light']};
        border-color: ${(props) => props.theme['purple']};
    }

    .purple{
        color: ${(props) => props.theme['purple']};
    }
`