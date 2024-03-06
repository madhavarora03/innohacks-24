import { SearchIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage() {



    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const submitForm = (e: FormEvent) => {
        e.preventDefault();
        if (query) navigate(`/search/${query}`);
    }

    return <form onSubmit={submitForm} className="m-28 min-h-screen  relative">
        <input type="text" className="input input-bordered input-info w-full text-xl font-bold p-8  focus:outline-none" placeholder="Enter keywords to search..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="flex justify-center mt-5"  >
            <button className="btn btn-outline w-1/4" type="submit">
                <SearchIcon /> Search
            </button>
        </div>
    </form>;
}

export default SearchPage;