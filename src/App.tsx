import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Create from "./pages/create/create";

const App = () => {
  return (
    <>
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
