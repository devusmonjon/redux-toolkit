import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Create from "./pages/create/create";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
