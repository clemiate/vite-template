
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EditableTable from "@/pages/EditableTable";
import Echarts from "@/pages/Echarts";
import JqueryDemo from "@/pages/Jquery";

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
  },
  {
    path: "/echarts",
    element: <Echarts />,
  },
  {
    path: "/jquery",
    element: <JqueryDemo />,
  }
]);

export default router;
