import styled from "styled-components";
import Form from "../components/Form";
import { UtilModal } from 'utilmodal';
import { useState } from 'react';

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
    z-index:5;
`
const Home = () => {

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
    }
    return (
        <>
            <UtilModal isOpen={isOpen} onClose={onClose} theme="green">
                Je suis une modal!
            </UtilModal>
            <H1Title>CREATE EMPLOYEE</H1Title>
            <Container>
                <Form statusModal={setIsOpen} />
            </Container>
        </>

    )




}


export default Home;