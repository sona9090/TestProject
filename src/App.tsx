import React, { ChangeEventHandler, useEffect, useState } from "react";
import "./App.css";
import { CatsDataType, CategoriesType } from "./types/Types";

const App = () => {
  const [category, setCategory] = useState("");
  const [page, setPage] = useState("1");
  const [catsData, setCatsData] = useState([]);

  const [categs, setCategs] = useState([]);

  const url = `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&category_ids=${category}`;
  const categories = "https://api.thecatapi.com/v1/categories";

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

  const noPrev = page === "1";

  return (
    <>
      <select
        id="category"
        onChange={(e) => {
          setPage("1");
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
            setPage((parseInt(page) - 1).toString());
          }}
        >
          Prev
        </button>
        <button
          id="next"
          onClick={() => {
            setPage((parseInt(page) + 1).toString());
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
