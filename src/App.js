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
import {setGenderFilter, setSpeciesFilter, setStatusFilter, setTermFilter } from "./Redux/Utils";
import Modal from "./Components/Modal";
import Cards from "./Components/Cards";
import ToggleButtons from "./Components/ToggleButtons";

function App() {
  const statusFilter = useSelector((state) => state.user.statusFilter);
  const genderFilter = useSelector((state) => state.user.genderFilter);
  const speciesFilter = useSelector((state) => state.user.speciesFilter);
  const [view, setView] = useState("table");

  const dispatch = useDispatch();

  
  // change handlers
  const statusSetter = useCallback((e) => handleFilterChange(e, setStatusFilter, dispatch), [statusFilter]);
  const genderSetter = useCallback((e) => handleFilterChange(e, setGenderFilter, dispatch), [genderFilter]);
  const speciesSetter = useCallback((e) => handleFilterChange(e, setSpeciesFilter, dispatch), [speciesFilter]);

  // clear filteres
  const clear = () => {
    setTermFilter(dispatch, "");
    setStatusFilter(dispatch, "");
    setGenderFilter(dispatch, "");
    setSpeciesFilter(dispatch, "");
  };

  return (
    <div className="App position-relative col-12 ">
      <div className="col-12 d-flex flex-column justify-content-start align-items-start">
        <div className="col-12 d-flex flex-row justify-content-start align-items-start bg-success fs-3 text-start p-2 text-white">
          Rick and Morty Characters App
        </div>
        <Search />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center align-items-center bg-dark shadow-sm">
          <ToggleButtons view={view} setView={setView} />
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
        <div className="col-12 d-flex flex-row justify-content-center align-items-center">
          <div className="w-100 m-auto d-flex flex-column justify-content-start align-items-start">
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
