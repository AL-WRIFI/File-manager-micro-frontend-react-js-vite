import { Fragment } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ShowItems from "../ShowItemsComponent/ShowItems";

const FilterPage = () => {
    const { filterName } = useParams();
    const { filterItems } = useSelector((state) => {
      let itemsToFilter = [];
      if (filterName === "All Docs") {
        itemsToFilter = state.Files.userFiles.filter((file) => !file.data.type.startsWith('image'));
      } else if (filterName === "All Image") {
        itemsToFilter = state.Files.userFiles.filter((file) => file.data.type.startsWith('image'));
      } else if (filterName === "Deleted Files") {
        itemsToFilter = state.Files.userDeletedFiles;
      }
      return { 
        filterItems: itemsToFilter ,
       };
    }, shallowEqual);
  
  
    return (
      <Fragment>
        {filterItems && filterItems.length > 0 ? (
          <Fragment>
            <h1>From Shared micro</h1>
            <ShowItems title={filterName} type="file" items={filterItems} />
          </Fragment>
        ) : (
          <p className="text-center my-5"> Empty Files </p>
        )}
      </Fragment>
    );
  };
  

export default FilterPage;