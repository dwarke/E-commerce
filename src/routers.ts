import { Router } from "express";
const router = Router();

//   admin
import adminRegisterRouter from "./adminPanel/auth/auth.router";
import adminDashboard from './adminPanel/dashboard/dashboard.router'
import adminProductCategory from './adminPanel/category/category.router'
import adminVendorManagement from './adminPanel/vendor/vendor.router'
import adminUsersManagement from './adminPanel/users/userManage.router'
import adminReportAndAnalytics from './adminPanel/reportAndAnalytics/report.router'

//  vendor
import vendorRegister from './vendorPanel/auth/auth.router'
import vendorProductsOrders from './vendorPanel/orders/order.router'
import vendorProducts from './vendorPanel/product/product.router'
import vendorProductsRating from './vendorPanel/productRating/rating.router'
import vendorReport from './vendorPanel/report/report.router'

//  user
import userRegister from './user/auth/auth.router'
import userDashboard from './user/homeDashboard/home.router'
import userShoppingCartRouter from './user/shoppingCart/cart.router'
import userRatingAndReviewRouter from './user/ratingAndReview/rating.router'
import userOrderRouter from './user/order/order.router'
import userProductWishlist from './user/wishList/wishList.routing'


 //   ------- adminPanel ---------
router.use('/admin',adminRegisterRouter);
router.use('/admin/dashboard',adminDashboard);
router.use('/admin/report',adminReportAndAnalytics);
router.use('/admin/category',adminProductCategory);
router.use('/admin/vendorsManagement',adminVendorManagement);
router.use('/admin/usersManagement',adminUsersManagement);


//    ---------- vendorPanel --------
router.use('/vendor',vendorRegister);
router.use('/vendor/productOrders',vendorProductsOrders);
router.use('/vendor/products',vendorProducts);
router.use('/vendor/productRating',vendorProductsRating);
router.use('/vendor/vendorReport',vendorReport);


//    --------- users ------- 
router.use('/user',userRegister);
router.use('/user/dashboard',userDashboard);
router.use('/user/userCart',userShoppingCartRouter);
router.use('/user/userProductRating',userRatingAndReviewRouter);
router.use('/user/userOrder',userOrderRouter);
router.use('/user/userWishlist',userProductWishlist)


export default router;