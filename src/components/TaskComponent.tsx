import { updateTask, deleteTask } from "../api/tasks";
import type { Task } from "../types";

export type TaskProps = {
  task: Task;
  afterChange: (info?: unknown) => unknown | Promise<unknown>;
};

export default function TaskComponent(props: TaskProps) {
  const toggleDone: (task: Task) => void = async (task: Task) => {
    await updateTask(task.id, { done: !task.done });
    props.afterChange();
  };

  const remove: (task: Task) => void = async (task: Task) => {
    await deleteTask(task.id);
    props.afterChange();
  };
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={props.task.done}
          onchange={() => toggleDone(props.task)}
        />
        <span>{props.task.title}</span>
      </li>
      <button type="button" onclick={() => remove(props.task)}>
        Удалить
      </button>
    </>
  );
}
