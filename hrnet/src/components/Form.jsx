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
    position:relative;
    background-color:#d0d3df;
    padding:50px;
    font-size:1.5em;
    font-family: Helvetica, Arial, sans-serif;
    border-radius:25px;
    width:100%;
    min-width:200px;
    max-width:500px;
    box-shadow:2px 2px 40px rgb(0, 0,0,0.3);
    margin: 50px auto;
    border: 1px solid #baf000;
    input{
        width:70%;
        height:30px;
        padding:5px 10px;
        font-size:1em;
    }
    p{
        color:red;
    }
    .react-datepicker-wrapper {
        width:100%;
    }
    .MuiAutocomplete-root {
        width:100%;
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
    cursor:pointer;
    font-size:1em;
    &:hover{
        background-color:#e3ff84;
    }
`



const Form = ({ statusModal }) => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: null,
        zipCode: '',
        department: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm(formData);
        if (!isValid) {
            setErrorMessage("Failed to send. Your input fields are incorrect. Please check and try again.")
            return;
        }

        dispatch(addItem(formData));
        setFormData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            startDate: '',
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
                <Autocomplete
                    id="state"
                    options={stateOptions}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                        setFormData({ ...formData, state: newValue || null });
                    }}
                    value={formData.state ? stateOptions.find(option => option.abbreviation === formData.state.abbreviation) : null}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            fullWidth
                        />
                    )}
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
                renderInput={(params) => <TextField {...params} />}
            />
            <p>{errorMessage}</p>
            <ButtonStyle type="submit">Submit</ButtonStyle>
        </form>
    </FormContainer>
}

export default Form;