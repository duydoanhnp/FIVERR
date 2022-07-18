import "./App.css";
import { createBrowserHistory } from "history";
import routes from "./routes/routes";
import Login from "./pages/Login/Login";
import Gig from "./pages/Admin/Gig/Gig";
import Users from "./pages/Admin/Users/Users";
import AddGig from "./pages/Admin/Gig/AddGig";
import EditImg from "./pages/Admin/Gig/EditImg";
import EditGig from "./pages/Admin/Gig/EditGig";
import Register from "./pages/Register/Register";
import Personal from "./pages/Personal/Personal";
import AddUser from "./pages/Admin/Users/AddUser";
import EditUser from "./pages/Admin/Users/EditUser";
import UserInfo from "./pages/Admin/Users/UserInfo";
import { Route, Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";

export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate exact path="/login" component={Login} />
        <HomeTemplate exact path="/register" component={Register} />
        <HomeTemplate exact path="/personal/:id" component={Personal} />

        <AdminTemplate path="/admin/user" exact component={Users} />
        <AdminTemplate
          path="/admin/user/infouser/:id"
          exact
          component={UserInfo}
        />
        <AdminTemplate path="/admin/user/adduser" exact component={AddUser} />
        <AdminTemplate
          path="/admin/user/edituser/:id"
          exact
          component={EditUser}
        />

        <AdminTemplate path="/admin/gig" exact component={Gig} />
        <AdminTemplate
          path="/admin/gig/editgig/:id"
          exact
          component={EditGig}
        />
        <AdminTemplate path="/admin/gig/addgig" exact component={AddGig} />
        <AdminTemplate
          path="/admin/gig/editimg/:id"
          exact
          component={EditImg}
        />
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
