'use client'
import React, { useContext, useEffect } from "react";
import signIn from "./firebase/auth/signin";
import { useRouter } from 'next/navigation'
import signUp from "./firebase/auth/signupemail";
import signOut from "./firebase/auth/signout";
import { AuthContext } from "./context/AuthContext";
import { arrayUnion, collection, doc, getDocs, getDoc, getFirestore, updateDoc, onSnapshot, DocumentData } from "firebase/firestore";
import firebase_app from "./firebase/config";
import { authWithGoogle } from "./firebase/auth/google";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [data, setData] = React.useState<Array<string>>([])
    const [text, setText] = React.useState('')
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (!user) return setData([])
        const db = getFirestore(firebase_app);
        const userRef = doc(db, "users", user.uid);
        const unsub = onSnapshot(userRef, (doc) => {
            const newData = doc.data()
            if (!newData) return;
            setData(newData.userdata)
        });
        return unsub
    }, [user])

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
    }
    const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)

    }
    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const { result, error } = await signOut();

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
    }

    const handleGoogleAuth = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const result = await authWithGoogle()
    }

    const handleAddTest = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!user) return
        event.preventDefault()
        const db = getFirestore(firebase_app);
        const userRef = doc(db, "users", user.uid)

        await updateDoc(userRef, {
            userdata: arrayUnion({ name: text })
        })
        setText('')
    }

    return (<div className="wrapper">
        <div>Your email is {user?.email ? user.email : 'Not signed in'}</div>
        <div>Your uid is {user?.uid ? user.uid : 'Not signed in'}</div>
        <div className="form-wrapper">
            <h1>Test Firebase</h1>
            <h1>Sign up</h1>
            <form onSubmit={handleSignup} className="form">
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                {!user ?
                    <><button type="submit">Sign up</button><button onClick={handleLogin} type="submit">Login</button><button onClick={handleGoogleAuth} type="submit">Google Auth</button></>
                    :
                    <button onClick={handleLogout} type="submit">Sign out</button>}
            </form>
            {user && (
                <>
                    <input onChange={(e) => setText(e.target.value)} required type="text" name="text" id="text" placeholder="text" />
                    <button onClick={handleAddTest}>Add Test</button>
                </>
            )}
            {data && data.map((item, index) => {
                return <div key={index}>{JSON.stringify(item)}</div>
            })}
        </div>

    </div>);
}

export default Page;