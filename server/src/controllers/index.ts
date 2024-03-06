import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from './auth.controller';
import { healthCheck } from './healthcheck.controller';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from './product.controller';
import { createReview } from './review.controller';

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

export { createReview };
