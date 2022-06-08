import React from "react";
import Select from "react-select";
import { Icon } from "react-icons-kit";
import { ic_search } from "react-icons-kit/md";
import "./Search.scss";
const Search = () => {
  return (
    <div className="search">
      <div className="container">
        <div className="card border-0 shadow">
          <form>
            <div className="d-flex">
              <div>
                <Select
                  classNamePrefix="custom-select"
                  styles={customStyles}
                  placeholder={"Select Specialist"}
                />
              </div>
              <div>
                <button type="submit" className="btn shadow-none">
                  <Icon icon={ic_search} size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: 600,
    height: 45,
    fontSize: 14,
    color: "#000",
    boxShadow: "none",
    "&:hover": { borderColor: "none" },
    border: state.isFocused ? "none" : "none",
    borderRadius: "25px",
  }),
};
