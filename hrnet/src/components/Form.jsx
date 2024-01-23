import styled from "styled-components";

const FormContainer = styled.div`
    background-color:rgba(182, 255, 164, 0.8);;
    padding:20px;
    font-size:1.5em;
    border-radius:10px;
    width:300px;

    input{
        width:250px;
        height:30px;
        font-size:1em;
    }
`;

const Label =  styled.label
`
    display: block;
    margin-top: 1rem;
    margin-bottom: 10px;
`;


const Adress = styled.fieldset`
    margin-top: 10px;
`;





const Form = () => {

    return <FormContainer>
        <form action="#" id="create-employee">
                <Label htmlFor="first-name">First Name</Label>
                <input type="text" id="first-name" />

                <Label htmlFor="last-name">Last Name</Label>
                <input type="text" id="last-name" />

                <Label htmlFor="date-of-birth">Date of Birth</Label>
                <input id="date-of-birth" type="text"/>

                <Label htmlFor="start-date">Start Date</Label>
                <input id="start-date" type="text"/>

                <Adress className="adress">
                    <legend>Adress</legend>

                    <Label htmlFor="street">Street</Label>
                    <input id="street" type="text" />

                    <Label htmlFor="city">City</Label>
                    <input id="city" type="text" />

                    <Label htmlFor="state">State</Label>
                    <select name="state" id="state"></select>

                    <Label htmlFor="zip-code">Zip Code</Label>
                    <input id="zip-code" type="number" />
                </Adress>

                <Label htmlFor="department">Department</Label>
                <select name="department" id="department">
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Legal</option>
                </select>
            </form>
        </FormContainer>
}

export default Form;