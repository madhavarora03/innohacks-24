import { redirect, useParams } from "react-router-dom";
import sampleProducts from "../../constants";

function ProductScreen() {
    const { id } = useParams();

    if (!id) redirect('/');

    const products = sampleProducts.map(product => {
        return <div className="card w-96 bg-base-100 shadow-xl border">
            <figure><img src={product.image} alt={product.name} /></figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Add To Cart</button>
                </div>
            </div>
        </div>
    })

    return <div className="m-24 flex flex-wrap gap-8">{products}{products}</div>;
}

export default ProductScreen;