import {Pjesme, Pjevaci} from "./types";
import {dataApi} from "./path";


export async function getPjesma(): Promise<Pjesme[]> {
    const response = await fetch(dataApi.getPjesma, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export async function getPjevac(): Promise<Pjevaci[]> {
    const response = await fetch(dataApi.getPjevaci, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    return response.json();
}
