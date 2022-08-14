import styled from 'styled-components'

export const Container = styled.div`
    margin-bottom: 5rem;

`
export const CoverArea = styled.div`
    height: 544px;
    padding-inline: 10rem;
    padding-block: 5.75rem;
    display: flex;
    gap: 3.5rem;
    justify-content: space-between;
`
export const TextArea = styled.div`

    h1{
       color: ${(props) => props.theme['base-title']};
       font-family: 'Baloo 2', cursive;
       font-weight: bold;
       font-size: 3rem;
       line-height: 130%;
       margin-bottom: 1rem;
    }
    h2{
        color: ${(props) => props.theme['base-subtitle']};
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        font-size: 1.25rem;
        line-height: 130%;
    }
`
export const IconsArea = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 1.25rem;
    column-gap: 2.5rem;
    margin-top: 4.125rem;
`
export const IconItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    #orange{
        background-color: ${(props) => props.theme['yellow-dark']};
    }
    #yellow{
        background-color: ${(props) => props.theme['yellow']};
    }
    #dark{
        background-color: ${(props) => props.theme['base-text']};
    }
    #purple{
        background-color: ${(props) => props.theme['purple']};
    }
`
export const IconImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 50%;
    color: white;
    
`
export const CoverImage = styled.img`
    height: 360px;
    width: 476px;

`

export const CoffeesList = styled.div`
    margin-inline: 10rem;
    margin-top: 2rem;
    h1 {
        margin-bottom: 3.375rem;
    }
`
export const ListMap = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */

    gap: 2rem;
`