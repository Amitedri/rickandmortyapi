import { useEffect, useState } from "react";
import { genders, species, statuses, views } from "../../constants";
import { exportToXLSX, getRandomPayload, setRandomPayload } from "../../Utils";
import { setGenderFilter, setSpeciesFilter, setStatusFilter, setTermFilter } from "../../Redux/Utils";
import { useDispatch, useSelector } from "react-redux";
import PDFDocument from "../PDFDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

const TryMe = () => {
  const dispatch = useDispatch();
  const chracterslist = useSelector((state) => state.user.chracterslist);
  const [showFlag, setShowFlag] = useState(false);

  useEffect(() => {}, []);
  const data = {
    statuses,
    genders,
    species,
    views,
  };

  useEffect(() => {
    if (chracterslist.results == false) {
      setShowFlag(true);
      return;
    }
    setShowFlag(false);
  }, [chracterslist]);

  const handleRandom = () => {
    setRandomPayload(data, dispatch);
    setTermFilter(dispatch,"")

  };
  const handleExport = () => {
    exportToXLSX(chracterslist.results);
  };

  return (
    <div className="col-12 d-flex flex-column justify-content-center align-items-center m-3 ">
      <div
        style={{ height: "50px", width: "200px" }}
        onClick={handleRandom}
        className="col-auto d-flex flex-column justify-content-center align-items-center text-white m-auto mt-2 rounded-pill bg-success hoverSoft tryBtn"
      >
        <span style={{ width: "65px" }} className="smFont border rounded bg-white text-success">
          Try me
        </span>
        Get Random Collection!
      </div>
      {chracterslist.results != false && (
        <div className="col-6 d-flex flex-row justify-content-center align-items-center">
          <PDFDownloadLink document={<PDFDocument data={chracterslist.results} />} fileName="RickAnyMorty.pdf">
            <img
              src="/assets/icons/pdf.svg"
              height="35"
              className="hoverSoft  m-2"
              style={{ filter: "invert(100%)" }}
            />
          </PDFDownloadLink>
          <img
            src="/assets/icons/xlsx.svg"
            height="35"
            className="hoverSoft  m-2"
            style={{ filter: "invert(100%)" }}
            onClick={handleExport}
          />
        </div>
      )}
      {showFlag && (
        <span className="text-white border-white border rounded-pill pe-2 ps-2 mt-1 hoverSoft" onClick={handleRandom}>
          No Results? Try again!
        </span>
      )}
    </div>
  );
};
export default TryMe;
