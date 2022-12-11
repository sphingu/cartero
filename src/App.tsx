import type { Component } from "solid-js";
import { FolderList } from "./components";

const App: Component = () => {
  return (
    <main class="ui main container">
      <FolderList />
    </main>
  );
};

export default App;
