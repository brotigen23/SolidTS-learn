import type { Task } from "../types";
import { BASE_URL } from "../config";

export async function getTasks(projectID: number): Promise<Task[]> {
  const result = await fetch(`${BASE_URL}/tasks?projectId=${projectID}`);
  if (!result.ok) {
    throw new Error("Не удалось загрузить задачи");
  }
  return result.json();
}

export async function addTask(input: {
  projectId: number;
  title: string;
  done?: boolean;
}): Promise<Task> {
  const result = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: false, ...input }),
  });
  if (!result.ok) {
    throw new Error("Не удалось создать задачу");
  }
  return result.json();
}

export async function updateTask(
  taskID: number,
  task: Partial<Task>,
): Promise<Task> {
  const result = await fetch(`${BASE_URL}/tasks/${taskID}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!result.ok) {
    throw new Error("Не удалось обновить задачу");
  }

  return result.json();
}

export async function deleteTask(taskID: number): Promise<Task> {
  const result = await fetch(`${BASE_URL}/tasks/${taskID}`, {
    method: "DELETE",
  });
  if (!result.ok) {
    throw new Error("Не удалось удалить задачу");
  }

  return result.json();
}

export async function putTask(taskID: number, task: Task): Promise<Task> {
  const result = await fetch(`${BASE_URL}/tasks/${taskID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!result.ok) {
    throw new Error("Не удалось обновить задачу");
  }

  return result.json();
}

export async function renameTask(taskID: number, name: string): Promise<Task> {
  return updateTask(taskID, { title: name });
}
