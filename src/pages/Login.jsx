import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { saveUser } from "../redux/store";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(auth);

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Signed In : ", user);
            const userDetails = { 
                accessToken: user.accessToken,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid,
             };
            dispatch(saveUser(userDetails));
            navigate('/');
        })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("An error occured: ", errorCode, errorMessage);
          });

        };

    return (
    <form style={{ display: 'flex',
        flexDirection: 'column' ,
        border: '1px solid black', 
        padding: '2rem', 
        width: '250px'}}
        onSubmit={handleLogin}
    >
        <label htmlFor='email'>Email:</label>
        <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <label htmlFor='password' >Password:</label>
        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <button style={{ margin: '1rem 0'}}>
            Log In
        </button>
    </form>
    );
}

export default Login;