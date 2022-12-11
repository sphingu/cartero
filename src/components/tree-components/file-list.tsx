import clsx from "clsx";
import { For } from "solid-js";
import { css } from "solid-styled";
import { IFile, treeStore } from "../../stores";

interface Props {
  folderId: string;
  list: IFile[];
  onAddEdit: (folderId: string, file?: IFile) => void;
  onDelete: (file: IFile) => void;
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
              onClick={() => props.onAddEdit(props.folderId)}
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
                <div class="ui icon buttons mini">
                  <button
                    class="ui button primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onAddEdit(props.folderId, file);
                    }}
                  >
                    <i class="edit icon"></i>
                  </button>
                  <button
                    class="mini ui button negative"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onDelete(file);
                    }}
                  >
                    <i class="trash icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
