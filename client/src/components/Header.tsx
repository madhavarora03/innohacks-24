import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
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
                            <span className='badge badge-xs badge-primary indicator-item'></span>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Header;
