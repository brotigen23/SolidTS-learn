import { For, Show, type Accessor } from 'solid-js'
import type { Project } from '../types'

export type ProjectListProps = {
    projects: Accessor<Project[] | undefined>;
    loading: Accessor<boolean>;
    error: Accessor<unknown>;

    selectedID: Accessor<number | null>;

    onSelect: (id: number) => void;
}

export default function ProjectList(props: ProjectListProps){
    console.log(props)
    return (
              <section>
                <h2>
                  Проекты
                </h2>
                <Show when={!props.loading()} fallback={<p>Загружаем проекты...</p>}>
                  <Show when={!props.error()} fallback={<p>Ошибка:{String(props.error())}</p>}>
                    <ul>
                      <For each={props.projects()}>
                        {(project) => (
                          <li onclick={() => {props.onSelect(project.id)}}>
                            {project.name}
                          </li>
                        )}
                      </For>
                    </ul>
                  </Show>
                </Show>
              </section>
        
    )
}