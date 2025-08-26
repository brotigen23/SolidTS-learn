import { createResource, createSignal, For, Show, type Accessor } from 'solid-js'
import type { Task } from '../types'
import { getTasks, addTask, updateTask, deleteTask } from '../api/tasks';
import type { JSX } from 'solid-js/h/jsx-runtime';

export type TaskListProps = {
    projectID: Accessor<number | null>;
}

export default function TaskList(props: TaskListProps){
    const [tasks, {refetch}] = createResource<Task[], number | null>(props.projectID, (id) => getTasks(id as number));
    const [title, setTitle] = createSignal<string>("");
    const [submiting, setSubmiting] = createSignal<boolean>(false);
    const onTitleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {setTitle(e?.currentTarget.value)}

    const onCreate: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (e) => {
      e.preventDefault();
      const projectID = props.projectID();
      
      const text = title().trim();
      if (!projectID || !text) return;
      try{
        setSubmiting(true);
        await addTask({projectId: projectID, title: text});

        setTitle("");
        await refetch();
      } finally {
        setSubmiting(false);
      }
    }

    const toggleDone:(task: Task) => void = async (task: Task) => {await updateTask(task.id, {done: !task.done}); refetch()};

    const remove:(task: Task) => void = async (task:Task) => {await deleteTask(task.id); refetch()}

    return (
      <section>
        <h2>
          <Show when={props.projectID} fallback={"Выберите проект"}>
            {(id) => <>Задачи проекта №{id()}</>}
          </Show>
        </h2>
        <form onsubmit={onCreate}>
          <input type='text' placeholder='Добавить задачу' value={title()} oninput={onTitleInput} disabled={!props.projectID() || submiting()}/>
          <button type='submit' disabled={!props.projectID() || submiting()}>
            Добавить
          </button>
        </form>
        <Show when={props.projectID} fallback={<p>Пока не выбран проект</p>}>
          <Show when={!tasks.loading} fallback={<p>Загружаем задачи...</p>}>
            <Show when={!tasks.error} fallback={<p>Ошибка:{String(tasks.error)}</p>}>            
              <ul>
                <For each={tasks() ?? []}>
                  {(task) => (
                    <>
                    <li>
                      <input type='checkbox' checked={task.done} onchange={() => toggleDone(task)} />
                      <span>
                        {task.title}
                      </span>
                    </li>                    
                    <button type='button' onclick={() => remove(task)}>
                      Удалить
                    </button>
                    </>
                  )}
                </For>
              </ul>
              <Show when={tasks() && tasks()!.length == 0}>
                <p>В этом проекте нет задач</p>
              </Show>
            </Show>
          </Show>
        </Show>
      </section>        
    )
}
