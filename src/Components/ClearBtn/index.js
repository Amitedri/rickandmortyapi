const ClearBtn = ({onclick}) => {
  return (
    <div
    onClick={onclick}
      className="hoverSoft clearBtn d-flex flex-row justify-content-center align-items-center text-white p-1 rounded smFont bg-success border-white border align-self-end mb-2"
    >
      CLEAR ALL
    </div>
  );
};
export default ClearBtn;
