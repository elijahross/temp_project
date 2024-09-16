"use server"

interface ChuckNorrisQuote {
        icon_url: string;
        id: string;
        url: string;
        value: string;
}

export default async function GetQuote() {
    try {
    const response = await fetch('https://api.chucknorris.io/jokes/random').then(res => res.json()) as ChuckNorrisQuote;
    return {status:"200", image: response.icon_url, message: response.value};
    } catch (e) {
        return {status:"500", image: "", message: "ERROR: Could not fetch the quote. Please try again later."};
    }
}
