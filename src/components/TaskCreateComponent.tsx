import { type Accessor, type Setter } from "solid-js";
import { addTask } from "../api/tasks";
import type { JSX } from "solid-js/h/jsx-runtime";

export type TaskCreateSignal = [Accessor<boolean>, Setter<boolean>];
export type TitleSignal = [Accessor<string>, Setter<string>];
type CreateTaskProps = {
  submitingSignal: TaskCreateSignal;
  titleSignal: TitleSignal;
  projectID: Accessor<number | null>;
  afterCreate: (info?: unknown) => unknown | Promise<unknown>;
};

export default function TaskCreate(props: CreateTaskProps) {
  const [submiting, setSubmiting] = props.submitingSignal;
  const [title, setTitle] = props.titleSignal;

  const onCreate: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e,
  ) => {
    e.preventDefault();
    const projectID = props.projectID();

    const text = title().trim();
    if (!projectID || !text) return;
    try {
      setSubmiting(true);
      await addTask({ projectId: projectID, title: text });

      setTitle("");
      await props.afterCreate();
    } finally {
      setSubmiting(false);
    }
  };
  const onTitleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    setTitle(e?.currentTarget.value);
  };

  return (
    <form onsubmit={onCreate}>
      <input
        type="text"
        placeholder="Добавить задачу"
        value={title()}
        oninput={onTitleInput}
        disabled={!props.projectID() || submiting()}
      />
      <button type="submit" disabled={!props.projectID() || submiting()}>
        Добавить
      </button>
    </form>
  );
}
