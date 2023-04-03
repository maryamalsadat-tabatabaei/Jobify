import { useState, useMemo } from "react";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const {
    isLoading,
    searchCompany,
    searchPosition,
    searchStatus,
    searchJobType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    clearFilters();
  };

  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        {/* search position */}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="position"
            name="searchPosition"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          <FormRow
            type="text"
            labelText="company"
            name="searchCompany"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          <FormRowSelect
            labelText="job status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            labelText="job type"
            name="searchJobType"
            value={searchJobType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
