import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../../screens/authScreen/splash';
import OnBoarding from '../../screens/authScreen/onBoarding';
import SubSplash from '../../screens/authScreen/subSplash';
import Login from '../../screens/authScreen/login';
import SignUp from '../../screens/authScreen/signUp';
import ForgotPassword from '../../screens/authScreen/forgotPassword';
import Verification from '../../screens/authScreen/verification';
import ChangePassword from '../../screens/authScreen/changePassword';
import {MainTabNavigator} from '../bottomBarNavigation';
import MenuScreen from '../../screens/bottomBar/homeScreenMenu/menu';
import Notification from '../../screens/bottomBar/notification';
import SubMenu from '../../screens/bottomBar/homeScreenMenu/subMenu';
import SubCategory from '../../screens/bottomBar/homeScreenMenu/subCategory';
import SubMenuAction from '../../screens/bottomBar/homeScreenMenu/subMenuAction';
import SubRecomended from '../../screens/bottomBar/homeRecomendedScreen/subRecomended';
import WeekPromotion from '../../screens/bottomBar/homeWeekPromotion/weekPromotion';
import CategoryScreen from '../../screens/bottomBar/categoryScreen';
import MainDrawerNavigator from '../drawerNavigation';
import ProductDetails from '../../screens/bottomBar/productDetails';
import Reviews from '../../screens/bottomBar/allReviews';
import UpdateReviews from '../../screens/bottomBar/updateReviws';
import AddAddress from '../../screens/bottomBar/addAddress';
import AddressDetails from '../../screens/bottomBar/addressDetails';
import ChoosePayment from '../../screens/bottomBar/choosePayment';
import AddCardPayment from '../../screens/bottomBar/addCardPayment';
import SubCategoryBrand from '../../screens/bottomBar/homeCategory/subCategotyBrand';
import ModalCategory from '../../screens/bottomBar/homeCategory/modalCategory';
import FlashSaleScreen from '../../screens/bottomBar/homeFlashSale/flashSale';
import SunFlashSaleMenu from '../../screens/bottomBar/homeFlashSale/subFlashSale';
import SubFlashSaleMenu from '../../screens/bottomBar/homeFlashSale/subFlashSale';
import SaveAddress from '../../screens/drawer/saveAddress';
import CardDetails from '../../screens/drawer/cardDetails';
import PrivacyPolicy from '../../screens/drawer/privacyPolicy';
import TermsCondition from '../../screens/drawer/termsCondition';
import MyOrderDetails from '../../screens/drawer/myOrderDetails';
import {StatusBar} from 'react-native';
import ViewAll from '../../screens/mogoscreen/ViewAll';
import MogoProductDetails from '../../screens/mogoscreen/MogoProductDetails';
import CommingSoon from '../../screens/mogoscreen/CommingSoon';
import ThemeSwitch from '../../screens/drawer/settingDrawer/screens/ThemeSwitch';
import TermsInfo from '../../screens/drawer/settingDrawer/screens/TermsInfo';
import TermsConditionDatas from '../../screens/drawer/aboutUs/TermsConditionDatas';
import PrivacyPolicyData from '../../screens/drawer/aboutUs/PrivacyPolicyData';
import ReturnRefundDatas from '../../screens/drawer/aboutUs/ReturnRefundDatas';
import ShopingPolicy from '../../screens/drawer/aboutUs/ShopingPolicy';
import CancelPolicy from '../../screens/drawer/aboutUs/CancelPolicy';
import MyWishList from '../../screens/drawer/settingDrawer/screens/MyWishList';
import MyCartScreens from '../../screens/drawer/settingDrawer/screens/MyCartScreens';
import Profile from '../../screens/drawer/profile';
import DisplayStore from '../../screens/mogoscreen/DisplayStore';
import ProductVariantComments from '../../screens/mogoscreen/extra/ProductVariantComments';
import BulkRequest from '../../screens/drawer/settingDrawer/screens/BulkRequest';
import ProductVariantReviews from '../../screens/mogoscreen/extra/ProductVariantReviews';

export const SPLASH_SCREEN_ROUTE = 'Splash';
export const SUB_SPLASH = 'SubSplash';
export const ONBOARDING_SCREEN = 'Onboarding';
export const LOGIN = 'Login';
export const SIGN_UP = 'SignUp';
export const FORGOT_PASSWORD = 'ForgotPassword';
export const VERIFICATION = 'Verification';
export const CHANGE_PASSWORD = 'ChangePassword';
export const MAIN_TAB_NAVIGATOR = 'TabNavigation';
export const MENU = 'Menu';
export const NOTIFICATION = 'Notification';
export const SUB_MENU = 'SubMenu';
export const SUB_CATEGORY = 'SubCategory';
export const SUB_MENU_ACTION = 'SubMenuAction';
export const SUB_RECOMENDED = 'SubRecomended';
export const WEEK_PROMOTION = 'WeekPromotion';
export const HOME_CATEGORY = 'HomeCategory';
export const PRODUCT_DETAILS = 'ProductDetails';
export const REVIEWS = 'Reviews';
export const UPDATE_REVIEWS = 'UpdateReviews';
export const CONFIRM_ADDRESS = 'ConfirmAddress';
export const ADD_ADDRESS = 'AddAddress';
export const ADDRESS_DETAILS = 'AddressDetails';
export const CHOOSE_PAYMENT = 'ChoosePayment';
export const ADD_CARD_PAYMENT = 'AddCardPayment';
export const SUB_CATEGORY_BRAND = 'SunCategoryBrand';
export const MODAL_CATEGORY = 'ModalCategory';
export const FLASH_SALE = 'FlashSale';
export const SUB_FLASH_SALE = 'SunFlashSaleMenu';
export const SAVE_ADDRESS = 'saveAddress';
export const CARD_DETAILS = 'cardDetails';
export const PRIVACY_POLICY = 'privacyPolicy';
export const TERMS_CONDITION = 'termsCondition';
export const ORDER_DETAILS = 'MyOrderDetails';
export const VIEW_ALL = 'ViewAll';
export const MOGO_PRODUCT_DETAILS = 'MogoProductDetails';
export const COMMING_SOON = 'CommingSoon';
export const THEME_SWITCH = 'ThemeSwitch';
export const TERM_INFO = 'TermsInfo';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <StatusBar />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}>
        <Stack.Screen name={SPLASH_SCREEN_ROUTE} component={SplashScreen} />
        <Stack.Screen name={SUB_SPLASH} component={SubSplash} />
        <Stack.Screen name={ONBOARDING_SCREEN} component={OnBoarding} />
        <Stack.Screen name={LOGIN} component={Login} />
        <Stack.Screen name={SIGN_UP} component={SignUp} />
        <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
        <Stack.Screen name={VERIFICATION} component={Verification} />
        <Stack.Screen name={CHANGE_PASSWORD} component={ChangePassword} />

        {/* <Stack.Screen name={MAIN_TAB_NAVIGATOR} component={MainTabNavigator} /> */}

        <Stack.Screen
          name={MAIN_TAB_NAVIGATOR}
          component={MainDrawerNavigator}
        />
        <Stack.Screen name={NOTIFICATION} component={Notification} />
        <Stack.Screen name={MENU} component={MenuScreen} />
        <Stack.Screen name={SUB_MENU} component={SubMenu} />
        <Stack.Screen name={SUB_CATEGORY} component={SubCategory} />
        <Stack.Screen name={SUB_MENU_ACTION} component={SubMenuAction} />
        <Stack.Screen name={SUB_RECOMENDED} component={SubRecomended} />
        <Stack.Screen name={WEEK_PROMOTION} component={WeekPromotion} />
        <Stack.Screen name={HOME_CATEGORY} component={CategoryScreen} />
        <Stack.Screen name={PRODUCT_DETAILS} component={ProductDetails} />
        <Stack.Screen
          name={MOGO_PRODUCT_DETAILS}
          component={MogoProductDetails}
        />
        <Stack.Screen name={REVIEWS} component={Reviews} />
        <Stack.Screen name={UPDATE_REVIEWS} component={UpdateReviews} />
        <Stack.Screen name={ADD_ADDRESS} component={AddAddress} />
        <Stack.Screen name={ADDRESS_DETAILS} component={AddressDetails} />
        <Stack.Screen name={CHOOSE_PAYMENT} component={ChoosePayment} />
        <Stack.Screen name={ADD_CARD_PAYMENT} component={AddCardPayment} />
        <Stack.Screen name={SUB_CATEGORY_BRAND} component={SubCategoryBrand} />
        <Stack.Screen name={MODAL_CATEGORY} component={ModalCategory} />
        <Stack.Screen name={FLASH_SALE} component={FlashSaleScreen} />
        <Stack.Screen name={SUB_FLASH_SALE} component={SubFlashSaleMenu} />
        <Stack.Screen name={SAVE_ADDRESS} component={SaveAddress} />
        <Stack.Screen name={CARD_DETAILS} component={CardDetails} />
        <Stack.Screen name={PRIVACY_POLICY} component={PrivacyPolicy} />
        <Stack.Screen name={TERMS_CONDITION} component={TermsCondition} />
        <Stack.Screen name={ORDER_DETAILS} component={MyOrderDetails} />
        <Stack.Screen name={VIEW_ALL} component={ViewAll} />
        <Stack.Screen name={COMMING_SOON} component={CommingSoon} />
        <Stack.Screen name={THEME_SWITCH} component={ThemeSwitch} />
        <Stack.Screen name={TERM_INFO} component={TermsInfo} />
        <Stack.Screen name={'ShopingPolicy'} component={ShopingPolicy} />
        <Stack.Screen name={'CancelPolicy'} component={CancelPolicy} />
        <Stack.Screen name={'MyWishList'} component={MyWishList} />
        <Stack.Screen name={'MyCartScreens'} component={MyCartScreens} />
        <Stack.Screen name={'Profile'} component={Profile} />
        <Stack.Screen name={'DisplayStore'} component={DisplayStore} />
        <Stack.Screen name={'BulkRequest'} component={BulkRequest} />
        <Stack.Screen
          name={'ProductVariantReviews'}
          component={ProductVariantReviews}
        />
        <Stack.Screen
          name={'ProductVariantComments'}
          component={ProductVariantComments}
        />
        <Stack.Screen
          name={'PrivacyPolicyData'}
          component={PrivacyPolicyData}
        />
        <Stack.Screen
          name={'ReturnRefundDatas'}
          component={ReturnRefundDatas}
        />
        <Stack.Screen
          name={'TermsConditionDatas'}
          component={TermsConditionDatas}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
