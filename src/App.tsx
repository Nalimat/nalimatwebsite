import { Route, Routes } from "react-router";
import { Layout } from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProductsPage from "@/pages/ProductsPage";
import ServicesPage from "@/pages/ServicesPage";
import IndustriesPage from "@/pages/IndustriesPage";
import InsightsPage from "@/pages/InsightsPage";
import InsightPage from "@/pages/InsightPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

/** Routes (formerly the src/app directory). Keep in sync with src/routes.ts. */
export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="insights/:slug" element={<InsightPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
