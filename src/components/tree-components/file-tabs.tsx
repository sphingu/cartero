import clsx from "clsx";
import { isEmpty } from "lodash-es";
import { For, Show } from "solid-js";
import { treeStore } from "../../stores";
import { CreateUpdateFileModal } from "./create-update-file-modal";

export const FileTabs = () => {
  function onAddFile() {
    treeStore.selectFile();
    treeStore.setFormFile({});
  }
  return (
    <Show when={treeStore.selectedFolder}>
      <div class="ui attached tabular menu">
        <For each={treeStore.selectedFolderFiles}>
          {(file) => (
            <a
              href="#"
              onClick={() => treeStore.selectFile(file.id)}
              class={clsx("item", file.selected && "active")}
            >
              {file.name}
            </a>
          )}
        </For>
        <div class="right menu">
          <a
            href="#"
            class={clsx(
              "item",
              treeStore.state.formFile !== undefined &&
                isEmpty(treeStore.state.formFile) &&
                "active"
            )}
            onClick={onAddFile}
          >
            <i class="add icon"></i> New File
          </a>
        </div>
      </div>
      <div class="ui bottom attached segment" style="flex-grow: 1">
        <Show when={treeStore.selectedFile && !treeStore.state.formFile}>
          <button
            class="ui button primary icon"
            onClick={() => treeStore.setFormFile(treeStore.selectedFile)}
          >
            <i class="edit icon"></i>
          </button>
          <button
            class="ui button negative icon"
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure to delete ${treeStore.selectedFile!.name} file?`
                )
              ) {
                treeStore.deleteFile(treeStore.selectedFile!.id);
              }
            }}
          >
            <i class="trash icon"></i>
          </button>
        </Show>
        <Show when={treeStore.state.formFile}>
          <CreateUpdateFileModal />
        </Show>
        {/* <JSONViewer data={{ file: treeStore }} /> */}
      </div>
    </Show>
  );
};
