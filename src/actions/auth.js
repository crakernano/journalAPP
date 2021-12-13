import { types } from "../types/types"
import Swal from 'sweetalert2';

import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from 'firebase/auth';

import {app as firebase, googleAuthProvider } from '../firebase/firebase-config';
import { startLoading, finishLoading } from './ui';


export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) => {

        dispatch( startLoading() );
        
        const auth = getAuth(firebase);
        return signInWithEmailAndPassword(auth, email, password )
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName ));
                console.log("UID de USUARIO: " + user.uid);
                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })

    }
}
 
export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login = (uid, displayName) =>(
    {
        type:types.login,
        payload: {
            uid,
            displayName
        }
    }
)

export const startRegisterWithEmailPasswordName =  (email, password, name) =>{

    return ( dispatch ) => {
        const auth = getAuth(firebase);
        createUserWithEmailAndPassword(auth,email,password )
            .then( async ({user}) => {
                //await updateProfile(user,{displayName:name})
                await user.updateProfile({ displayName: name });
                dispatch(
                    login(user.uid, user.displayName)
                )

            })
            .catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })
    }

}

export const startLogout = () => {
    return async( dispatch ) => {
        const auth = getAuth();
        signOut(auth).then(() => {

            dispatch( logout() );
        })
        //dispatch( noteLogout() );
    }
}


export const logout = () => ({
    type: types.logout
})