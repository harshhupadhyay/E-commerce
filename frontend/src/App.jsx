import { RouterProvider } from "react-router";
import router from "./routes/AppRouter";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
