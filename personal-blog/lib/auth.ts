"use server"

import { cookies } from "next/headers";

export default async function logIn(password: string){
    const SECRET_KEY = "batman123";

    if(password === SECRET_KEY){
        const cookieStore = await cookies();

        cookieStore.set("admin-session", "true", {httpOnly: true, path:"/"});

        return true;
    }

    return false;
    
}