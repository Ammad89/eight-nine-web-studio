import { RouterProvider } from "react-router";
import { WebsiteProvider } from "../cms-core/platform";
import { router } from "./routes";

export default function App() {
  return (
    <WebsiteProvider>
      <RouterProvider router={router} />
    </WebsiteProvider>
  );
}
