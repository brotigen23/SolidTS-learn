import type {  Task } from "../types";

import { BASE_URL } from "../config";

export async function getTasks(projectID: number): Promise<Task[]>{
    const result = await fetch(`${BASE_URL}/tasks?projectId=${projectID}`);
    if (!result.ok){
        throw new Error("Не удалось загрузить задачи")
    }
    return result.json()
}

export async function addTask(input: {projectID: number, title: string, done?: boolean}):Promise<Task> {
    const result = await fetch(`${BASE_URL}/tasks`, 
        {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({done: false, ...input}),
        }
    );
    if (!result.ok){
        throw new Error("Не удалось создать задачу")
    }
    return result.json()
}
