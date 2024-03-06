import { AuthenticatedRequest, OrderItem } from '@/interfaces';
import { Order } from '@/models';
import HttpError from '@/utils/HttpError';
import HttpResponse from '@/utils/HttpResponse';
import catchAsync from '@/utils/catchAsync';

export const addOrderItems = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      throw new HttpError(400, 'No order items');
    }

    const order = new Order({
      orderItems: orderItems.map((x: OrderItem) => ({
        ...x,
        product: x.product,
      })),
      user: req.user?._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    return res
      .status(201)
      .json(
        new HttpResponse(201, { createdOrder }, 'Order created successfully!'),
      );
  },
);

export const getMyOrders = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const orders = await Order.find({ user: req.user?._id });
    return res
      .status(200)
      .json(
        new HttpResponse(200, { orders }, 'Orders retrieved successfully!'),
      );
  },
);

export const getOrderById = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('user', 'name email');

    if (!order) {
      throw new HttpError(404, 'Order not found');
    }

    return res
      .status(200)
      .json(new HttpResponse(200, { order }, 'Order retrieved successfully!'));
  },
);

export const updateOrderToPaid = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// ADMIN ROUTES
export const getOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);
});

export const updateOrderToDelivered = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
