import { Component } from "solid-js";
import { css } from "solid-styled";
import { FolderList, FileTabs } from "./components";

const App: Component = () => {
  css`
    main {
      flex-direction: row;
    }
    section {
      display: flex;
      flex-direction: column;
    }
    .file-tabs {
      flex-grow: 1;
    }
    .folder-list {
      min-width: 300px;
    }
  `;
  return (
    <main class="ui main container">
      <section class="folder-list">
        <FolderList />
      </section>
      <section class="file-tabs">
        <FileTabs />
      </section>
    </main>
  );
};

export default App;
