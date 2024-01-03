import { Fragment } from "react";
import { shallowEqual, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import ShowItems from "../ShowItemsComponent/ShowItems";

const FilterPage = () => {
    const { filterItems ,filterName } = useSelector((state) => {
      let itemsToFilter = [];
      if (state.FilterFiles.filterName === "AllDocs") {
        itemsToFilter = state.Files.userFiles.filter((file) => !file.data.type.startsWith('image'));
      } else if (state.FilterFiles.filterName === "AllImage") {
        itemsToFilter = state.Files.userFiles.filter((file) => file.data.type.startsWith('image'));
      }
      return { 
        filterItems: itemsToFilter ,
        filterName : state.FilterFiles.filterName,
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