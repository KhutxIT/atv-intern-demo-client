import { createWebHistory, createRouter } from "vue-router";
import { Role } from '../common/role';
import store from '../store/index';

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("../views/Home"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login"),
  },
  {
    path: "/employee",
    component: () => import("../views/EmployeeBoard"),
    meta: { authorize: [Role.Employee] },
    children: [
      {
        path: "",
        name: "employee",
        component: () => import("../components/BoardHome")
      },
      {
        path: "working-calendar",
        name: "employee-working-calendar",
        component: () => import("../components/WorkingCalendar"),
      },
      {
        path: "offwork-registration",
        name: "employee-offwork-registration",
        component: () => import("../components/OffworkRegistration"),
      }
    ]
  },
  {
    path: "/accountant",
    name: "accountant",
    component: () => import("../views/AccountantBoard"),
    meta: { authorize: [Role.Accountant] }
  },
  {
    path: "/admin",
    component: () => import("../views/AdminBoard"),
    meta: { authorize: [Role.Admin] },
    children: [
      {
        path: "",
        name: "admin",
        component: () => import("../components/BoardHome")
      },
      {
        path: "users",
        name: "admin-user",
        component: () => import("../components/UserManagement")
      },
      {
        path: "users/create",
        name: "admin-user-create",
        component: () => import("../components/UserCreate")
      },
      {
        path: "users/update/:userId",
        name: "admin-user-update",
        component: () => import("../components/UserUpdate")
      },
    ]
  },
  {
    path: "/manager",
    name: "manager",
    component: () => import("@/views/ManagerBoard"),
    meta: { authorize: [Role.Manager] }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const { authorize } = to.meta ? to.meta : null;

  if (authorize && !isAuthorised(authorize)) {
    return {
      name: 'NotFound',
      query: { redirect: to.fullPath }
    }
  }
});

const isAuthorised = (authorize) => {
  let user = store.state.auth.user;
  
  if (Object.keys(user).length === 0) return false;

  let roles = user.roles;
  for (let role of roles) {
    if (authorize.includes(role.name)) {
      return true;
    }
  }
  return false;
}

export default router;