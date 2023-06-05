import querystring from "querystring";
import axios from "axios";
import { setCharactersList, setStatusFilter, setGenderFilter, setSpeciesFilter, setView } from "../Redux/Utils";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const handleFilterChange = (e, setter, dispatch) => {
  setter(dispatch, e.target.value);
};

export function debounceFunc(func, delay) {
  let timeoutId;

  const debouncedFunction = function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  debouncedFunction.cancel = function () {
    clearTimeout(timeoutId);
  };

  return debouncedFunction;
}

export const generateItemsForPage = (chracterslist, startIndex, endIndex) => {
  const res = chracterslist.results.slice(startIndex, endIndex);
  return res;
};

export const createFixedArray = (length) => {
  const fixedArray = Array.from({ length: length }).map((el, idx) => {
    idx++;
    return {
      value: idx,
      url: `https://rickandmortyapi.com/api/character?page=${idx}`,
    };
  });
  return fixedArray;
};

export const handlePaginationLoad = async ({
  currentIndex,
  chracterslist,
  startIndex,
  endIndex,
  setCharactersList,
  dispatch,
}) => {
  if (currentIndex.value < 1) {
    return;
  }
  let paginatedList = generateItemsForPage(chracterslist, startIndex, endIndex);
  let info;
  if (paginatedList == false) {
    const request = await axios.get(currentIndex.url);
    paginatedList = request.data.results;
    info = request.data.info;
    // console.log(request.data.results);
    // console.log("paginatedList", paginatedList);
  }
  const payload = {
    info: chracterslist.info,
    results: paginatedList,
  };

  setCharactersList(dispatch, payload);
  return;
};
export const requestData = async (url, dispatch) => {
  const request = await axios.get(url).catch((err) => {
    return null;
  });
  if (request) {
    if (request.status == 200) {
      console.log(request.data);
      setCharactersList(dispatch, request.data);
      return;
    }
    return;
  }
  setCharactersList(dispatch, { info: {}, results: [] });
};

export function changePageNumber(url, newPageNumber) {
  const urlParts = url.split("=");
  const currentNumber = parseInt(urlParts[urlParts.length - 1], 10);
  const newUrl = url.replace(`=${currentNumber}`, `=${newPageNumber}`);
  return newUrl;
}

export const handleFilters = async ({ genderFilter, statusFilter, termFilter, speciesFilter, setUrl }) => {
  let url = `https://rickandmortyapi.com/api/character/?`;

  const query = {};

  if (genderFilter) {
    query.gender = genderFilter.toLocaleLowerCase();
  }
  if (statusFilter) {
    query.status = statusFilter.toLocaleLowerCase();
  }
  if (speciesFilter) {
    query.species = speciesFilter.toLocaleLowerCase();
  }
  if (termFilter) {
    query.name = termFilter.toLocaleLowerCase();
  }
  query.page = 1;
  if (!genderFilter && !statusFilter && !termFilter && !speciesFilter) {
    console.log("none", url);
    setUrl("https://rickandmortyapi.com/api/character/?page=1");
    return;
  }
  const qs = querystring.stringify(query);
  url = url + qs;
  setUrl(url);
};

export const handleArrowClick = (direction, currentIndex, setCurrentIndex, dispatch, list) => {
  console.log(currentIndex);
  if (currentIndex.value >= list.length - 1) {
    return;
  }
  if (direction === "next") {
    console.log("next");

    const updatedPage = currentIndex.value + 1;
    const updatedUrl = changePageNumber(currentIndex.url, updatedPage);
    const nextPayload = { value: updatedPage, url: updatedUrl };
    setCurrentIndex(dispatch, nextPayload);
    return;
  }
  if (direction === "prev") {
    console.log("prev");

    const updatedPage = currentIndex.value - 1;
    if (updatedPage < 1) {
      return;
    }
    const updatedUrl = changePageNumber(currentIndex.url, updatedPage);
    const nextPayload = { value: updatedPage, url: updatedUrl };
    setCurrentIndex(dispatch, nextPayload);
    return;
  }
};

export const handleItemClass = (el, currentIndex) => {
  if (currentIndex.value === el.value) {
    return "roundedItem";
  }
  return "";
};

export function convertDateToSeconds(dateString) {
  const date = new Date(dateString);
  const milliseconds = date.getTime();
  const seconds = Math.floor(milliseconds / 1000);
  return seconds;
}

export const getExtraDetails = async (currentChar) => {
  if (!currentChar.hasOwnProperty("episode")) {
    return null;
  }
  const episodes = currentChar.episode;
  let first = episodes[0].split("/");
  first = first[first.length - 1];
  const hasAnotherEpisode = episodes.length > 1 ? episodes[episodes.length - 1] : "";
  let last = hasAnotherEpisode ? hasAnotherEpisode[hasAnotherEpisode.length - 1] : "";
  last = hasAnotherEpisode.split("/");
  last = last[last.length - 1];

  const url = `https://rickandmortyapi.com/api/episode/${first},${last}`;

  const request = await axios.get(url).catch((err) => {
    // handle errors with modal
  });
  if (request) {
    if (request.status === 200) {
      console.log("request.data", request.data);
      const dates = request.data.map((el, idx) => {
        if (idx === 0) {
          return {
            text: "First Appearance",
            episode: el.episode,
          };
        }
        return {
          text: "Last Appearance",
          episode: el.episode || "Not Available",
        };
      });
      return dates;
    }
  }
  return null;
};

export function setRandomPayload(data, dispatch) {
  const payload = {};

  for (const key in data) {
    if (Array.isArray(data[key])) {
      const array = data[key];
      const randomIndex = Math.floor(Math.random() * array.length);
      payload[key] = array[randomIndex];
    }
  }
  console.log(payload);
  setGenderFilter(dispatch, payload.genders);
  setSpeciesFilter(dispatch, payload.species);
  setStatusFilter(dispatch, payload.statuses);
}


export const exportToXLSX = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const excelBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(excelBlob, "data.xlsx");
};