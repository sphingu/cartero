import { v4 as uuid } from "uuid";
import toast from "solid-toast";
import { clsx } from "clsx";
import { createForm } from "@felte/solid";
import { treeStore, IFile, IFolder } from "../../stores";
import { PartialRecord } from "../../types";
import { onMount } from "solid-js";

interface Props {
  initialData?: Partial<IFile>;
  onClose?: (isSuccess?: boolean) => void;
}

export const CreateUpdateFileModal = (props: Props) => {
  const isCreate = !props.initialData?.id;
  const { form, data, errors, isDirty, reset, setData, setInitialValues } =
    createForm<IFile>({
      validate: (values) => {
        const errors: PartialRecord<keyof IFile, string> = {};
        console.log("values", values);
        if (!values.name) {
          errors.name = "Required !";
        }
        if (!values.method) {
          errors.method = "Required !";
        }
        if (!values.url) {
          errors.url = "Required !";
        }

        return errors;
      },
      onSubmit: (values) => {
        if (isCreate) {
          treeStore.createFile({
            ...values,
            folderId: props.initialData?.folderId as string,
            id: uuid(),
          });
          toast.success("File create successfully");
        } else {
          treeStore.updateFile(props.initialData?.id!, {
            ...values,
            id: props.initialData?.id,
          });
          toast.success("File updated successfully");
        }
        closeDialog(true);
      },
      initialValues: props.initialData,
    });

  function closeDialog(isSuccess: boolean) {
    window.fileFormDialog.close();
    props.onClose && props.onClose(isSuccess);
  }

  onMount(() => {
    window.fileFormDialog.showModal();
  });

  return (
    <dialog id="fileFormDialog">
      <h1>{isCreate ? "Create" : "Update"} File</h1>
      <form method="dialog" class="ui form fluid" use:form>
        {/* form fields */}
        <div class={clsx("field required", errors().name && "error")}>
          <label>Name</label>
          <input name="name" placeholder="Name" type="text" />
        </div>
        <div class={clsx("field required", errors().method && "error")}>
          <label>Method</label>
          <select class="ui fluid dropdown" name="method">
            <option value="">Select Method</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div class={clsx("field required", errors().url && "error")}>
          <label>URL</label>
          <input name="url" placeholder="URL" type="url" />
        </div>
        <div class={clsx("field", errors().body && "error")}>
          <label>Body</label>
          <textarea
            rows="3"
            name="body"
            placeholder="Body"
            disabled={data().method === "GET"}
          />
        </div>
        {/* action buttons */}
        <button type="submit" class="ui button primary" disabled={!isDirty()}>
          {isCreate ? "Create" : "Update"}
        </button>
        <button type="reset" class="ui button" disabled={!isDirty()}>
          Reset
        </button>
        <button
          type="button"
          class="ui button basic"
          onClick={() => closeDialog(false)}
        >
          Close
        </button>
      </form>
    </dialog>
  );
};
