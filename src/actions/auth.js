import { types } from "../types/types"
import Swal from 'sweetalert2';

import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut  } from 'firebase/auth';

import {app as firebase, googleAuthProvider } from '../firebase/firebase-config';
import { startLoading, finishLoading } from './ui';

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload:{
            uid,
            displayName
        }
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

export const startLoginEmailPassword = (email, password) => {
    const auth = getAuth();
    return (dispatch) => {

        dispatch( startLoading() );

        return signInWithEmailAndPassword( auth, email, password )
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName ));

                dispatch( finishLoading() );
                
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })

    }
}

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