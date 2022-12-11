import { createEffect, onMount } from "solid-js";
import { createStore } from "solid-js/store";

export type IFolder = {
  id: string;
  name: string;
  selected?: boolean;
};

export type IFile = IFolder & {
  folderId: string;
  url: string;
  method: string;
  body?: string;
};

type ITreeStore = {
  folders: IFolder[];
  files: IFile[];
};

const LOCAL_STORAGE_KEY = "oddyen-tree";
function createLocalStore(value: ITreeStore) {
  const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const [state, setState] = createStore<ITreeStore>(
    stored ? JSON.parse(stored) : value
  );

  createEffect(() =>
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  );

  //  FOLDER OPERATIONS
  const selectFolder = (id: string) => {
    setState("folders", {}, (folder) => ({
      selected: id === folder.id ? !folder.selected : folder.selected,
    }));
  };

  function createFolder(folder: IFolder) {
    setState("folders", (folders) => [...folders, folder]);
  }
  function updateFolder(id: string, folderInfo: Partial<IFolder>) {
    setState(
      "folders",
      (folder) => folder.id === id,
      () => folderInfo
    );
  }
  function deleteFolder(id: string) {
    setState("folders", (folders) => folders.filter((f) => f.id !== id));
  }

  // FILE OPERATIONS

  const selectFile = (id: string) => {
    setState("files", {}, (file) => ({
      selected: id === file.id ? true : false,
    }));
  };

  function createFile(file: IFile) {
    setState("files", (files) => [...files, file]);
  }
  function updateFile(id: string, fileInfo: Partial<IFile>) {
    setState(
      "files",
      (file) => file.id === id,
      () => fileInfo
    );
  }
  function deleteFile(id: string) {
    setState("files", (files) => files.filter((f) => f.id !== id));
  }

  return {
    state,
    selectFolder,
    createFolder,
    updateFolder,
    deleteFolder,
    selectFile,
    createFile,
    updateFile,
    deleteFile,
  };
}

export const treeStore = createLocalStore({
  folders: [],
  files: [],
});
