import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
