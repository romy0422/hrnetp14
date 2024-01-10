import styled from "styled-components";
import Form from "../components/Form";

const H1Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
 `


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Home = () => {

return(
<>
<H1Title>CREATE EMPLOYEE</H1Title>
<Container>
<Form/>
</Container>
</>

)




}


export default Home;