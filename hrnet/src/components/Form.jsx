import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addItem } from "../reduxCode/dataSlice";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const Label = styled.label
    `
    display: block;
    margin-top: 1rem;
    margin-bottom: 10px;
`;


const Adress = styled.fieldset`
    margin-top: 10px;
`;

const ButtonStyle = styled.button`
    width:100%;
`



const Form = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addItem(formData));
        setFormData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            startDate: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            department: '',
        });
    };

    return <FormContainer>
        <form onSubmit={handleSubmit} id="create-employee">
            <Label htmlFor="firstName">First Name</Label>
            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

            <Label htmlFor="lastName">Last Name</Label>
            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <DatePicker
                selected={formData.dateOfBirth}
                onChange={date => setFormData({ ...formData, dateOfBirth: date })}
                dateFormat="dd/MM/yyyy"
            />

            <Label htmlFor="startDate">Start Date</Label>
            <DatePicker
                selected={formData.startDate}
                onChange={date => setFormData({ ...formData, startDate: date })}
                dateFormat="dd/MM/yyyy"
            />

            <Adress className="adress">
                <legend>Adress</legend>

                <Label htmlFor="street">Street</Label>
                <input id="street" type="text" value={formData.street} onChange={handleChange} />

                <Label htmlFor="city">City</Label>
                <input id="city" type="text" value={formData.city} onChange={handleChange} />

                <Label htmlFor="state">State</Label>
                <select name="state" id="state" value={formData.state} onChange={handleChange}>
                    <option>United State</option>
                    <option>France</option>
                    <option>Espagne</option>
                    <option>Italie</option>
                    <option>Portugal</option>
                </select>

                <Label htmlFor="zipCode">Zip Code</Label>
                <input id="zipCode" type="number" value={formData.zipCode} onChange={handleChange} />
            </Adress>

            <Label htmlFor="department">Department</Label>
            <select name="department" id="department" value={formData.department} onChange={handleChange}>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Engineering</option>
                <option>Human Resources</option>
                <option>Legal</option>
            </select>
            <ButtonStyle type="submit">Submit</ButtonStyle>
        </form>
    </FormContainer>
}

export default Form;