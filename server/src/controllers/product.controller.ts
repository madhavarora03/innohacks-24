import { AuthenticatedRequest } from '@/interfaces';
import { Product } from '@/models';
import HttpError from '@/utils/HttpError';
import HttpResponse from '@/utils/HttpResponse';
import catchAsync from '@/utils/catchAsync';

export const getProducts = catchAsync(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  return res
    .status(200)
    .json(
      new HttpResponse(
        200,
        { products, page, pages: Math.ceil(count / pageSize) },
        'Products retrieved successfully!',
      ),
    );
});

export const getProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  return res.status(200).json(product);
});

export const getTopProducts = catchAsync(async (_, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);

  return res
    .status(200)
    .json(
      new HttpResponse(
        200,
        { products },
        'Top products retrieved successfully!',
      ),
    );
});

// ADMIN CONTROLLERS
export const createProduct = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      rating: 0,
      seller: req.user?._id,
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });
    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  },
);

export const updateProduct = catchAsync(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    return res.json(
      new HttpResponse(200, { updatedProduct }, 'Product updated'),
    );
  } else {
    throw new HttpError(404, 'Product not found');
  }
});

export const deleteProduct = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (product) {
      await product.deleteOne({ _id: productId });
      return res.json(new HttpResponse(204, {}, 'Product removed'));
    } else {
      throw new HttpError(404, 'Resource not found');
    }
  },
);
