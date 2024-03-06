import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from './auth.controller';
import { healthCheck } from './healthcheck.controller';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from './order.controller';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from './product.controller';
import { createReview, getProductReviews } from './review.controller';

import {
  deleteUser,
  getUserProfile,
  getUsers,
  updateUserProfile,
  updateUser,
  getUserById
} from './user.controller';

export { loginUser, logoutUser, refreshAccessToken, registerUser };

export { healthCheck };

export {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
};

export { createReview, getProductReviews };

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};

export { deleteUser, getUserProfile, getUsers, updateUserProfile, updateUser, getUserById };
