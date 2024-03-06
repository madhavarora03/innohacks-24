import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import sampleProducts from '../../constants';
import { addToCart } from '../../lib/slices/cartSlice';

function ProductScreen() {
  const { id } = useParams();
  var specProduct: any;
  if (id) specProduct = sampleProducts.find((x) => x.id == Number(id));
  console.log(specProduct);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    navigate('/cart');
  };

  const products = sampleProducts.map((product) => {
    return (
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
    );
  });

  return (
    <div className='m-24'>
      {products}
      {products}
    </div>
  );
}

export default ProductScreen;
