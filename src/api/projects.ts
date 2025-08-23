import type { Project } from "../types";

import { BASE_URL } from "../config";

export async function getProjects(): Promise<Project[]>{
    const result = await fetch(`${BASE_URL}/projects`);
    if (!result.ok){
        throw new Error("Не удалось загрузить проекты")
    }
    // console.log(result.body)
    // const data = await result.json();
    // console.log(data)
    return result.json()
}