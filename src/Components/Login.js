import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../fbconfig'
import { actionTypes } from '../Reducer'
import { useStateValue } from '../StateProvider'
import './Login.css'

function Login() {
    const [{},dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider).then((res)=>{
            dispatch({
                type: actionTypes.SET_USER ,
                user: res.user
            })
        }).catch(err=>{
            alert(err)
        })
    }

    return (
        <div className='login'>
            <div className='Login_container'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' alt=''/>
                <div className='login_text'>
                    Signin to WhatsApp
                </div>

                <Button variant='contained' onClick={signIn}>
                    SignIn With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
