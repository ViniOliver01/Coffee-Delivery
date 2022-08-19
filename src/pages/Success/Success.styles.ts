import styled from 'styled-components'

export const Container = styled.div`
    padding-inline: 10%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
`
export const Textarea = styled.div`
    h1{
        font-family: 'Baloo 2', cursive;
        font-size: 2rem;
        font-weight: bold;
        line-height: 130%;
        color: ${(props) => props.theme['yellow-dark']};
    }
    h2{
        font-family: 'Roboto', sans-serif;
        font-size: 1.25rem;
        font-weight: normal;
        line-height: 130%;
        color: ${(props) => props.theme['base-subtitle']};
        margin-bottom: 2.5rem;
    }
    section{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2.5rem;

        position: relative;
        border: 1px solid transparent;
        border-radius: 6px 36px 6px 36px;
    }
    section::before{
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 6px 36px 6px 36px; 
        padding: 2px; 
        background:linear-gradient(135deg,${(props) => props.theme['yellow']},${(props) => props.theme['purple']}); 
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
                mask-composite: exclude; 
    }
`
export const ImageArea = styled.div`
`
export const ListDetails = styled.div`
    display: flex;
    gap: 0.75rem;

    font-size: 1rem;

    span{
        font-weight: bold;
    }

    .purple{
        background-color: ${(props) => props.theme['purple']};
    }
    .yellow{
        background-color: ${(props) => props.theme['yellow']};
    }
    .yellow-dark{
        background-color: ${(props) => props.theme['yellow-dark']};
    }
`
export const IconImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.5rem;
    width: 2rem;
    height: 2rem;
    color: white;
    border-radius: 50%;
`