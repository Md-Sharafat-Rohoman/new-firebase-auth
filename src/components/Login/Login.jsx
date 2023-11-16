import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import app from '../../firebase/firebase.init';
import { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    // console.log(app); 
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        // console.log("Google mama sign in");
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handelGithubSignIn = () =>{
        signInWithPopup(auth,githubProvider)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser); 
        })
        .catch(error =>{
            console.log(error);
        })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            {/* user ? log out : sign in */}
            {
                user ?
                    <button onClick={handleSignOut}>Sign out</button> :
                    <>
                        <button onClick={handleGoogleSignIn}>Google Login</button>
                        <button onClick={handelGithubSignIn}>Github Login</button>
                    </>
            }
            {user && <div>
                <h3>User : {user?.displayName} </h3>
                <p>Email : {user?.email}</p>
                <img src={user?.photoURL} alt="" />
            </div>
            }
        </div>
    );
};

export default Login;