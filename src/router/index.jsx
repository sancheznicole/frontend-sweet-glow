//RUTAS
import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
//----------------------------------------------------------------------------------------------------------
//-----------------------------------RUTAS------------------------------------------------------------------
import HomePage from "../pages/HomePage"
import CategoriesPage from "../pages/products/CategoriesPage"
import BlogPage from "../pages/Blog/BlogPage"
import GiftGuidePage from "../pages/products/GiftGuidePage"
import GiveAwaysPage from "../pages/raffle/GiveAwaysPage"
import AboutUsPage from "../pages/aboutUs/AboutUsPage"
import WishlistPage from "../pages/whishlist/WishlistPage"
import LoginPage from "../pages/users/LoginPage"
import RegisterPage from "../pages/users/RegisterPage"
import SearchPage from "../pages/searcher/SearchPage"
import CartPage from "../pages/cart/CartPage"
import TermsPage from "../pages/terms/termsPage"
import PrivacyPoliciesPage from "../pages/terms/PrivacyPoliciesPage"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: 'categories', element: <CategoriesPage /> },

      { path: 'blog', element: <BlogPage /> },

      { path: 'gift-guide', element: <GiftGuidePage /> },

      { path: 'give-aways', element: <GiveAwaysPage /> },

      { path: 'about-us', element: <AboutUsPage /> },

      { path: 'wishlist', element: <WishlistPage /> },

      { path: 'login', element: <LoginPage /> },

      { path: 'register', element: <RegisterPage /> },

      { path: 'search', element: <SearchPage /> },

      { path: 'cart', element: <CartPage /> },

      { path: 'terms', element: <TermsPage/> },

      { path: 'privacy-policies', element: <PrivacyPoliciesPage /> },

    ],
  },
])
