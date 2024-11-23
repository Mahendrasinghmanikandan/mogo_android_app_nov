import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export let baseUrl = 'http://10.0.2.2:8080/api/mobile';
export let baseUrl = 'https://mogo-api.vercel.app/api/mobile';

// export let baseUrl_sub = 'http://10.0.2.2:8080/api';
export let baseUrl_sub = 'https://mogo-api.vercel.app/api';

// export let baseUrl_sub_upload = 'http://10.0.2.2:8080/api';
export let baseUrl_sub_upload = 'https://mogo-api.onrender.com/api';

// category
export const getAllCategory = async search =>
  await axios.get(
    `${baseUrl}/get_all_categories/${JSON.stringify({name: search || 'all'})}`,
  );

export const getAllSubCategories = async search =>
  await axios.get(
    `${baseUrl}/get_all_subcategories/${JSON.stringify({
      name: search || 'all',
    })}`,
  );

export const getAllProductCategories = async search =>
  await axios.get(
    `${baseUrl}/get_all_productcategories/${JSON.stringify({
      name: search || 'all',
    })}`,
  );

// product
export const getAllSpecialProducts = async search =>
  await axios.get(
    `${baseUrl}/get_special_products/${JSON.stringify({
      name: search || 'all',
    })}`,
  );

export const getAllTrendingProducts = async search =>
  await axios.get(
    `${baseUrl}/get_trending_products/${JSON.stringify({
      name: search || 'all',
    })}`,
  );

export const getAllNewArivalProducts = async search =>
  await axios.get(
    `${baseUrl}/get_newarival_products/${JSON.stringify({
      name: search || 'all',
    })}`,
  );

export const getSeachProducts = async search_data =>
  await axios.get(`${baseUrl}/get_search_products/${search_data}`);

// banner
export const getAllBanner = async () =>
  await axios.get(`${baseUrl}/get_banner`);

// users

export const createUser = async formdata =>
  await axios.post(`${baseUrl_sub}/user/create_new_user`, formdata);

// auth
export const authUser = async formdata =>
  await axios.post(`${baseUrl_sub}/auth/auth_user`, formdata);

// custom axios

const customActions = axios.create({baseURL: `${baseUrl}`});

customActions.interceptors.request.use(async config => {
  let token = await AsyncStorage.getItem('tokens');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// carts

export const updateUser = async formdata =>
  await customActions.put(`${baseUrl_sub}/user/update_user`, formdata);

export const addToCart = async formData =>
  await customActions.post(`${baseUrl}/card/add_to_cart`, formData);

export const getMyCartsProduct = async _ =>
  await customActions.get(`${baseUrl}/card/collect_my_carts`);

export const getMyCarts = async search =>
  await customActions.get(
    `${baseUrl}/card/get_my_cards/${JSON.stringify({
      name: search || 'all',
    })}`,
  );

export const getMyCartsCOunt = async _ =>
  await customActions.get(`${baseUrl}/card/collect_my_carts`);

export const updateMyCart = async formData =>
  await customActions.put(`${baseUrl}/card/update_my_cards`, formData);

// wishList

export const addToWishList = async formData =>
  await customActions.post(`${baseUrl}/wishList/add_to_list`, formData);

export const collectMyWishList = async _ =>
  await customActions.get(`${baseUrl}/wishList/collect_my_list`);

export const getMyWishList = async search =>
  await customActions.get(
    `${baseUrl}/wishList/get_my_list/${JSON.stringify({
      name: search || 'all',
    })}`,
  );

export const updateMyWishList = async formData =>
  await customActions.put(`${baseUrl}/wishList/update_my_list`, formData);

// History

export const addToHistory = async formData =>
  await customActions.post(`${baseUrl}/history/add_to_history`, formData);

export const collectMyHistory = async _ =>
  await customActions.get(`${baseUrl}/history/collect_my_history`);

export const getMyHistory = async search =>
  await customActions.get(
    `${baseUrl}/history/get_my_history/${JSON.stringify({
      name: search || 'all',
    })}`,
  );

export const updateMyHistory = async formData =>
  await customActions.put(`${baseUrl}/history/update_my_history`, formData);

//  delivery address

export const addDeliveryAddress = async formData =>
  await customActions.post(
    `${baseUrl}/deliveryAddress/add_delivery_address`,
    formData,
  );

export const collectMyDeliveryAddress = async formData =>
  await customActions.get(
    `${baseUrl}/deliveryAddress/collectmy_delivery_address`,
    formData,
  );

export const updateDeliveryAddress = async (formData, id) =>
  await customActions.put(
    `${baseUrl}/deliveryAddress/updatemy_delivery_address/${id}`,
    formData,
  );

export const deleteMydeliveryAddress = async id =>
  await customActions.delete(
    `${baseUrl}/deliveryAddress/deletemy_delivery_address/${id}`,
  );

export const makeDefaultDeliveryAddress = async formData =>
  await customActions.put(
    `${baseUrl}/deliveryAddress/makedefault_delivery_address`,
    formData,
  );

// master product search

export const masterProductSearch = async search =>
  await axios.get(
    `${baseUrl}/masterSearch/master_product_search/${JSON.stringify({
      name: search || 'all',
    })}`,
  );

export const getRelatedProducts = async search =>
  await axios.get(`${baseUrl}/products/get_related_products/${search}`);

export const getPerticularStoreData = async id =>
  await axios.get(`${baseUrl}/products/get_oneStore_products/${id}`);

export const loginStaus = async _ =>
  await customActions.get(`${baseUrl}/login_status`);

// Checkout
export const collectCheckoutReadyproducts = async id =>
  await customActions.get(`${baseUrl}/checkout/get_checkout_products/${id}`);

// Checkout
export const veriFyCoupon = async id =>
  await customActions.get(`${baseUrl}/checkout/get_coupon_details/${id}`);

// orders
export const MakeOrder = async formData =>
  await customActions.post(`${baseUrl}/orders/create_order`, formData);

export const getMyOrderDetails = async _ =>
  await customActions.get(`${baseUrl}/orders/get_my_orders`);

export const getSingleOrderDetails = async id =>
  await customActions.get(`${baseUrl}/orders/get_single_order_details/${id}`);

// track
export const trackMyOrder = async id =>
  await customActions.get(`${baseUrl}/orders/track_my_order/${id}`);

// delivery charges
export const getDeliveryCharges = async _ =>
  await customActions.get(
    `${baseUrl}/delivery_charges/getall_delivery_charges`,
  );

// comments
export const makeComment = async formData =>
  await customActions.post(`${baseUrl}/comment/make_comment`, formData);

export const getVariantComments = async id =>
  await customActions.get(
    `${baseUrl}/comment/get_single_variant_comments/${id}`,
  );

export const deleteVariantComments = async id =>
  await customActions.delete(
    `${baseUrl}/comment/delete_single_variant_comments/${id}`,
  );

// bulkRequest
export const makeBulkRequest = async formData =>
  await customActions.post(`${baseUrl}/comment/make_bulk_request`, formData);

export const getMyBulkUploadRequest = async _ =>
  await customActions.get(`${baseUrl}/comment/get_my_bulkuploads`);

// reviews
export const makeReviews = async formData =>
  await customActions.post(`${baseUrl}/comment/make_reviews`, formData);

export const getVariantReviews = async id =>
  await customActions.get(
    `${baseUrl}/comment/get_single_variant_reviews/${id}`,
  );

export const deleteVariantReviews = async id =>
  await customActions.delete(
    `${baseUrl}/comment/delete_single_variant_reviews/${id}`,
  );

// images
export const uploadImages = async formdata =>
  await customActions.post(`${baseUrl_sub}/upload_images_single`, formdata);

// notification

export const collectNotificationCount = async id =>
  await customActions.get(`${baseUrl}/comment/get_notification_count`);

export const collectMyNotification = async _ =>
  await customActions.get(`${baseUrl}/comment/collect_my_notification`);
