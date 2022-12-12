import { clsx } from "clsx";
import { createForm } from "@felte/solid";
import { PartialRecord } from "../types";
import { createEffect, onMount, Show } from "solid-js";
import { makeRequest } from "../services";
import { loginStore } from "../stores";

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginDialog = () => {
  const { form, errors, isDirty } = createForm<ILoginForm>({
    validate: (values) => {
      const errors: PartialRecord<keyof ILoginForm, string> = {};

      if (!values.email) {
        errors.email = "Required !";
      }
      if (!values.password) {
        errors.password = "Required !";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const token = await makeRequest<string>({
        url: "/portal/login",
        method: "POST",
        body: {
          username: values.email,
          password: values.password,
          expiration: 40000,
        },
      });
      loginStore.setToken(token);
      closeDialog(true);
    },
  });

  function closeDialog(isSuccess: boolean) {
    window.loginDialog.close();
  }

  createEffect(() => {
    if (loginStore.state.isFormVisible) {
      window.loginDialog.showModal();
    }
  });

  onMount(() => {
    window.loginDialog.addEventListener("close", () => {
      loginStore.hideLoginForm();
    });
  });

  return (
    <dialog id="loginDialog">
      <h1>Login</h1>
      <form method="dialog" class="ui form fluid" use:form>
        {/* form fields */}
        <div class={clsx("field required", errors().email && "error")}>
          <label>Email</label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            autocomplete="true"
          />
        </div>
        <div class={clsx("field required", errors().password && "error")}>
          <label>Password</label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            autocomplete="current-password"
          />
        </div>
        {/* action buttons */}
        <button type="submit" class="ui button primary" disabled={!isDirty()}>
          Login
        </button>
        <button type="reset" class="ui button" disabled={!isDirty()}>
          Reset
        </button>
      </form>
    </dialog>
  );
};
