const ButtonLoader = ({ state, text,className }) => {
  if (state) {
    return (
      <div className={`col d-flex justify-content-center align-items-center`}>
        <div className="spinner-border text-muted" role="status"></div>
      </div>
    );
  }
  return text;
};

export default ButtonLoader