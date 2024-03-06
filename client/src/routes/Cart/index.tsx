import { CrossIcon, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../lib/slices/cartSlice';
import { RootState } from '../../lib/store';

function CartPage() {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  return (
    <div className='m-24'>
      {/* {JSON.stringify(cartItems)} */}
      <div className='block md:flex '>
        {cartItems.length ? (
          <CartItems items={cartItems} />
        ) : (
          <div role='alert' className='alert alert-error'>
            <CrossIcon />
            <span>Add some items to the cart to view</span>
          </div>
        )}
        <CheckoutScreen items={cartItems} />
      </div>
    </div>
  );
}

function CartItems({ items }: any) {
  const dispatch = useDispatch();
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-1/2'>
      <h1 className='font-extrabold underline text-2xl  text-center'>
        Current Items in the cart
      </h1>
      <table className='w-full text-sm text-left rtl:text-right table'>
        <thead className='text-xs uppercase'>
          <tr>
            <th scope='col' className='px-6 py-3'></th>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Image
            </th>
            <th scope='col' className='px-6 py-3'>
              <span className='sr-only'>Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any, index: number) => {
            return (
              <tr>
                <th scope='row' className='px-6 py-4'>
                  {index + 1}
                </th>
                <Link to={`/product/${item.id}`}>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium whitespace-nowrap text-lg'
                  >
                    {item.name}
                  </th>
                </Link>
                <td className='px-6 py-4'>
                  <img
                    src={item.image}
                    alt={item.name}
                    width={128}
                    height={128}
                  />
                </td>
                <td className='px-6 py-4 text-right'>
                  <button
                    className='btn btn-error btn-outline'
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CheckoutScreen({ items }: any) {
  var price: number = 0;
  items.forEach((item: any) => (price += item.price));
  return (
    <div className='w-1/2  flex justify-end'>
      <div className='border w-fit p-8 rounded-xl text-center flex flex-col gap-4'>
        <h1 className='text-3xl font-extrabold'>Subtotal</h1>
        <span className='text-xl underline '>Subtotal: {price}</span>
        <Link to={'/checkout'}>
          <button className='btn w-full btn-outline btn-primary'>
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
