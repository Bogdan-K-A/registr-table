import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { PersonCard } from "./pages/PersonCard";
import { Table } from "./components/Table/Table";
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
                <Table />
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
