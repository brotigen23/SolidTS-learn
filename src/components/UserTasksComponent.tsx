import TaskList from "./TaskListComponent";
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

export default function UserTasks(props: TaskListProps) {
  const [title, setTitle] = createSignal<string>("");
  const [submiting, setSubmiting] = createSignal<boolean>(false);
  const [tasks, { refetch }] = createResource<Task[], number | null>(
    props.projectID,
    (id) => getTasks(id as number),
  );

  return (
    <section>
      <h2>
        <Show when={props.projectID} fallback={"Выберите проект"}>
          {(id) => <>Задачи проекта №{id()}</>}
        </Show>
      </h2>
      <TaskCreate
        afterCreate={refetch}
        projectID={props.projectID}
        submitingSignal={[submiting, setSubmiting]}
        titleSignal={[title, setTitle]}
      />
      <TaskList />
    </section>
  );
}
