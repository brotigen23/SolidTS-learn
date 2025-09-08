import {
  createResource,
  createSignal,
  For,
  Show,
  type Accessor,
} from "solid-js";
import type { Task } from "../types";
import { getTasks } from "../api/tasks";
import TaskCreate from "./TaskCreateComponent";
import TaskComponent from "./TaskComponent";

export type TaskListProps = {
  projectID: Accessor<number | null>;
  tasks: Task[];
};

export default function TaskList(props: TaskListProps) {
  return (
    <Show when={props.projectID} fallback={<p>Пока не выбран проект</p>}>
      <Show when={!props.tasks.loading} fallback={<p>Загружаем задачи...</p>}>
        <Show
          when={!tasks.error}
          fallback={<p>Ошибка:{String(tasks.error)}</p>}
        >
          <ul>
            <For each={tasks() ?? []}>
              {(task) => <TaskComponent task={task} afterChange={refetch} />}
            </For>
          </ul>
          <Show when={tasks() && tasks()!.length == 0}>
            <p>В этом проекте нет задач</p>
          </Show>
        </Show>
      </Show>
    </Show>
  );
}
