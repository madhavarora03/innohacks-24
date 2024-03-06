import { REFRESH_TOKEN_SECRET } from '@/config';
import { cookieOptions } from '@/constants';
import { AuthenticatedRequest } from '@/interfaces';
import User from '@/models/user.model';
import HttpError from '@/utils/HttpError';
import HttpResponse from '@/utils/HttpResponse';
import catchAsync from '@/utils/catchAsync';
import { generateAccessAndRefreshTokens } from '@/utils/generateTokens';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const registerUser = catchAsync(async (req, res) => {
  const { username, name, email, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    username,
    name,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  if (!createdUser) {
    throw new HttpError(500, 'Something went wrong while registering the user');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    createdUser._id,
  );

  return res
    .status(201)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new HttpResponse(
        201,
        { user: createdUser, accessToken, refreshToken },
        'User created and logged in successfully',
      ),
    );
});

export const loginUser = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new HttpError(400, 'Username or Email is required');
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const isPasswordCorrect = await user.matchPassword(password);

  if (!isPasswordCorrect) {
    throw new HttpError(401, 'Invalid user credentials');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .cookie('accessToken', accessToken, cookieOptions)
    .json(
      new HttpResponse(
        200,
        { user: loggedInUser },
        'User logged in successfully',
      ),
    );
});

export const refreshAccessToken = catchAsync(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new HttpError(401, 'Unauthorized request');
  }

  try {
    const decodedToken: JwtPayload = jwt.verify(
      incomingRefreshToken,
      REFRESH_TOKEN_SECRET,
    ) as JwtPayload;

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new HttpError(401, 'Invalid refresh token');
    }

    if (user.refreshToken !== incomingRefreshToken) {
      throw new HttpError(401, 'Refresh token is expired or used');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);
    return res
      .status(200)
      .cookie('accessToken', accessToken, cookieOptions)
      .cookie('refreshToken', newRefreshToken, cookieOptions)
      .json(
        new HttpResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          'Access token refreshed!',
        ),
      );
  } catch (error) {
    throw new HttpError(401, 'Invalid refresh token');
  }
});

export const logoutUser = catchAsync(async (req: AuthenticatedRequest, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true },
  );

  return res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .json(new HttpResponse(200, {}, 'User logged out successfully!'));
});
