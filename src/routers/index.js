import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const router = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/products",
    page: ProductPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/:type",
    page: TypeProductPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
    isPrivate: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
    isPrivate: false,
  },
  {
    path: "/product-details/:id",
    page: ProductDetailsPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: "/*",
    page: NotFoundPage,
    isShowHeader: false,
    isPrivate: false,
  },
];
