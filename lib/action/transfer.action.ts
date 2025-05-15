
"use server";

import { cookies } from 'next/headers'

export async function transfer(sender_account_number: string,receiver_account_number: string, amount: number) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ sender_account_number,receiver_account_number, amount }),
        });

        if (!response.ok) {
            throw new Error("Failed to transfer");
        }

        const data = await response.json();

        return { success: true, data };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: 'Unknown error occurred' };
    }
}

 export async function getTransferHistory(account_number: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${account_number}/transactions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get transfer history");
        }

        const data = await response.json();

        return { success: true, data };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: 'Unknown error occurred' };
    }
}