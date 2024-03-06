import { AuthenticatedRequest } from '@/interfaces';
import { User } from '@/models';
import HttpError from '@/utils/HttpError';
import HttpResponse from '@/utils/HttpResponse';
import catchAsync from '@/utils/catchAsync';

export const getUserProfile = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const user = await User.findById(req.user?._id);

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  },
);

export const updateUserProfile = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const user = await User.findById(req.user?._id);

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return res.json(
      new HttpResponse(
        200,
        {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
        },
        'User updated successfully',
      ),
    );
  },
);

// ADMIN CONTROLLERS
export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find({});

  return res.json(new HttpResponse(200, users, 'Users retrieved successfully'));
});

export const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  await user.deleteOne({ _id: userId });

  return res.json(new HttpResponse(204, {}, 'User deleted successfully'));
});

export const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return res.json(new HttpResponse(200, user, 'User retrieved successfully'));
});

export const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin || user.isAdmin;

  const updatedUser = await user.save();

  return res.json(
    new HttpResponse(
      200,
      {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
      'User updated successfully',
    ),
  );
});
