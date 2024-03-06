import { AuthenticatedRequest } from '@/interfaces';
import { Product, Review } from '@/models';
import HttpError from '@/utils/HttpError';
import HttpResponse from '@/utils/HttpResponse';
import catchAsync from '@/utils/catchAsync';

export const createReview = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      throw new HttpError(404, 'Product not found');
    }

    const alreadyReviewed = await Review.findOne({
      user: req.user?._id,
      product: productId,
    });

    if (alreadyReviewed) {
      throw new HttpError(400, 'Product already reviewed');
    }

    const review = await Review.create({
      rating,
      comment,
      user: req.user?._id,
      product: productId,
    });

    product.reviews.push(review._id);

    product.rating =
      product.reviews.reduce((acc) => rating + acc, 0) / product.reviews.length;

    await product.save();

    return res
      .status(201)
      .json(new HttpResponse(201, { review }, 'Review added'));
  },
);

export const getProductReviews = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const reviews = await Review.find({ product: productId });

  return res
    .status(200)
    .json(new HttpResponse(200, { reviews }, 'Product reviews retrieved'));
});
