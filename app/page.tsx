'use client'
import React, { useContext, useEffect } from "react";
import signIn from "./firebase/auth/signin";
import { useRouter } from 'next/navigation'
import signUp from "./firebase/auth/signup";
import signOut from "./firebase/auth/signout";
import { AuthContext } from "./context/AuthContext";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [data, setData] = React.useState(null)
    const router = useRouter()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            user
        }
    }, [user])

    const handleSignup = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
    }
    const handleLogin = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)

    }
    const handleLogout = async (event) => {
        event.preventDefault()

        const { result, error } = await signOut();

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
    }

    return (<div className="wrapper">
        <div>Your email is {user?.email ? user.email : 'Not signed in'}</div>
        <div>Your uid is {user?.uid ? user.uid : 'Not signed in'}</div>
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign up</h1>
            <form onSubmit={handleSignup} className="form">
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <button type="submit">Sign up</button>
                <button onClick={handleLogin} type="submit">Login</button>
                <button onClick={handleLogout} type="submit">Sign out</button>
            </form>
        </div>

    </div>);
}

export default Page;