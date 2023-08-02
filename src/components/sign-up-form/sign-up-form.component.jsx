import { useState } from "react";
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("passwords dont match");
            return;
        }
    
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();

        }
        catch(error) {
            if(error.code === "auth/email-already-in-use") {
                alert("email taken");
            }
            else {
                console.log("user creation: "+error);
            }
        }
        // confirm passwords match, then auth user, then create userdoc.
        
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name" 
                    inputOptions= {{
                        onChange:handleChange,
                        value:displayName, 
                        name:"displayName", 
                        required:true, 
                        type:"text",
                    }}
                />
                <FormInput 
                    label="Email" 
                    inputOptions= {{
                        onChange:handleChange,
                        value:email, 
                        name:"email", 
                        required:true, 
                        type:"text",
                    }}
                />
                <FormInput 
                    label="Password" 
                    inputOptions= {{
                        onChange:handleChange,
                        value:password, 
                        name:"password", 
                        required:true, 
                        type:"password",
                    }}
                />
                <FormInput 
                    label="Confirm Password" 
                    inputOptions= {{
                        onChange:handleChange,
                        value:confirmPassword, 
                        name:"confirmPassword", 
                        required:true, 
                        type:"password",
                    }}
                />
                <Button buttonType="inverted" type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;