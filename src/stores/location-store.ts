import { createEffect, onMount } from "solid-js";
import { createStore } from "solid-js/store";

interface ILocationStore {
  locationId?: string;
  isFormVisible?: boolean;
}
const LOCAL_STORAGE_KEY = "oddyen-location";

function createLocalStore() {
  const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const [state, setState] = createStore<ILocationStore>(
    stored ? JSON.parse(stored) : { locationId: "", isFormVisible: false }
  );

  createEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    window.localStorage.setItem("location", state.locationId ?? "");
  });

  onMount(() => {
    setState("isFormVisible", false);
  });

  return {
    state,
    setLocation: (value: string) => {
      setState("locationId", value);
    },
    toggleLocationForm: () => setState("isFormVisible", (value) => !value),
  };
}

export const locationStore = createLocalStore();
