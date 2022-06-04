import React, { ChangeEventHandler, useEffect, useState } from "react";
import { createStore } from "redux";
import "./App.css";
import { CatsDataType, CategoriesType } from "./types/Types";

const App = () => {
  const [category, setCategory] = useState("");
  // const [page, setPage] = useState("1");
  const [catsData, setCatsData] = useState([]);

  const [categs, setCategs] = useState([]);

  const initialState = {
    page: "1"
  }

  const reducer = (state = initialState, action: {type: string}) => {
    switch (action.type) {
      case 'page/first':
        return { page: "1" }
      case 'page/next':
        return { page: (parseInt(state.page) + 1).toString() }
      case 'page/prev':
        return { page: (parseInt(state.page) - 1).toString() }
    }
  
    return state
  }

  const store = createStore(reducer);

  const categories = "https://api.thecatapi.com/v1/categories";

  const [url, setUrl] = useState(`https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${category}`)

  store.subscribe(() => setUrl(`https://api.thecatapi.com/v1/images/search?limit=10&page=${store.getState().page}&category_ids=${category}`))

  useEffect(() => {
    const fetchData = async () => {
      try {
        // images
        const response = await fetch(url);
        const json = await response.json();

        // categories
        const responseCategs = await fetch(categories);
        const jsonCategs = await responseCategs.json();

        setCatsData(json);
        setCategs(jsonCategs);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [url]);

  const noPrev = store.getState().page === "1";

  return (
    <>
      <select
        id="category"
        onChange={(e) => {
          store.dispatch({ type: 'page/first' });
          setCategory(e.currentTarget.value);
        }}
      >
        <option value="">All</option>
        {categs &&
          categs.map((item: CategoriesType, key) => {
            return (
              <option key={key} value={item.id}>
                {item.name}
              </option>
            );
          })}
      </select>
      <div id="wrapper">
        {catsData &&
          catsData.map((item: CatsDataType, key) => {
            return (
              <div key={key}>
                <img src={item.url} alt="" title="" />
              </div>
            );
          })}
      </div>
      <div className="btns">
        <button
          id="prev"
          disabled={noPrev}
          onClick={() => {
            store.dispatch({ type: 'page/prev' });
          }}
        >
          Prev
        </button>
        <button
          id="next"
          onClick={() => {
            // setPage((parseInt(page) + 1).toString());
            store.dispatch({ type: 'page/next' });
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default App;

function useFetch(url: string, arg1: void) {
  throw new Error("Function not implemented.");
}
