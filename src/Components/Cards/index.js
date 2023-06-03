import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChar } from "../../Redux/Utils";
const NoResults = () => {
  return <span className="nores m-auto fs-3 text-muted">No Results,Try different term.</span>;
};
const Cards = () => {
  const chracterslist = useSelector((state) => state.user.chracterslist);
  const dispatch = useDispatch();
  return (
    <div className="col-12 d-flex flex-column justify-content-center align-items-center bg-white shadow-sm mt-3 position-relative">
      <div
        className="col-12 d-flex flex-row flex-wrap justify-content-center align-items-center"
        style={{ overflowY: "auto", height: "70vh" }}
      >
        {chracterslist.results == false ? (
          <NoResults />
        ) : (
          chracterslist.results.map((el) => {
            return (
              <div
                style={{ height: "200px", width: "200px" }}
                onClick={() => setCurrentChar(dispatch, el)}
                className=" d-flex flex-column justify-content-start align-items-center m-3 border rounded text-muted hoverSoft"
              >
                <img src={el.image} height="65%" width="100%" style={{ objectFit: "cover" }} />
                <span className="fs-6 fw-bolder">{el.name}</span>
                <div className="col-10 d-flex flex-row justify-content-center align-items-center">
                  <span className="smFont">status:</span>
                  <span className="smFont ms-1">{el.status}</span>
                </div>
                <div className="col-10 d-flex flex-row justify-content-center align-items-center">
                  <span className="smFont">Species:</span>
                  <span className="smFont ms-1">{el.species}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default Cards;
