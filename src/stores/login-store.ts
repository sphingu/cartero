import { createEffect, onMount } from "solid-js";
import { createStore } from "solid-js/store";

interface ILoginStore {
  token?: string;
  isFormVisible?: boolean;
}
const LOCAL_STORAGE_KEY = "oddyen-token";
function createLocalStore() {
  const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const [state, setState] = createStore<ILoginStore>(
    stored ? JSON.parse(stored) : { token: "", isFormVisible: false }
  );

  createEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    window.localStorage.setItem("token", state.token ?? "");
  });

  onMount(() => {
    setState("isFormVisible", false);
  });

  return {
    state,
    showLoginForm: () => {
      setState("isFormVisible", true);
    },
    hideLoginForm: () => setState("isFormVisible", false),
    setToken: (value: string) => setState("token", value),
  };
}

export const loginStore = createLocalStore();
