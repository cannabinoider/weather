"use server";

export async function getWeather() {
    const res = await fetch(`${process.env.BACKEND_URL}/weather`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Data fetching failed');
    }

    return await res.json();
}

export async function getDailySummary(city: string) {
    const url = `${process.env.BACKEND_URL}/weather/daily-summary/${city}`; 
    // console.log("Fetching history data from URL:", url); 

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Data fetching failed');
    }

    return await res.json();
}
export async function getHistory(city: string) {
    const url = `${process.env.BACKEND_URL}/weather/historical/${city}`; 
    // console.log("Fetching history data from URL:", url); 

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Data fetching failed');
    }

    return await res.json();
}

export async function getForecast(city: string) {
    const url = `${process.env.BACKEND_URL}/weather/forecast/${city}`; 
    // console.log("Fetching history data from URL:", url); 

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Data fetching failed');
    }

    return await res.json();
}
export async function sendEmailCity(city: string, email: string) {
    const url = `${process.env.BACKEND_URL}/weather/send-alert-email?email=${email}&city=${city}`;
    console.log("Sending request to:", url); 

    try {
        const res = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}) 
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("API Error: ", errorData, "Response Status:", res.status);
            throw new Error(errorData.message || 'Data fetching failed');
        }

        return await res.json();
    } catch (err) {
        console.error("Request Failed: ", err);
        throw new Error("Failed to connect to the email service.");
    }
}
export async function checkAlerts() {
    const url = `${process.env.BACKEND_URL}/weather/check-alerts`;
    try {
        const res = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}) 
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("API Error: ", errorData, "Response Status:", res.status);
            throw new Error(errorData.message || 'Data fetching failed');
        }

        return await res.json();
    } catch (err) {
        console.error("Request Failed: ", err);
        throw new Error("Failed to connect to the email service.");
    }
}
export async function getLatestAlert(city: string) {
    const url = `${process.env.BACKEND_URL}/weather/latest-alert/${city}`; 
    // console.log("Fetching history data from URL:", url); 

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Data fetching failed');
    }

    return await res.json();
}