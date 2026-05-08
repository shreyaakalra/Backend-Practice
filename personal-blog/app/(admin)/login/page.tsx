// Form to enter password -> sets Cookie
"use client"

import logIn from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const router = useRouter();
 
    async function submitPassword(e: React.FormEvent){
        e.preventDefault();
        logIn(password);

        const sucess = await logIn(password);

        if(sucess){
            router.push('/dashboard');
        } else {
            setError("Incorrect password. Nice try, hacker.");
        }
    }

    return(
        <form onSubmit={submitPassword} className="flex flex-col justify-center items-center">
            <h1 className="mt-40 text-4xl font-bold">LOGIN FORM</h1>

            {error && <div className="text-red-500 font-bold mt-4">{error}</div>}

            <div className="mb-5">
                <h1 className="mt-20 mb-2">Username</h1>
                <input 
                    type="text-2xl" 
                    className="border border-2 border-gray-100 w-100 p-2" 
                    placeholder="enter username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    /> 
            </div>

            <div className="mb-5">
                <h1 className="mb-2">Password</h1>
                <input 
                    type="text" 
                    className="border border-2 border-gray-100 w-100 p-2" 
                    placeholder="enter password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                /> 
            </div>
            <button 
                type="submit"
                className="border-2 bg-blue-500 w-100 p-2 mt-2"
            >
                Submit
            </button>
           

        </form>
    );
}