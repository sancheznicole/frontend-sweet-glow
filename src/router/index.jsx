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
import BlogPage from "../pages/blog/BlogPage"
import Skincare from "../pages/blog/Skincare"
import Colorimetria from "../pages/blog/Colorimetria"
import Fragrance from "../pages/blog/Fragrance"
import Recommended from "../pages/blog/Recommended"
import Advice from "../pages/blog/Advice"


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
import CreateRole from "../pages/admin/roles/crear/CreateRole"
import EditRole from "../pages/admin/roles/editar/EditRole"
import UsuariosIndex from "../pages/admin/usuarios/UsuariosIndex"
import ReferenceProductsIndex from "../pages/admin/referenciaProductos/ReferenceProductsIndex"
import CreateReferenceProduct from "../pages/admin/referenciaProductos/crear/CreateReferenceProduct"
import EditReferenceProduct from "../pages/admin/referenciaProductos/editar/EditReferenceProduct"
import ImagesIndex from "../pages/admin/imagenes/ImagesIndex"
import CreateImages from "../pages/admin/imagenes/crear/CreateImages"
import EditImages from "../pages/admin/imagenes/editar/EditImages"
import AwardsIndex from "../pages/admin/premios/AwardsIndex"
import CreateAward from "../pages/admin/premios/crear/CreateAward"
import EditAward from "../pages/admin/premios/editar/EditAward"
import AwardedIndex from "../pages/admin/premiados/AwardedIndex"
import CreateAwarded from "../pages/admin/premiados/crear/CreateAwarded"
import EditAwarded from "../pages/admin/premiados/editar/EditAwarded"
import GuiaRegalosIndex from "../pages/admin/guiaRegalos/GuiaRegalosIndex"
import CreateGuia from "../pages/admin/guiaRegalos/crear/CreateGuia"
import EditGuia from "../pages/admin/guiaRegalos/editar/EditGuia"
import CreateUser from "../pages/admin/usuarios/crear/CreateUser"
import CategoriesIndex from "../pages/admin/categories/CategoriesIndex"
import CreateCategory from "../pages/admin/categories/crear/CreateCategory"
import EditCategory from "../pages/admin/categories/editar/EditCategory"
import EditUser from "../pages/admin/usuarios/editar/EditUser"
import BrandsIndex from "../pages/admin/brands/BrandsIndex"
import CreateBrand from "../pages/admin/brands/crear/CreateBrand"
import EditBrand from "../pages/admin/brands/editar/EditBrand"
import ReviewsIndex from "../pages/admin/reviews/ReviewsIndex"
import CreateReview from "../pages/admin/reviews/crear/CreateReview"
import EditReview from "../pages/admin/reviews/editar/EditReview"
import ProductosIndex from "../pages/admin/productos/ProductosIndex"

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

      { path: "admin/roles/crear", element: 
        <ProtectedAdmin>
          <CreateRole />
        </ProtectedAdmin>
      },

      { path: "admin/roles/editar/:id", element: 
        <ProtectedAdmin>
          <EditRole />
        </ProtectedAdmin>
      },

      { path: "admin/users", element: 
        <ProtectedAdmin>
          <UsuariosIndex />
        </ProtectedAdmin>
      },


      { path: "admin/referenciaProductos", element: 
        <ProtectedAdmin>
          <ReferenceProductsIndex/>
        </ProtectedAdmin>
      },

      { path: "admin/referenciaProductos/crear", element: 
        <ProtectedAdmin>
          <CreateReferenceProduct/>
        </ProtectedAdmin>
      },

      { path: "admin/referenciaProductos/editar/:id", element: 
        <ProtectedAdmin>
         <EditReferenceProduct/>
        </ProtectedAdmin>
      },

      { path: "admin/imagenes", element: 
        <ProtectedAdmin>
          <ImagesIndex/>
        </ProtectedAdmin>
      },

      { path: "admin/imagenes/crear", element: 
        <ProtectedAdmin>
          <CreateImages/>
        </ProtectedAdmin>
      },

      { path: "admin/imagenes/editar/:id", element: 
        <ProtectedAdmin>
          <EditImages/>
        </ProtectedAdmin>
      },

      { path: "admin/premios", element: 
        <ProtectedAdmin>
          <AwardsIndex/>
        </ProtectedAdmin>
      },

      { path: "admin/premios/crear", element: 
        <ProtectedAdmin>
          <CreateAward/>
        </ProtectedAdmin>
      },

      { path: "admin/premios/editar/:id", element: 
        <ProtectedAdmin>
          <EditAward/>
        </ProtectedAdmin>
      },

     { path: "admin/premiados", element:
        <ProtectedAdmin>
          <AwardedIndex/>
        </ProtectedAdmin>
      },

      { path: "admin/premiados/crear", element:
        <ProtectedAdmin>
          <CreateAwarded/>
        </ProtectedAdmin>
      },

      { path: "admin/premiados/editar/:id", element:
        <ProtectedAdmin>
          <EditAwarded/>
        </ProtectedAdmin>
      },

      { path: "admin/guiaRegalos", element:
        <ProtectedAdmin>
          <GuiaRegalosIndex/>
        </ProtectedAdmin>
      },

      { path: "admin/guiaRegalos/crear", element:
        <ProtectedAdmin>
          <CreateGuia/>
        </ProtectedAdmin>
      },

      { path: "admin/guiaRegalos/editar/:id", element:
        <ProtectedAdmin>
          <EditGuia/>
        </ProtectedAdmin>
      },



      { path: "admin/user/create", element: 
        <ProtectedAdmin>
          <CreateUser />
        </ProtectedAdmin>
      },

      { path: "admin/user/edit/:id", element: 
        <ProtectedAdmin>
          <EditUser />
        </ProtectedAdmin>
      },

      { path: "admin/categories", element:
        <ProtectedAdmin>
          <CategoriesIndex />
        </ProtectedAdmin>
      },

      { path: "admin/categories/crear", element:
        <ProtectedAdmin>
          <CreateCategory />
        </ProtectedAdmin>
      },

      { path: "admin/categories/editar/:id", element:
        <ProtectedAdmin>
          <EditCategory />
        </ProtectedAdmin>
      },

      {
        path:"admin/brands",element:
        <ProtectedAdmin>
          <BrandsIndex/>
        </ProtectedAdmin>
      },

      {
        path:"admin/brands/crear",element:
        <ProtectedAdmin>
          <CreateBrand/>
        </ProtectedAdmin>
      },

      {
        path:"admin/brands/editar/:id",element:
        <ProtectedAdmin>
          <EditBrand/>
        </ProtectedAdmin>
      },

      {path:"admin/reviews",element:
        <ProtectedAdmin>
          <ReviewsIndex/>
        </ProtectedAdmin>
      },

      {path:"admin/reviews/crear",element:
        <ProtectedAdmin>
          <CreateReview/>
        </ProtectedAdmin>
      },

      {path:"admin/reviews/editar/:id",element:
        <ProtectedAdmin>
          <EditReview/>
        </ProtectedAdmin>
      },
      { path: "admin/products", element: 
        <ProtectedAdmin>
          <ProductosIndex />
        </ProtectedAdmin>
      },

      

      { path: 'categories', element: <CategoriesPage /> },

      { path: 'blog', element: <BlogPage /> },

      { path: '/blog/Skincare', element: <Skincare /> },

      { path: '/blog/Colorimetria', element: <Colorimetria/> },

      { path: '/blog/Fragrance', element: <Fragrance/> },

      { path: '/blog/Recommended', element: <Recommended/> },

      { path: '/blog/Advice', element: <Advice/> },
      


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
