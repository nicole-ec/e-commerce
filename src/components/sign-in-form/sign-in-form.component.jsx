import { useState } from "react";
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';
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
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
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
        <div className="sign-in-container">
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
                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;