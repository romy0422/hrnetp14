import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addItem } from "../reduxCode/dataSlice";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { stateOptions } from "../data-utils/state-options";
import { formattedDepartmentOptions } from '../data-utils/department-options';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const FormContainer = styled.div`
    background-color:#d0d3df;
    padding:60px;
    font-size:1.5em;
    border-radius:25px;
    width:500px;
    box-shadow:2px 2px 40px rgb(0, 0,0,0.3);
    margin:10px auto;
    border: 1px solid #baf000;
    input{
        width:400px;
        height:30px;
        padding:5px 10px;
        font-size:1em;
    }
    p{
        color:red;
    }
`;

const Label = styled.label
    `
    display: block;
    margin-top: 1rem;
    margin-bottom: 10px;
`;


const Adress = styled.fieldset`
    margin-top:40px;
`;

const ButtonStyle = styled.button`
    width:100%;
    padding:10px;
    border-radius:15px;
    margin:20px auto;
    font-size:1em;
`



const Form = ({statusModal}) => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage]= useState("");

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
        startDate: new Date(),
        street: '',
        city: '',
        state: null,
        zipCode: '',
        department:null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const isValid = validateForm(formData);
        if (!isValid) {
            setErrorMessage("Echecs: vos champs sont incorrectes")
            return;
        }
    
        dispatch(addItem(formData));
        setFormData({
            firstName: '',
            lastName: '',
            dateOfBirth: new Date(),
            startDate: new Date(),
            street: '',
            city: '',
            state: null,
            zipCode: '',
            department: null,
        });
        statusModal(true);
        setErrorMessage("");
    };
    
    const validateForm = (data) => {
        const specialCharsRegex = /[^a-zA-Z0-9 ]/;
    
        for (const key in data) {
            if (typeof data[key] === 'string' && (data[key].trim() === '' || specialCharsRegex.test(data[key]))) {
                setErrorMessage(`Invalid input in ${key}`);
                return false;
            }
            if ((key === 'state' || key === 'department') && data[key] === null) {
                setErrorMessage(`Invalid input in ${key}`);
                return false;
            }
        }
        return true;
    };

    return <FormContainer>
        <form onSubmit={handleSubmit} id="create-employee">
            <Label htmlFor="firstName">First Name</Label>
            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

            <Label htmlFor="lastName">Last Name</Label>
            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <DatePicker
                selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                onChange={date => setFormData({ ...formData, dateOfBirth: date ? date.toLocaleDateString() : '' })}
                dateFormat="dd/MM/yyyy"
            />

            <Label htmlFor="startDate">Start Date</Label>
            <DatePicker
                selected={formData.startDate ? new Date(formData.startDate) : null}
                onChange={date => setFormData({ ...formData, startDate: date ? date.toLocaleDateString() : '' })}
                dateFormat="dd/MM/yyyy"
            />


            <Adress className="adress">
                <legend>Adress</legend>

                <Label htmlFor="street">Street</Label>
                <input id="street" type="text" value={formData.street} onChange={handleChange} />

                <Label htmlFor="city">City</Label>
                <input id="city" type="text" value={formData.city} onChange={handleChange} />

                <Label htmlFor="state">State</Label>
                <Autocomplete
                    id="state"
                    options={stateOptions.map(state => ({
                        label: state.name,
                        value: state.name 
                    }))}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                        setFormData({ ...formData, state: newValue ? newValue.value : '' });
                    }}
                    value={stateOptions.find(option => option.value === formData.state) || null}
                    renderInput={(params) => <TextField {...params} label={formData.state || "State"} />}
                />

                <Label htmlFor="zipCode">Zip Code</Label>
                <input id="zipCode" type="number" value={formData.zipCode} onChange={handleChange} />
            </Adress>

            <Label htmlFor="department">Department</Label>
           
            <Autocomplete
                    id="department"
                    options={formattedDepartmentOptions}
                    getOptionLabel={(option) => option.label}
                    value={formattedDepartmentOptions.find(option => option.value === formData.department) || null}
                    onChange={(event, newValue) => {
                        setFormData({ ...formData, department: newValue ? newValue.value : '' });
                    }}
                    renderInput={(params) => <TextField {...params} label={formData.department || "department" }/>}
                />  
                <p>{errorMessage}</p>
            <ButtonStyle type="submit">Submit</ButtonStyle>
        </form>
    </FormContainer>
}

export default Form;