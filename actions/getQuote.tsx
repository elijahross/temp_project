"use server"

interface ChuckNorrisQuote {
        categories: string[];
        icon_url: string;
        id: string;
        url: string;
        value: string;
}

// This function fetches the quote from the Chuck Norris API
// Additional Infomation for this endpoint is: https://api.chucknorris.io/
export default async function GetQuote() {
    try {
    const response = await fetch('https://api.chucknorris.io/jokes/random?category=dev').then(res => res.json()) as ChuckNorrisQuote;
    return {status:"200", image: response.icon_url, message: response.value};
    } catch (e) {
        return {status:"500", image: "", message: "ERROR: Could not fetch the quote. Please try again later."};
    }
}
