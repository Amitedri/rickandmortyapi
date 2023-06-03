import { useEffect, useState } from "react";
import "./Search.css";
import { debounce, debounceFunc } from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { setTermFilter } from "../../Redux/Utils";
const Search = () => {
  const [termFilterLocal, setLocalTermFilter] = useState("");
  const termFilter = useSelector((state) => state.user.termFilter);
  const dispatch = useDispatch();
  const debounceSpeed = 750;

  useEffect(() => {
    if (!termFilter) {
      setLocalTermFilter("");
    }
  }, [termFilter]);

  useEffect(() => {
    const debounceSearch = debounceFunc(() => setTermFilter(dispatch, termFilterLocal), debounceSpeed);
    debounceSearch();

    return () => {
      debounceSearch.cancel();
    };
  }, [termFilterLocal]);

  return (
    <div
      className="col-12 d-flex flex-column justify-content-center align-items-center  searchWrapper bg-dark"
      style={{ height: "55px" }}
    >
      <div className="col-xxl-5 col-xl-5 col-md-5 col-lg-5 col-sm-11 col-11 d-flex flex-column justify-content-center align-items-center position-relative">
        <input
          onChange={(e) => setLocalTermFilter(e.target.value)}
          type="text"
          placeholder="Search In Rick and Morty"
          className="form-control search shadow-none m-0 text-success"
          value={termFilterLocal}
        />

      </div>

    </div>
  );
};
export default Search;
