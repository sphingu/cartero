import { clsx } from "clsx";
import { createEffect, createSignal, onMount } from "solid-js";
import { locationStore } from "../stores";

interface ILoginForm {
  email: string;
  password: string;
}

export const LocationDialog = () => {
  const [value, setValue] = createSignal(locationStore.state.locationId);
  createEffect(() => {
    if (locationStore.state.isFormVisible) {
      window.locationDialog.showModal();
    }
  });

  onMount(() => {
    window.locationDialog.addEventListener("close", () => {
      locationStore.toggleLocationForm();
    });
  });

  function setLocation() {
    locationStore.setLocation(value() ?? "");
    closeDialog();
  }

  function closeDialog() {
    window.locationDialog.close();
  }

  return (
    <dialog id="locationDialog">
      <h1>Location</h1>
      <form method="dialog" class="ui form fluid">
        {/* form fields */}
        <div class={clsx("field required")}>
          <label>Location ID</label>
          <input
            name="locationId"
            placeholder="Location ID"
            type="text"
            value={value()}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </div>
        {/* action buttons */}
        <button type="button" class="ui button primary" onClick={setLocation}>
          Set
        </button>
        <button type="reset" class="ui button" onClick={closeDialog}>
          Close
        </button>
      </form>
    </dialog>
  );
};
