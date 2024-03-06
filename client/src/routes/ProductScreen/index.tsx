import { useDispatch } from "react-redux";
import { redirect, useParams } from "react-router-dom";
import sampleProducts from "../../constants";
import { addToCart } from "../../lib/slices/cartSlice";

function ProductScreen() {
    const { id } = useParams();

    if (!id) redirect('/');

    const dispatch = useDispatch();

    const products = sampleProducts.map(product => {
        return <div className="card w-96 bg-base-100 shadow-xl border">
            <figure><img src={product.image} alt={product.name} /></figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => dispatch(addToCart({ ...product, qty: 1 }))}>Add To Cart</button>
                </div>
            </div>
        </div>
    })

    return <div className="m-24 flex flex-wrap justify-center gap-8">{products}{products}</div>;
}

export default ProductScreen;