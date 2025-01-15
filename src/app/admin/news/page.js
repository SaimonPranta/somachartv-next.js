"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./style.scss";
import AdminLayouts from "@/shared/layouts/AdminLayouts/AdminLayouts";
import textSlicer from "@/shared/functions/textSlicer";
import { BACKEND_URL } from "@/shared/constants/ulrList";
import getImageUrl from "@/shared/functions/getImageUrl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { MdVisibility } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";

const totalNews = [
  {
    label: "Total News",
    proparty: "total"
  },
  {
    label: "Today News",
    proparty: "today"
  },
  {
    label: "Filter News",
    proparty: "filter"
  }
];

const Index = () => {
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [filterInput, setFilterInput] = useState({submit: false});
  const [newsCount, setNewsCount] = useState({
    today: 0,
    total: 0,
    filter: 0
  });
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [initialSearch, setInitialSearch] = useState(false);
  const router = useRouter();
  const debounceState = useRef();

  useEffect(() => {
    fetch(`${BACKEND_URL}/admin/news/total`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setNewsCount((state) => {
            return {
              ...state,
              ...data.data
            };
          });
        }
      });
  }, []);

  const handleScroll = () => {
    if (loading) {
            return;
          console.log("start scroll 2")
        }
      
          if (total && total <= news.length) {
            return;
          }
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      Number(document.documentElement.offsetHeight - 1)
    ) {
      setCurrentPage((currentPageState) => {
        setPage((pageState) => {
          if(currentPageState === pageState - 1){
            return pageState + 1
          }else{
            return pageState
          }
        })

        return currentPageState
      })
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      console.log("Hello")
          fetch(`${BACKEND_URL}/admin/news/all-news?page=${page}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(filterInput)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            if (page === 1) {
              setNews((state) => {
                return [...data.data];
              });
            } else {
              setNews((state) => {
                return [...state, ...data.data];
              });
            }
          } else {
            setNews([]);
          }
          if (data.page) {
            setCurrentPage(Number(data.page - 1));
          }
          if (data.total) {
            setTotal(data.total);
          }


          //
          // if (data.data) {
          //   setCurrentPage(page - 1);
          //   setLoading(false);

          //   if (search && !initialSearch) {
          //     setInitialSearch(true);
          //     setNews(data.data);
          //   } else if (search && initialSearch) {
          //     setInitialSearch(false);
          //     setNews(data.data);
          //   } else {
          //     setNews((state) => {
          //       return [...state, ...data.data];
          //     });
          //   }
          // }
        })
        .finally(() => {
          setLoading(false)
        })
        .catch((error) => {})
        
    // };
    }, 3000);

    return () => {
      resetTimeout();
    };
  }, [page, filterInput.submit]);

 
  const handleDeleteNews = (id) => {
    fetch(`${BACKEND_URL}/admin/news?id=${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const newList = news.filter((item) => item._id !== id);
          setNews(newList);
        }
      })
      .catch((error) => {});
  };
  const handleAddNewsNavigation = () => {
    router.push("/admin/news/add");
  };
  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFilterInput((state) => {
      return {
        ...state,
        [name]: value
      }
    })
  }

  console.log("filterInput ===>>", filterInput)
  const handleFilterSubmit = () => {
    console.log("HEllo form handleFilterSubmit")
    setPage(1)
    setCurrentPage(0)
    setFilterInput((state) => {
      return {
        ...state,
        submit: !state.submit
      }
    })
  }

  return (
    <AdminLayouts>
      <div className="admin-news-page" id="news-container" >
        <div className="add-news-container">
          <button onClick={handleAddNewsNavigation}>Add News</button>
        </div>
        <div className="total-section">
          {totalNews.map((item, index) => {
            return (
              <div className="cart" key={index}>
                <div className="icon">
                  <FaRegNewspaper />
                </div>
                <div className="des">
                  <h5>{newsCount[item.proparty]}</h5>
                  <p>{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="search-container">
          <div>
            <IoSearch />
            <input
              type="text"
              placeholder="Search news"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setSearch(input);
                setPage(1);
                setCurrentPage(0);
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="filter-section">
          <div className="input-section">
            <div className="date">
              <span>From</span>
              <input
                type="date"
                name="fromDate"
                value={filterInput.fromDate || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="date">
              <span>To</span>
              <input
                type="date"
                name="toDate"
                value={filterInput.toDate || ""}
                onChange={handleInputChange}
              />
            </div>
            {/* <select name="userType" onChange={handleInputChange}>
              <option hidden>Select User</option>
              <option>Active</option>
              <option>Inactive</option>
            </select> */}
            <div className="date">
            <input
              type="text"
              placeholder="Search here ..."
              name="search"
              value={filterInput.search || ""}
              onChange={handleInputChange}
            />
          </div>
          </div>

          <div className="submit-section">
            <button onClick={handleFilterSubmit}>Filter</button>
          </div>
        </div>
        <div className="news-container">
          <div className="inner-container" >
            {news.map((news, index) => {
              return (
                <div key={index} className="new-cart">
                  <Link
                    href={`/news/${news._id}`}
                    className="image-container"
                  >
                    <div className="visitor">
                      <MdVisibility /> <span>{news.viewCount}</span>{" "}
                    </div>
                    <Image
                      height={100}
                      width={100}
                      alt=""
                      src={getImageUrl(news.images)}
                    />
                  </Link>
                  <div>
                    <Link href={`/news/${news._id}`} className="des-container">
                      <h6> {textSlicer(news.title, 42, true)} </h6>
                      <p>{textSlicer(news.description, 99, true)}</p>
                    </Link>
                    <div className="action-btn-container">
                      <Link href={`/admin/news/edit/${news._id}`}>
                        <button> Edit </button>
                      </Link>
                      <button onClick={() => handleDeleteNews(news._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayouts>
  );
};

export default Index;
