//RUTAS
import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
//rutas protegidas para que no se pueda acceder a traves de la url a ellas 
import ProtectedRoute from "./ProtectedRoute"
import RestrictedIFAuthenticated from "./RestrictedIFAuthenticated"
import ProtectedAdmin from "./ProtectedAdmin"
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
import ProfilePage from "../pages/users/ProfilePage"
import SearchPage from "../pages/searcher/SearchPage"
import CartPage from "../pages/cart/CartPage"
import TermsPage from "../pages/terms/termsPage"
import PrivacyPoliciesPage from "../pages/terms/PrivacyPoliciesPage"
import ReturnsPolicyPage from "../pages/terms/ReturnsPolicyPage"
import CustomerServicePage from "../pages/terms/CustomerServicePage"
import AdminIndex from "../pages/admin/AdminIndex"
import RolesIndex from "../pages/admin/roles/RolesIndex"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "admin", element: 
        <ProtectedAdmin>
          <AdminIndex />
        </ProtectedAdmin>
      },

      { path: "admin/roles", element: 
        <ProtectedAdmin>
          <RolesIndex />
        </ProtectedAdmin>
      },

      { path: 'categories', element: <CategoriesPage /> },

      { path: 'blog', element: <BlogPage /> },

      { path: 'gift-guide', element: <GiftGuidePage /> },

      { path: 'give-aways', element: <GiveAwaysPage /> },

      { path: 'about-us', element: <AboutUsPage /> },

      { path: 'wishlist', element: <WishlistPage /> },

      { path: 'login', element: 
        <RestrictedIFAuthenticated>
          <LoginPage /> 
        </RestrictedIFAuthenticated>
      },

      { path: 'register', element: 
        <RestrictedIFAuthenticated>
          <RegisterPage /> 
        </RestrictedIFAuthenticated>
      },

      { path: 'profile', element: 
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      },

      { path: 'search', element: <SearchPage /> },

      { path: 'cart', element: <CartPage /> },

      { path: 'terms', element: <TermsPage/> },

      { path: 'privacy-policies', element: <PrivacyPoliciesPage /> },

      { path: 'shipping-and-returns-policy', element: <ReturnsPolicyPage /> },

      { path: 'customer-Service', element: <CustomerServicePage /> },

    ],
  },
])
