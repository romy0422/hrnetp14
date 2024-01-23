
import styled from 'styled-components';

const ErrorContainer = styled.div`
    width:80%;
    height:fit-content;
    position:relative;
    padding:50px;
    border-radius:15px;
    background-color:rgba(255,255,255,0.5);
    margin:40px auto;
    text-align:center;
    font-size:3em;
`;


const Error =() => {

    return <ErrorContainer>Error 404, page introuvable</ErrorContainer>
}


export default Error;