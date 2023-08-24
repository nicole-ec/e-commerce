import { useState } from "react";
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignInContainer, ButtonContainer } from "./sign-in-form.styles";

import { 
    signInWithGooglePopup, 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();
        }
        catch(error) {
            if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                alert("wrong email/password");
            }
            console.log(error);
        }
        // confirm passwords match, then auth user, then create userdoc.
        
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;