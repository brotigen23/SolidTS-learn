import { createResource, createSignal, For, Show, type Accessor } from 'solid-js'
import type { Task } from '../types'
import { getTasks, addTask } from '../api/tasks';
import type { JSX } from 'solid-js/h/jsx-runtime';

export type TaskListProps = {
    projectID: Accessor<number | null>;
}

export default function TaskList(props: TaskListProps){
    const [tasks] = createResource<Task[], number | null>(props.projectID, (id) => getTasks(id as number));
    const [title, setTitle] = createSignal<string>("");
    const onTitleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {setTitle(e?.currentTarget.value)}
    const onCreate: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {}
    return (
      <section>
        <h2>
          <Show when={props.projectID} fallback={"Выберите проект"}>
            {(id) => <>Задачи проекта №{id()}</>}
          </Show>
        </h2>
        <form onsubmit={()}></form>
        <Show when={props.projectID} fallback={<p>Пока не выбран проект</p>}>
          <Show when={!tasks.loading} fallback={<p>Загружаем задачи...</p>}>
            <Show when={!tasks.error} fallback={<p>Ошибка:{String(tasks.error)}</p>}>            
              <ul>
                <For each={tasks() ?? []}>
                  {(task) => (
                    <li>
                      <input type='checkbox' checked={task.done} />
                      <span>
                        {task.title}
                      </span>
                    </li>
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
