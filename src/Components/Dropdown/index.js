import "./Dropdown.css";
const Dropdown = ({ header, list, onchange, value }) => {
  return (
    <div
      className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11  m-2 d-flex flex-column justify-content-center align-items-center  position-relative dropdownWrapper"
    >
      <span className="text-white col-12 bg-success rounded-top">{header}</span>

      <select
        className="form-select  text-center rounded-0 rounded-bottom  hoverSoft dropdownCustom p-1 smFont"
        onChange={onchange}
        value={value}
      >
        <option className=" border-bottom border-dark" value={""}>
          {header}
        </option>
        {list.map((el) => {
          return (
            <option className=" border-bottom border-dark" value={el.name}>
              {el}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default Dropdown;
