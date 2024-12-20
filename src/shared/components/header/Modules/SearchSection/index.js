'use client'
import { useState} from "react";
import './styles.scss'
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";


const Index = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearchNavigation = () => {
    router.push(`/news?search=${search}`);
  };


    return (
        <div
          className="container search-box-container"
          id="search-box-container"
        >
          <div className="inner-search-container">
            <label>অনুসন্ধান</label>{" "}
            <input
              type="text"
              value={search}
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
            <button onClick={handleSearchNavigation}>
              <FaSearch />
            </button>
          </div>
        </div>
    )
}

export default Index