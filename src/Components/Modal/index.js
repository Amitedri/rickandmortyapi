import { useEffect, useState } from "react";
import "./Modal.css";
import { useSelector } from "react-redux";
import { getExtraDetails } from "../../Utils";

const Modal = () => {
  const currentChar = useSelector((state) => state.user.currentChar);

  const [localState, setLocalState] = useState({});

  useEffect(() => {
    getExtraDetails(currentChar).then((res) => {
      console.log(res);
      setLocalState((prev) => {
        return {
          ...currentChar,
          episode: res,
        };
      });
      return;
    });
  }, [currentChar]);


  useEffect(() => {
    if (!localState.hasOwnProperty("image")) {
      return;
    }
    const close = function(e){
      setLocalState({});
    }
    document.addEventListener("click",close);
    return () => {
    document.removeEventListener("click",close);
    };
  }, [localState]);

  if (!localState.hasOwnProperty("image")) {
    return null;
  }
  return (
    <div
      className="col-12 d-flex flex-row justify-content-center align-items-center shadow-sm localModal"
      style={{ zIndex: "9999" }}
    >
      <div
        className={`ModalContainer d-flex flex-column justify-content-start align-items-start rounded-2 mt-1 btnShadow slide-bottom`}
      >
        <img
          src={localState.image}
          height="65%"
          width="100%"
          style={{ objectFit: "cover" }}
          onClick={() => setLocalState("")}
        />
        <div className="col-12 d-flex flex-column justify-content-start align-items-start p-3">
          <span className="fw-bolder">{localState.name}</span>
          {localState.episode.map((el) => {
            return (
              <div className="col-10 d-flex flex-row justify-content-start align-items-center">
                <span className="text-dark text-center smFont fs-6 text-muted">{el.text}:</span>

                <span className="text-dark text-center smFont ms-1 fs-6 ">{el.episode}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Modal;
