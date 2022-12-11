import { isEmpty } from "lodash-es";
import { createEffect } from "solid-js";
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
  formFile: Partial<IFile> | undefined;
  formFolder: Partial<IFolder> | undefined;
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
  function setFormFolder(data: Partial<IFolder> | undefined) {
    setState("formFolder", data);
  }
  function selectFolder(id: string) {
    setState("folders", {}, (folder) => ({
      selected: id === folder.id ? !folder.selected : false,
    }));
    const files = state.files.filter((file) => file.folderId === id);
    selectFile(files.length ? files[0].id : undefined);
  }
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
  function setFormFile(data: Partial<IFile> | undefined) {
    const isClearSelection = isEmpty(state.formFile);
    setState("formFile", data);
    if (isEmpty(data) && isClearSelection) {
      setState("files", {}, (file) => ({
        selected: false,
      }));
    }
  }
  function selectFile(id?: string) {
    setState("formFile", undefined);
    setState("files", {}, (file) => ({
      selected: id === file.id,
    }));
  }

  function createFile(file: IFile) {
    setState("files", (files) => [...files, { ...file, selected: true }]);
    setState("formFile", undefined);
  }
  function updateFile(id: string, fileInfo: Partial<IFile>) {
    setState(
      "files",
      (file) => file.id === id,
      () => fileInfo
    );
    setState("formFile", undefined);
  }
  function deleteFile(id: string) {
    setState("files", (files) => files.filter((f) => f.id !== id));
  }

  return {
    state,
    get selectedFolder() {
      return state.folders.find((folder: IFolder) => folder.selected);
    },
    get selectedFolderFiles() {
      return this.selectedFolder
        ? this.state.files.filter(
            (file) => file.folderId === this.selectedFolder!.id
          )
        : [];
    },
    setFormFolder,
    selectFolder,
    createFolder,
    updateFolder,
    deleteFolder,
    get selectedFile() {
      return state.files.find((file: IFile) => file.selected);
    },
    setFormFile,
    selectFile,
    createFile,
    updateFile,
    deleteFile,
  };
}

export const treeStore = createLocalStore({
  folders: [],
  files: [],
  formFile: undefined,
  formFolder: undefined,
});
