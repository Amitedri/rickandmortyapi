import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChar } from "../../Redux/Utils";
const NoResults = () => {
  return <span className=" text-muted">No Results,Try different term.</span>;
};

const CharactersTable = () => {
  const chracterslist = useSelector((state) => state.user.chracterslist);
  const dispatch = useDispatch();
  return (
    <div className="col-12 d-flex flex-column justify-content-center align-items-center bg-light shadow-sm mt-3 position-relative h-100">
      <div className="tableWrapper flex-grow-1 " style={{ overflowY: "scroll", height: "100%" }}>
        <table class="table bg-success">
          <thead>
            <tr className="smFont text-white">
              <th scope="col">#</th>
              {chracterslist.results != false && (
                <Fragment>
                  {" "}
                  <th scope="col">Name</th>
                  <th scope="col">Origin</th>
                  <th scope="col">Status</th>
                  <th scope="col">Species</th>
                  <th scope="col">Gender</th>
                </Fragment>
              )}
            </tr>
          </thead>
          <tbody className="smFont bg-light ">
            {chracterslist.results == false ? (
              <NoResults />
            ) : (
              chracterslist.results.map((el) => {
                return (
                  <tr className="smFont text-center hoverSoft" onClick={() => setCurrentChar(dispatch, el)}>
                    <td>
                      <img src={el.image} height="35" width="35" className="rounded-circle" />
                    </td>
                    <td className="">{el.name}</td>
                    <td>{el.origin.name}</td>
                    <td>{el.status}</td>
                    <td>{el.species}</td>
                    <td>{el.gender}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CharactersTable;
