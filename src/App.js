import { useCallback, useState } from "react";
import "./App.css";
import CharactersTable from "./Components/CharactersTable";
import ClearBtn from "./Components/ClearBtn";
import Dropdown from "./Components/Dropdown";
import Search from "./Components/Search";
import { genders, species, statuses } from "./constants";
import Worker from "./Worker";
import { handleFilterChange, handleFilters } from "./Utils";
import { useDispatch, useSelector } from "react-redux";
import Breads from "./Components/Breads";
import { clearFilters, setGenderFilter, setSpeciesFilter, setStatusFilter, setTermFilter, setView } from "./Redux/Utils";
import Modal from "./Components/Modal";
import Cards from "./Components/Cards";
import ToggleButtons from "./Components/ToggleButtons";
import TryMe from "./Components/TryMe";
import PDFDocument from "./Components/PDFDocument";

function App() {
  const statusFilter = useSelector((state) => state.user.statusFilter);
  const genderFilter = useSelector((state) => state.user.genderFilter);
  const speciesFilter = useSelector((state) => state.user.speciesFilter);
  const chracterslist = useSelector((state) => state.user.chracterslist);

  const view = useSelector((state) => state.user.view);

  const dispatch = useDispatch();

  // change handlers
  const statusSetter = useCallback((e) => handleFilterChange(e, setStatusFilter, dispatch), [statusFilter]);
  const genderSetter = useCallback((e) => handleFilterChange(e, setGenderFilter, dispatch), [genderFilter]);
  const speciesSetter = useCallback((e) => handleFilterChange(e, setSpeciesFilter, dispatch), [speciesFilter]);

  // clear filteres
  const clear = () => {
    clearFilters(dispatch,"")

  };

  return (
    <div className="App position-relative col-12 bg-dark">
      <div className="col-12 d-flex flex-column justify-content-start align-items-start h-100">
        <div className="col-12 d-flex flex-row justify-content-center align-items-center bg-dark fs-3 text-start p-2 text-white greenText">
          Rick and Morty Characters App
        </div>
        <hr className="m-auto p-0 text-white bg-white" style={{ width: "70%", opacity: "0.3" }} />
        <Search />

        <div className="col-12 d-flex flex-row flex-wrap justify-content-center align-items-center bg-dark shadow-sm">
          {/* Display control */}
          <ToggleButtons view={view} />
          {/* Gender Filter */}
          <Dropdown
            header={"Gender"}
            list={genders}
            onchange={genderSetter}
            value={genderFilter}
            key="alsjdasiodnasiodnasio"
          />
          {/* Status Filter */}
          <Dropdown
            header={"Status"}
            list={statuses}
            onchange={statusSetter}
            value={statusFilter}
            key="alsjdaiosndioasduiodnasio"
          />
          {/* Species Filter */}
          <Dropdown
            header={"Species"}
            list={species}
            onchange={speciesSetter}
            value={speciesFilter}
            key="alsjdaiosnsio"
          />
          {/* CLEAR BUTTON */}
          <ClearBtn onclick={clear} />
        </div>
        <hr className="m-auto p-0 text-white bg-white" style={{ width: "50%", opacity: "0.3" }} />
        <div className="col-12 d-flex flex-row justify-content-center align-items-center">
          <TryMe />

        </div>
        <div className="col-12 d-flex flex-row justify-content-center align-items-center h-100">
          <div className="w-100 m-auto d-flex flex-column justify-content-start align-items-start h-100">
            {/* Charcters Table && CARDS */}
            {view === "cards" ? <Cards /> : <CharactersTable />}
            {/* Bread Crumbs */}
            <Breads />
          </div>
        </div>
      </div>
      {/* Worker */}
      <Worker />
      {/* Modal */}
      <Modal />
    </div>
  );
}

export default App;
