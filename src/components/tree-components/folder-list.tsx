import clsx from "clsx";
import { createSignal, For, Show } from "solid-js";
import { css } from "solid-styled";
import { IFile, IFolder, treeStore } from "../../stores";
import { CreateUpdateFileModal } from "./create-update-file-modal";
import { CreateUpdateFolderModal } from "./create-update-folder-modal";
import { FileList } from "./file-list";

interface Props {
  list: IFolder[];
  onAddEditFolder: (folder?: IFolder) => void;
  onDeleteFolder: (folder: IFolder) => void;
}

const FolderListUI = (props: Props) => {
  css`
    .header {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
    }
  `;
  return (
    <div class="ui middle aligned selection list list-container">
      <For each={props.list}>
        {(folder) => (
          <div
            tabindex={0}
            class={clsx("item", folder.selected && "active")}
            onClick={() => treeStore.selectFolder(folder.id)}
          >
            <i class="folder icon" style="vertical-align: middle"></i>
            <div class="content">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div class="header">{folder.name}</div>
                <div>
                  <div class="ui icon buttons mini compact">
                    <button
                      class="ui button primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onAddEditFolder(folder);
                      }}
                    >
                      <i class="edit icon"></i>
                    </button>
                    <button
                      class="mini ui button negative"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onDeleteFolder(folder);
                      }}
                    >
                      <i class="trash icon"></i>
                    </button>
                  </div>
                  <button
                    class="ui button mini compact icon"
                    style="margin-left: 1rem;"
                  >
                    <i
                      class={clsx(
                        "icon chevron",
                        folder.selected ? "down" : "right"
                      )}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            {folder.selected && (
              <FileList
                folderId={folder.id}
                list={treeStore.state.files.filter(
                  (file) => file.folderId === folder.id
                )}
              />
            )}
          </div>
        )}
      </For>
    </div>
  );
};

export const FolderList = () => {
  const [selectedFolder, setSelectedFolder] = createSignal<
    Partial<IFolder> | undefined
  >();
  const [selectedFile, setSelectedFile] = createSignal<
    Partial<IFile> | undefined
  >();
  const onFolderAddEditClick = (folder?: IFolder) => {
    setSelectedFolder(folder || {});
  };
  const onFolderDelete = (folder: IFolder) => {
    if (window.confirm(`Are you sure to delete ${folder.name} ?`)) {
      treeStore.deleteFolder(folder.id);
    }
  };

  return (
    <>
      <div>
        <button
          class="ui button primary"
          onClick={() => onFolderAddEditClick()}
          style="align-self: flex-start"
        >
          <i class="icon folder outline"></i>
          Create Folder
        </button>
      </div>
      <Show
        when={treeStore.state.folders.length}
        fallback={
          <div class="ui placeholder segment">
            <div class="ui icon header">
              <i class="folder outline icon"></i>
              No folders available.
            </div>
            <button
              class="ui primary button"
              onClick={() => onFolderAddEditClick()}
            >
              <i class="icon folder outline"></i>
              Create Folder
            </button>
          </div>
        }
      >
        <FolderListUI
          list={treeStore.state.folders}
          onAddEditFolder={onFolderAddEditClick}
          onDeleteFolder={onFolderDelete}
        />
      </Show>

      <Show when={selectedFolder()}>
        <CreateUpdateFolderModal
          initialData={selectedFolder()}
          onClose={() => setSelectedFolder(undefined)}
        />
      </Show>
    </>
  );
};
