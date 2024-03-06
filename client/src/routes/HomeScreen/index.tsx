import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../lib/slices/productsApiSlice';
import { addToCart } from '../../lib/slices/cartSlice';

function HomeScreen() {
  const { pageNumber, keyword } = useParams();

  const { data, error, isLoading, isSuccess, isFetching } = useGetProductsQuery(
    {
      pageNumber,
      keyword,
    }
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    navigate('/cart');
  };
  return (
    <div className='m-20'>
      <div className='carousel w-full'>
        <div id='item1' className='carousel-item w-full'>
          <img
            src='https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg'
            className='w-full'
          />
        </div>
        <div id='item2' className='carousel-item w-full'>
          <img
            src='https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg'
            className='w-full'
          />
        </div>
        <div id='item3' className='carousel-item w-full'>
          <img
            src='https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg'
            className='w-full'
          />
        </div>
        <div id='item4' className='carousel-item w-full'>
          <img
            src='https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg'
            className='w-full'
          />
        </div>
      </div>
      <div className='flex justify-center w-full py-2 gap-2'>
        <a href='#item1' className='btn btn-xs'>
          1
        </a>
        <a href='#item2' className='btn btn-xs'>
          2
        </a>
        <a href='#item3' className='btn btn-xs'>
          3
        </a>
        <a href='#item4' className='btn btn-xs'>
          4
        </a>
      </div>
      <div className='mt-6'>
        <h1 className='text-4xl'>Latest Products</h1>
        <div>
          {data.products.map((product) => (
            <div className='card w-96 bg-base-100 shadow-xl border'>
              <figure>
                <img src={product.image} alt={product.name} />
              </figure>
              <div className='card-body'>
                <Link to={`/product/${product.id}`}>
                  <h2 className='card-title'>{product.name}</h2>
                </Link>
                <p>{product.description}</p>
                <div className='card-actions justify-end'>
                  <button
                    className='btn btn-primary'
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
