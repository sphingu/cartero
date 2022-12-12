/* @refresh reload */
import { render } from "solid-js/web";

import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";
import { Toaster } from "solid-toast";
import { Footer, Header, LocationDialog, LoginDialog } from "./components";

render(
  () => (
    <>
      <Toaster />
      <LoginDialog />
      <LocationDialog />
      <Header />
      <App />
      <Footer />
    </>
  ),
  document.getElementById("root") as HTMLElement
);
