import { useDispatch } from "react-redux";
import { setView } from "../../Redux/Utils";

const ToggleButtons = ({ view}) => {
  const dispatch = useDispatch()
  return (
    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 d-flex flex-column justify-content-center align-items-center text-muted  m-2 ">
      <span className="text-white col-12 bg-success rounded-top">Show as</span>
      <div className="col-12  d-flex flex-row justify-content-center align-items-center hoverSoft">
        <select className="form-select rounded-0 rounded-bottom text-center p-1 smFont" onChange={(e) => setView(dispatch,e.target.value)} value={view}>
        <option value={"table"}>Table</option>

          <option value={"cards"}>Cards</option>
        </select>
      </div>
    </div>
  );
};
export default ToggleButtons;
