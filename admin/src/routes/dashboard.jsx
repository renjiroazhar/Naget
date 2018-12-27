// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import SecurityIcon from "@material-ui/icons/Security";
// Views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import AreasTable from "views/Area/AreasTable/AreasTable.jsx";
import AddAreas from "views/Area/AddAreas/AddAreas.jsx";
import AdminTable from "views/Admin/AdminTable/AdminTable.jsx";
import AddAdmin from "views/Admin/AddAdmin/AddAdmin.jsx";
import AddUser from "views/User/AddUser/AddUser.jsx";
import UserTable from "views/User/UserTable/UserTable.jsx";
import UserSetting from "views/User/UserSetting/UserSetting";
import OrderTable from "views/Order/OrderTable/OrderTable.jsx";

import ProfileSetting from "views/Profile/ProfileSetting/ProfileSetting.jsx";
import ChangePassword from "views/Profile/ChangePassword/ChangePassword.jsx";
const dashboardRoutes = [
  //Main Section
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "Users",
    navbarName: "Users",
    icon: Person,
    component: UserTable
  },
  {
    path: "/order",
    sidebarName: "Orders",
    navbarName: "Orders",
    icon: "content_paste",
    component: OrderTable
  },
  {
    path: "/areas",
    sidebarName: "Areas",
    navbarName: "Areas",
    icon: LocationOn,
    component: AreasTable
  },
  {
    path: "/admin",
    sidebarName: "Admin",
    navbarName: "Admin",
    icon: SecurityIcon,
    component: AdminTable
  },

  // ---New Section---

  //Profile
  {
    path: "/profile_setting",
    sidebarName: "",
    navbarName: "",
    icon: "",
    component: ProfileSetting,
    disable: true
  },
  {
    path: "/change_password",
    sidebarName: "",
    navbarName: "",
    icon: "",
    component: ChangePassword,
    disable: true
  },

  //User
  {
    path: "/add_user",
    sidebarName: "",
    navbarName: "",
    icon: "",
    component: AddUser,
    disable: true
  },
  {
    path: "/user_setting/:id",
    sidebarName: "",
    navbarName: "",
    icon: "",
    component: UserSetting,
    disable: true
  },

  // Areas
  {
    path: "/add_areas",
    sidebarName: "",
    navbarName: "",
    icon: "",
    component: AddAreas,
    disable: true
  },

  // Admin
  {
    path: "/add_admin",
    sidebarName: "",
    navbarName: "",
    icon: "",
    component: AddAdmin,
    disable: true
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
