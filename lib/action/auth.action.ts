"use server";
import { cookies } from 'next/headers'




export async function login(email: string, password: string) {
  
   const cookieStore = await cookies()

  try {
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json",

     },
     body: JSON.stringify({ email, password }),
   });
   
   const data = await response.json();
   
   if (!response.ok) {
     throw new Error(data.message || "Failed to login");
   }

   cookieStore.set({
     name: 'token',
     value: data.token, // ou data.token selon ta réponse
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     path: '/',
     maxAge: 60 * 60 * 24 * 7, // 7 jours
   });

   return  {success: true, data};
  } catch (error ) {
    
   if (error instanceof Error) {
       return { success: false, error: error.message };
     }
   
     return { success: false, error: 'Unknown error occurred' };
   
  }
}


export async function logout() {
 const cookieStore = await cookies();
 const token = cookieStore.get('token')?.value;

 
  try {
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json",
       "Authorization": `Bearer ${token}`
     },
   });
 
   if (!response.ok) {
     throw new Error("Failed to logout");
   }
   cookieStore.delete('token');
   

   const data = await response.json();

   
   return { success: true, data };
 } catch (error) {
   if (error instanceof Error) {
     return { success: false, error: error.message };
   }
   
   return { success: false, error: 'Unknown error occurred' };
 }
}


export async function register(name: string, email: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register");
    }

    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Unknown error occurred' };
  }
}


export async function profile() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  console.log(token);
 
  
   try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to get profile");
    }
    
 
    const data = await response.json();
    console.log(data); 
    
    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    
    return { success: false, error: 'Unknown error occurred' };
  }
 }




