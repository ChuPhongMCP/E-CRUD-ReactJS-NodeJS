import { LOCATIONS } from 'constants/index';

import Layout from 'components/layout';

import CategoriesPage from 'pages/categoriesPage';
import ProductsPage from 'pages/productsPage';
import ProductDetailPage from 'pages/productsPage/productDetailPage';
import SuppliersPage from 'pages/suppliersPage';
import CreateProductPage from 'pages/productsPage/createProductPage';
import SearchProductPage from 'pages/productsPage/searchProductPage';
import CreateCategoryPage from 'pages/categoriesPage/createCategoryPage';
import CreateSupplierPage from 'pages/suppliersPage/createSupplierPage';
import NoMatch from 'pages/noMatch';
import LoginPage from 'pages/loginPage';
import ResultSearchProductPage from 'pages/productsPage/resultSearchProductPage';
import ResultSuggestSearchProductPage from 'pages/productsPage/resultSuggestSearchProductPage';
import ProfilePage from 'pages/profilePage';

export const routers = [
    {
        path: LOCATIONS.LAYOUT,
        name: "Home",
        element: <Layout />,
        children: [
            { isRoot: true, element: <ProductsPage /> },
            {
                path: LOCATIONS.PRODUCTS,
                name: "Products",
                children: [
                    { path: LOCATIONS.PRODUCTS, name: "Get All Products", element: <ProductsPage /> },
                    { path: LOCATIONS.CREATE_PRODUCT, name: "Create Product", element: <CreateProductPage /> },
                    { path: LOCATIONS.SEARCH_PRODUCT, name: "Search Product", element: <SearchProductPage /> },
                    { path: LOCATIONS.PRODUCT_DETAIL, element: <ProductDetailPage /> },
                    { path: LOCATIONS.RESULT_SEARCH_PRODUCT, element: <ResultSearchProductPage /> },
                    { path: LOCATIONS.RESULT_SUGGEST_SEARCH_PRODUCT, element: <ResultSuggestSearchProductPage /> },
                ],
            },
            {
                path: LOCATIONS.CATEGORIES,
                name: "Categories",
                children: [
                    { path: LOCATIONS.CATEGORIES, name: "Get All Categories", element: <CategoriesPage /> },
                    { path: LOCATIONS.CREATE_CATEGORY, name: "Create Category", element: <CreateCategoryPage /> },
                ],
            },
            {
                path: LOCATIONS.SUPPLIERS,
                name: "Suppliers",
                children: [
                    { path: LOCATIONS.SUPPLIERS, name: "Get All Suppliers", element: <SuppliersPage /> },
                    { path: LOCATIONS.CREATE_SUPPLIER, name: "Create Supplier", element: <CreateSupplierPage /> },
                ],
            },
            { path: LOCATIONS.PROFILE, element: <ProfilePage /> },
        ],
    },
    { path: LOCATIONS.LOGIN, element: <LoginPage /> },
    { path: "*", element: <NoMatch /> },
]

export const unAuthRouter = [ //router khi chưa đăng nhập
    { isRoot: true, element: <LoginPage /> },
    { path: LOCATIONS.LOGIN, name: "Login", element: <LoginPage /> },
    { path: "*", element: <NoMatch /> }, //link sai trả về 404 not found
];