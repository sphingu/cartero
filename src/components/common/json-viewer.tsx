import { createEffect, onMount } from "solid-js";
import { v4 as uuid } from "uuid";
// @ts-ignore
import { JsonView } from "@zerodevx/svelte-json-view";
import { css } from "solid-styled";

interface Props {
  data: Record<string, unknown>;
}

export const JSONViewer = (props: Props) => {
  const id = uuid();
  createEffect(() => {
    (document.getElementById(id) as HTMLElement).textContent = "";
    new JsonView({
      target: document.getElementById(id),
      props: {
        json: props.data,
        depth: 1,
        _lvl: 1,
      },
    });
  });
  return (
    <section
      style="position: relative;flex-grow: 1; max-height: 500px; overflow-y:auto;"
      class="blur-container"
    >
      <div class="ui label blue top right attached">
        1
        <a class="detail">
          <i class="icon close"></i>
        </a>
      </div>
      <div id={id} style="margin-top: 0 !important;"></div>
    </section>
  );
};
