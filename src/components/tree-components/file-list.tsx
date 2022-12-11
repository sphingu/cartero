import clsx from "clsx";
import { For } from "solid-js";
import { css } from "solid-styled";
import { IFile, treeStore } from "../../stores";

interface Props {
  folderId: string;
  list: IFile[];
}

export const FileList = (props: Props) => {
  css`
    .active {
      background: #ffffff60 !important;
    }
  `;
  return (
    <div class="ui list selection" onClick={(e) => e.stopPropagation()}>
      <For
        each={props.list}
        fallback={
          <div class="ui placeholder segment">
            <div class="ui icon header" style="margin: 2rem 0 1rem">
              <i class="file outline icon"></i>
              No files available.
            </div>
            <button
              class="ui primary button"
              onClick={() => treeStore.setFormFile({})}
            >
              <i class="icon file outline"></i>
              Create File
            </button>
          </div>
        }
      >
        {(file) => (
          <div
            class={clsx("item", file.selected && "active")}
            tabindex={0}
            onClick={() => {
              treeStore.selectFile(file.id);
            }}
          >
            <i class="file icon" style="vertical-align: middle"></i>
            <div class="content">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div class="header">{file.name}</div>
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
