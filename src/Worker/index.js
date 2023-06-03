import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePageNumber, handleFilters, requestData } from "../Utils";

const Worker = () => {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.user.currentIndex);
  const statusFilter = useSelector((state) => state.user.statusFilter);
  const genderFilter = useSelector((state) => state.user.genderFilter);
  const speciesFilter = useSelector((state) => state.user.speciesFilter);

  const termFilter = useSelector((state) => state.user.termFilter);
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character/?page=1");

  // request data every time the url string changes
  useEffect(() => {
    console.log("dispatch");
    requestData(url, dispatch);
  }, [url]);

  // handle filter changes
  useEffect(() => {
    handleFilters({ statusFilter, genderFilter, termFilter, speciesFilter, setUrl });
  }, [statusFilter, genderFilter, termFilter, speciesFilter]);

  //pagination updates
  useEffect(() => {
    const updatedUrl = changePageNumber(url, currentIndex.value);
    console.log("here", updatedUrl);
    setUrl(updatedUrl);
  }, [currentIndex]);

  return null;
};

export default Worker;
