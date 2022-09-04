import { Routes, Route } from 'react-router-dom';
// Layouts
import Layout from './components/Layouts/Layout';
import PanelLayout from './components/Layouts/PanelLayout';
import RequireAuth from './components/Layouts/RequireAuth';
import PersistLogin from './components/Layouts/PersistLogin';
// Login
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import LoginRedir from './features/auth/LoginRedir';
import Admin from './components/admin/Admin';
// Users CRUD
import Users from './features/users/Users';
import ReadUserInfo from './features/users/ReadUserInfo';
// Models CRUD
import Models from './features/models/Models';
import AddModel from './features/models/AddModel';
import ReadModel from './features/models/ReadModel';
import AddUser from './features/users/AddUser';


import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>     
        <Route index element={<Login />}/>   
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* Protected */}
        <Route element={<PersistLogin />}>
          <Route path="/redir" element={<LoginRedir />} />
          <Route element={<RequireAuth allowedRoles={[2004]} />}>
            <Route path="panel" element={<PanelLayout role={2004}/>}>
              <Route index element={<Admin />}/>
                <Route path="users">
                  <Route index element={<Users />}/>
                  <Route path="add" element={<AddUser />}/>
                  <Route path=":id" element={<ReadUserInfo />}/>
                </Route>
                <Route path="models">
                  <Route index element={<Models />}/>
                  <Route path="add" element={<AddModel />}/>
                  <Route path=":id" element={<ReadModel />}/>
                </Route>
            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
