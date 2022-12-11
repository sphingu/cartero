import { v4 as uuid } from "uuid";
import toast from "solid-toast";
import { clsx } from "clsx";
import { createForm } from "@felte/solid";
import { treeStore, IFolder } from "../../stores";
import { PartialRecord } from "../../types";
import { onMount } from "solid-js";

interface Props {
  initialData?: Partial<IFolder>;
  onClose?: (isSuccess?: boolean) => void;
}

export const CreateUpdateFolderModal = (props: Props) => {
  const isCreate = !props.initialData?.id;
  const { form, data, errors, isDirty, reset, setData, setInitialValues } =
    createForm<IFolder>({
      validate: (values) => {
        const errors: PartialRecord<keyof IFolder, string> = {};

        if (!values.name) {
          errors.name = "Required !";
        }

        return errors;
      },
      onSubmit: (values) => {
        if (isCreate) {
          treeStore.createFolder({ ...values, id: uuid() });
          toast.success("Folder create successfully");
        } else {
          treeStore.updateFolder(props.initialData?.id!, {
            ...values,
            id: props.initialData?.id,
          });
          toast.success("Folder updated successfully");
        }
        console.log(values);
        closeDialog(true);
      },
      initialValues: props.initialData,
    });

  function closeDialog(isSuccess: boolean) {
    window.folderFormDialog.close();
    props.onClose && props.onClose(isSuccess);
  }

  onMount(() => {
    window.folderFormDialog.showModal();
  });

  return (
    <dialog id="folderFormDialog">
      <h1>{isCreate ? "Create" : "Update"} Folder</h1>
      <form method="dialog" class="ui form fluid" use:form>
        {/* form fields */}
        <div class={clsx("field required", errors().name && "error")}>
          <label>Name</label>
          <input name="name" placeholder="Name" type="text" />
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
