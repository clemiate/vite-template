
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EditableTable from "@/pages/EditableTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   { path: "editableTable", element: <EditableTable /> },
    // ]
  },
  {
    path: "/editableTable",
    element: <EditableTable />,
  }
]);

export default router;
