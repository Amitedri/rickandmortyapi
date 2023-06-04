import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIndex } from "../../Redux/Utils";
import { handleItemClass, createFixedArray, handleArrowClick } from "../../Utils";
import "./Breads.css";

const Breads = () => {
  const [list, setList] = useState([]);
  const chracterslist = useSelector((state) => state.user.chracterslist);
  const currentIndex = useSelector((state) => state.user.currentIndex);
  const dispatch = useDispatch();
  //set value for current page
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentIndex(dispatch, page);
  };

  //create inital array in the length of total pages
  useEffect(() => {
    const fixedArray = createFixedArray(chracterslist.info?.pages);
    setList(fixedArray);
  }, [chracterslist]);

  const handleNext = useCallback(
    () => handleArrowClick("next", currentIndex, setCurrentIndex, dispatch, list),
    [currentIndex, list]
  );
  const handlePrev = useCallback(
    () => handleArrowClick("prev", currentIndex, setCurrentIndex, dispatch, list),
    [currentIndex, list]
  );
  if (list == false) {
    return null;
  }
  // render as inital set
  if (currentIndex.value < 5) {
    const last = list[list.length - 1];
    return (
      <div className="col-12 d-flex flex-row justify-content-center align-items-center breads smFont bg-dark text-white">
        <span className="m-2 hoverSoft" onClick={handlePrev}>
          {"<"}
        </span>
        {list.map((el) => {
          if (el.value > 5) {
            return null;
          }
          return (
            <span className={`hoverSoft ${handleItemClass(el, currentIndex)} m-1`} onClick={() => handlePageChange(el)}>
              {parseInt(el.value)}
            </span>
          );
        })}
        {last != false && list.length > 5 && (
          <span className={`hoverSoft ${handleItemClass(last, currentIndex)}`} onClick={() => handlePageChange(last)}>
            ... {last.value}
          </span>
        )}

        <span className="m-2 hoverSoft" onClick={handleNext}>
          {">"}
        </span>
      </div>
    );
  }
  // render as user progress

  return (
    <div className="col-12 d-flex flex-row justify-content-center bg-dark align-items-center breads smFont  text-white">
      <span className="m-2 hoverSoft" onClick={handlePrev}>
        {"<"}
      </span>
      {list.map((el) => {
        const current = currentIndex.value;
        const last = list[list.length - 1].value;
        const isHigher = parseInt(el.value) > parseInt(current) + 1;
        const isLower = parseInt(el.value) < parseInt(current) - 1;
        const diffHigh = parseInt(current) < list.length - 2;
        const diffLow = parseInt(current) > 3;

        if (el.value === 1) {
          return (
            <span className={`hoverSoft ${handleItemClass(el, currentIndex)}`} onClick={() => handlePageChange(el)}>
              {el.value}
              {diffLow ? <span className="m-2">...</span> : ""}
            </span>
          );
        }
        if (el.value === last) {
          return (
            <span className={`hoverSoft ${handleItemClass(el, currentIndex)}`} onClick={() => handlePageChange(el)}>
              {diffHigh ? <span className="m-2">...</span> : ""}

              {el.value}
            </span>
          );
        }
        if (isHigher) {
          return null;
        }
        if (isLower) {
          return null;
        }
        return (
          <span className={`hoverSoft ${handleItemClass(el, currentIndex)} m-1`} onClick={() => handlePageChange(el)}>
            {parseInt(el.value)}
          </span>
        );
      })}
      <span className="m-2 hoverSoft" onClick={handleNext}>
        {">"}
      </span>
    </div>
  );
};

export default Breads;
