import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { PersonCard } from "./components/PersonCard/PersonCard";
import { MainTable } from "./components/MainTable/MainTable";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./App.css";
import { RequireAuth } from "./hoc/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="registration" element={<Registration />} />

          <Route
            path="table"
            element={
              <RequireAuth>
                <MainTable />
              </RequireAuth>
            }
          />
          <Route
            path="table/personCard/:id"
            element={
              <RequireAuth>
                <PersonCard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
