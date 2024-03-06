import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";

function CartPage() {
    const { cartItems, paymentMethod, shippingAddress } = useSelector((state: RootState) => state.cart);
    return <div className="m-24">
        {JSON.stringify(cartItems)}
        <div className="block md:flex ">
            <CartItems items={cartItems} />
            <CheckoutScreen />
        </div>
    </div>
}

function CartItems({ items }: any) {
    return <div className="overflow-auto">
        <table>
            <thead>

            </thead>
            {items.map((item: any) => {
                return <div key={item.id}>{item.name}</div>
            })}
        </table>
    </div>;
}

function CheckoutScreen() {
    return <div></div>;
}

export default CartPage;