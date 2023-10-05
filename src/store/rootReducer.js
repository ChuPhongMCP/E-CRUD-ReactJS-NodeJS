/* quy phạm khai báo rootReducer */
import { combineReducers } from 'redux';

import productsReducer from './products/getAllProducts/reducer';
import updateProductReducer from './products/updateProduct/reducer';
import deleteProductReducer from './products/deleteProduct/reducer';
import getProductDetailReducer from './products/getProductDetail/reducer';
import getProductImageReducer from './products/getProductImage/reducer';
import getProductSmallImageReducer from './products/getProductSmallImage/reducer';
import createProductReducer from './products/createProduct/reducer';
import miniSearchProductReducer from './products/miniSearchProduct/reducer';
import suggestMiniSearchProductReducer from './products/suggestMiniSearchProduct/reducer';
import largeSearchProductReducer from './products/largeSearchProduct/reducer';

import categoriesReducer from './categories/getAllCategory/reducer';
import createCategoryReducer from './categories/createCategory/reducer';
import deleteCategoryReducer from './categories/deleteCategory/reducer';
import updateCategoryReducer from './categories/updateCategory/reducer';

import supplierReducer from './suppliers/getAllSuppliers/reducer';
import createSupplierReducer from './suppliers/createSupplier/reducer';
import deleteSupplierReducer from './suppliers/deleteSupplier/reducer';
import updateSupplierReducer from './suppliers/updateSupplier/reducer';

import LoginReducer from './login/reducer';

import keySearchReducer from './keySearchs/getAllKeySearchs/reducer';

import profileReducer from './profiles/profile/reducer';
import getProfileImageReducer from './profiles/getProfileImage/reducer';

const rootReducer = combineReducers({
  productsReducer,
  updateProductReducer,
  deleteProductReducer,
  getProductDetailReducer,
  getProductImageReducer,
  getProductSmallImageReducer,
  createProductReducer,
  miniSearchProductReducer,
  suggestMiniSearchProductReducer,
  largeSearchProductReducer,

  categoriesReducer,
  createCategoryReducer,
  deleteCategoryReducer,
  updateCategoryReducer,
  
  supplierReducer,
  createSupplierReducer,
  deleteSupplierReducer,
  updateSupplierReducer,

  keySearchReducer,

  LoginReducer,

  profileReducer,
  getProfileImageReducer,
});

export default rootReducer;
