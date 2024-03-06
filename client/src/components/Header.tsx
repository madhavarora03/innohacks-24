import { MoonIcon, Search, ShoppingCart, SunIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { switchTheme } from "../lib/slices/themeSlice";
import { RootState } from "../lib/store";

function Header() {

    const theme = useSelector((state: RootState) => state.themeReducer.value);
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className='navbar glass fixed top-0 left-0 w-full z-10'>
            <div className="navbar-start gap-4">
                <div className="hidden md:flex gap-2">
                    <Link to={'/'}>
                        <button className="btn btn-ghost btn-outline">
                            Home
                        </button>
                    </Link>
                    <Link to={'/product'}>
                        <button className="btn btn-ghost btn-outline">
                            Products
                        </button>
                    </Link>
                </div>
            </div>
            <div className='navbar-center'>
                <Link to={'/'}><button className='btn btn-ghost btn-outline text-xl'>Bazaar</button></Link>
            </div>
            <div className='navbar-end'>
                <Link to={'/search'}>
                    <button className='btn btn-ghost btn-circle'>
                        <Search />
                    </button>
                </Link>
                <Link to={'/cart'}>
                    <button className='btn btn-ghost btn-circle'>
                        <div className='indicator'>
                            <ShoppingCart />
                            {/* For blue dot */}
                            {/* <span className='badge badge-xs badge-primary indicator-item'></span> */}
                            <span>{cartItems.length ?? null}</span>
                        </div>
                    </button>
                </Link>
                <div className="flex gap-2"><SunIcon /><input type="checkbox" className="toggle" checked={theme == 'dim'} onClick={() => dispatch(switchTheme())} /><MoonIcon /></div>
            </div>
        </div>
    );
}

export default Header;
