/* quy phạm khai báo Saga */
import { all, fork } from 'redux-saga/effects';

import productsSaga from 'store/products/getAllProducts/saga';
import updateProductsSaga from './products/updateProduct/saga';
import deleteProductsSaga from './products/deleteProduct/saga';
import getProductDetailsSaga from './products/getProductDetail/saga';
import getProductImageSaga from './products/getProductImage/saga';
import getProductSmallImage from './products/getProductSmallImage/saga';
import createProduct from './products/createProduct/saga';
import miniSearchProductsSaga from './products/miniSearchProduct/saga';
import suggestMiniSearchProductsSaga from './products/suggestMiniSearchProduct/saga';
import largeSearchProductsSaga from './products/largeSearchProduct/saga';

import categorySaga from 'store/categories/getAllCategory/saga';
import createCategorysSaga from './categories/createCategory/saga';
import deleteCategorysSaga from './categories/deleteCategory/saga';
import updateCategorysSaga from './categories/updateCategory/saga';

import supplierSaga from 'store/suppliers/getAllSuppliers/saga';
import createSuppliersSaga from 'store/suppliers/createSupplier/saga';
import deleteSuppliersSaga from 'store/suppliers/deleteSupplier/saga';
import updateSuppliersSaga from 'store/suppliers/updateSupplier/saga';

import loginSaga from 'store/login/saga';

import keySearchSaga from 'store/keySearchs/getAllKeySearchs/saga';

import profileSaga from 'store/profiles/profile/saga';
import getProfileImage from 'store/profiles/getProfileImage/saga';

export default function* rootSaga() {
  yield all([
    fork(productsSaga),
    fork(updateProductsSaga),
    fork(deleteProductsSaga),
    fork(getProductDetailsSaga),
    fork(getProductImageSaga),
    fork(getProductSmallImage),
    fork(createProduct),
    fork(miniSearchProductsSaga),
    fork(suggestMiniSearchProductsSaga),
    fork(largeSearchProductsSaga),

    fork(categorySaga),
    fork(createCategorysSaga),
    fork(deleteCategorysSaga),
    fork(updateCategorysSaga),

    fork(supplierSaga),
    fork(createSuppliersSaga),
    fork(deleteSuppliersSaga),
    fork(updateSuppliersSaga),

    fork(loginSaga),
    fork(keySearchSaga),

    fork(profileSaga),
    fork(getProfileImage),
  ]);
}