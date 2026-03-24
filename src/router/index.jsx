//RUTAS
import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
//rutas protegidas para que no se pueda acceder a traves de la url a ellas 
import ProtectedRoute from "./ProtectedRoute"
import RestrictedIFAuthenticated from "./RestrictedIFAuthenticated"
import ProtectedAdmin from "./ProtectedAdmin"
//----------------------------------------------------------------------------------------------------------
//-----------------------------------RUTAS------------------------------------------------------------------
// paginas
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

//administradores 
import AdminIndex from "../pages/admin/AdminIndex"
import RolesIndex from "../pages/admin/roles/RolesIndex"
import CreateRole from "../pages/admin/roles/crear/CreateRole"
import EditRole from "../pages/admin/roles/editar/EditRole"
import UsuariosIndex from "../pages/admin/usuarios/UsuariosIndex"
import ReferenceProductsIndex from "../pages/admin/referenciaProductos/ReferenceProductsIndex"
import CreateReferenceProduct from "../pages/admin/referenciaProductos/crear/CreateReferenceProduct"
import EditReferenceProduct from "../pages/admin/referenciaProductos/editar/EditReferenceProduct"
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
import ProductCreate from "../pages/admin/productos/crear/ProductCreate"
import EditProduct from "../pages/admin/productos/editar/EditProduct"
import GiftCardsIndex from "../pages/admin/gift-cards/GiftCardsIndex"
import CreateGiftCard from "../pages/admin/gift-cards/crear/CreateGiftCard"
import EditGiftCard   from "../pages/admin/gift-cards/editar/EditGiftCard"
import GiftRegistrationsIndex  from "../pages/admin/gift_registrations/GiftRegistrationsIndex"
import CreateGiftRegistration  from "../pages/admin/gift_registrations/crear/CreateGiftRegistration"
import EditGiftRegistration    from "../pages/admin/gift_registrations/editar/EditGiftRegistration"
import CarritoIndex from "../pages/admin/carritos/CarritoIndex"
import CreateCarrito from "../pages/admin/carritos/crear/CreateCarrito."
import EditCart from "../pages/admin/carritos/editar/EditCart"
import ElementosCarritos from "../pages/admin/elementos_carritos/ElementosCarritos"
import CreateCartElements from "../pages/admin/elementos_carritos/crear/CreateCartElements"
import EditElementsCart from "../pages/admin/elementos_carritos/editar/EditElementsCart"
import PedidosFacturaIndex from "../pages/admin/factura_pedidos/PedidosFacturaIndex"
import ProductsDetails from "../pages/products/ProductsDetails"
import CreateOrderInvoice from "../pages/admin/factura_pedidos/crear/CreateOrderInvoice"
import EditOrderInvoice from "../pages/admin/factura_pedidos/editar/EditOrderInvoice"


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      // admin panel routes

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

      { path: "admin/roles/create", element: 
        <ProtectedAdmin>
          <CreateRole />
        </ProtectedAdmin>
      },

      { path: "admin/roles/edit/:id", element: 
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

      { path: "admin/referenciaProductos/create", element: 
        <ProtectedAdmin>
          <CreateReferenceProduct/>
        </ProtectedAdmin>
      },

      { path: "admin/referenciaProductos/edit/:id", element: 
        <ProtectedAdmin>
          <EditReferenceProduct/>
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

      { path: "admin/categories/create", element:
        <ProtectedAdmin>
          <CreateCategory />
        </ProtectedAdmin>
      },

      { path: "admin/categories/edit/:id", element:
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
        path:"admin/brands/create",element:
        <ProtectedAdmin>
          <CreateBrand/>
        </ProtectedAdmin>
      },

      {
        path:"admin/brands/edit/:id",element:
        <ProtectedAdmin>
          <EditBrand/>
        </ProtectedAdmin>
      },

      {path:"admin/reviews",element:
        <ProtectedAdmin>
          <ReviewsIndex/>
        </ProtectedAdmin>
      },

      {path:"admin/reviews/create",element:
        <ProtectedAdmin>
          <CreateReview/>
        </ProtectedAdmin>
      },

      {path:"admin/reviews/edit/:id",element:
        <ProtectedAdmin>
          <EditReview/>
        </ProtectedAdmin>
      },

      { path: "admin/products", element: 
        <ProtectedAdmin>
          <ProductosIndex />
        </ProtectedAdmin>
      },

      { path: "admin/products/create", element: 
        <ProtectedAdmin>
          <ProductCreate />
        </ProtectedAdmin>
      },

      {path:"admin/products/edit/:id",element:
        <ProtectedAdmin>
          <EditProduct/>
        </ProtectedAdmin>
      },

      { path: "admin/gift-cards", element: 
        <ProtectedAdmin>
          <GiftCardsIndex />
        </ProtectedAdmin> 
      },

      { path: "admin/gift-cards/create", element: 
        <ProtectedAdmin>
          <CreateGiftCard />
        </ProtectedAdmin> 
      },

      { path: "admin/gift-cards/edit/:id", element: 
        <ProtectedAdmin>
          <EditGiftCard />
        </ProtectedAdmin> 
      },

      { path: "admin/gift_registrations", element: 
        <ProtectedAdmin>
          <GiftRegistrationsIndex />
        </ProtectedAdmin> 
      },

      { path: "admin/gift_registrations/create", element: 
        <ProtectedAdmin>
          <CreateGiftRegistration />
        </ProtectedAdmin> 
      },
      
      { path: "admin/gift_registrations/edit/:id", element: 
        <ProtectedAdmin>
          <EditGiftRegistration />
        </ProtectedAdmin> 
      },

      { path: "admin/cart", element: 
        <ProtectedAdmin>
          <CarritoIndex />
        </ProtectedAdmin> 
      },

      { path: "admin/cart/create", element: 
        <ProtectedAdmin>
          <CreateCarrito />
        </ProtectedAdmin> 
      },

      { path: "admin/cart/edit/:id", element: 
        <ProtectedAdmin>
          <EditCart />
        </ProtectedAdmin> 
      },

      { path: "admin/cart-elements", element: 
        <ProtectedAdmin>
          <ElementosCarritos />
        </ProtectedAdmin> 
      },

      { path: "admin/elements-cart/create", element: 
        <ProtectedAdmin>
          <CreateCartElements />
        </ProtectedAdmin> 
      },

      { path: "admin/elements-cart/edit/:id", element: 
        <ProtectedAdmin>
          <EditElementsCart />
        </ProtectedAdmin> 
      },

      { path: "admin/invoice-orders", element: 
        <ProtectedAdmin>
          <PedidosFacturaIndex />
        </ProtectedAdmin> 
      },

      { path: "admin/invoice-orders/create", element: 
        <ProtectedAdmin>
          <CreateOrderInvoice />
        </ProtectedAdmin> 
      },

      { path: "admin/invoice-orders/edit/:id", element: 
        <ProtectedAdmin>
          <EditOrderInvoice />
        </ProtectedAdmin> 
      },

      // products routes
      { path: 'products/details/:id', element: <ProductsDetails /> },

      
      // general routes
      
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
