import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./auth/login/page";
import RegisterPage from "./auth/register/page";
import HomePage from "./page";
import DashboardPage from "./dashboard/page";
import { useAuth } from "../hooks/use-auth";
import Spiner from "./components/spiner";
import Navbar from "./components/navbar";
import ProductsPage from "./products/page";
import FavoritesPage from "./favorites/page";
import CreateProductPage from "./products/create/page";
import ProductDetailPage from "./products/product-details/page";
import EditProductPage from "./products/edit/page";

function App() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <Spiner />; // Show a loading indicator while checking auth

  return (
    <div className='h-screen'>
      <Router>
        <Navbar user={user} />
        <div className='px-4' style={{ height: "calc(100vh - 6rem)" }}>
          <Routes>
            {/* Redirect authenticated users to /dashboard */}
            {isAuthenticated ? (
              <Route path='/' element={<Navigate to='/dashboard' />} />
            ) : null}

            {/* Public routes (accessible only if NOT authenticated) */}
            {!isAuthenticated ? (
              <>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='*' element={<Navigate to='/login' />} />
              </>
            ) : (
              <>
                {/* Private route (redirects to login if not authenticated) */}
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route
                  path='/products/create'
                  element={<CreateProductPage />}
                />
                <Route
                  path='/products/edit/:id'
                  element={<EditProductPage />}
                />
                <Route path='/products/:id' element={<ProductDetailPage />} />

                <Route path='/favorites' element={<FavoritesPage />} />

                {/* <Route path='*' element={<Navigate to='/dashboard' />} /> */}
              </>
            )}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
