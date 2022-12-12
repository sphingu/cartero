import { createSignal } from "solid-js";
import { css } from "solid-styled";
import { makeRequest } from "../services";
import { IFile, locationStore, loginStore, treeStore } from "../stores";
import { JSONViewer } from "./common";

interface Props {
  file: IFile;
}

export const RequestForm = (props: Props) => {
  const [loading, setLoading] = createSignal(false);
  const [data, setData] = createSignal(props.file);
  const [response, setResponse] = createSignal<any>("");
  css`
    button {
      width: 100%;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex-grow: 1;
    }

    .inputs-container {
      display: flex;
    }
    select,
    button {
      max-width: 80px;
      margin-right: 0 !important;
    }
    input {
      flex-grow: 1;
      margin: 0 0.5rem !important;
    }
  `;

  function onSend() {
    setLoading(true);
    makeRequest({
      url: data().url,
      method: data().method as any,
      body: data().body,
    })
      .then((res) => {
        setResponse(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form
      class="ui form"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <div class="inputs-container">
        <select
          name="method"
          class="ui fluid dropdown"
          value={data().method}
          onChange={(e) =>
            setData((f) => ({ ...f, method: e.currentTarget.value }))
          }
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          name="url"
          type="text"
          placeholder="URL"
          value={data().url}
          onChange={(e) =>
            setData((f) => ({ ...f, url: e.currentTarget.value }))
          }
        />
        <button type="submit" class="ui button">
          Send
        </button>
      </div>
      <textarea
        name="body"
        placeholder="Request body"
        rows={3}
        value={data().body}
        onChange={(e) =>
          setData((f) => ({ ...f, body: e.currentTarget.value }))
        }
      />
      <JSONViewer data={response()}></JSONViewer>
    </form>
  );
};
