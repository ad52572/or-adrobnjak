import {dataApi} from "./path";
import {ResponseFile} from "./types";
import {Pjevaci} from "../index/types";


export async function getAll(): Promise<ResponseFile[]> {
    const response = await fetch(dataApi.getJson, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    return response.json();
}
export async function getJson(file:string): Promise<File> {
    const response = await fetch( file , {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export async function getAllJson(): Promise<Pjevaci[]> {
    const response = await fetch( dataApi.getAllJson , {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export async function postJson(file: FormData): Promise<void> {
    await fetch( dataApi.getJson , {
        method: "POST",
        body: file,
    });
}

export async function deleteFile(file:string): Promise<void> {
    await fetch( file , {
        method: "DELETE",
    });
}