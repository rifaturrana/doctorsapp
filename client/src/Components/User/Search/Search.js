import React, { useState } from "react";
import Select from "react-select";
import { Icon } from "react-icons-kit";
import { ic_search } from "react-icons-kit/md";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./Search.scss";
import { search } from "react-icons-kit/icomoon";
import SearchResultComponent from "../../.././Pages/SearchResult/index";
const Search = () => {
  //console.log(doctors);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [specialist, setSpecialist] = useState();

  const options = [
    { value: "Medicine", label: "Medicine" },
    { value: "Phycologist", label: "Phycologist" },
    { value: "Cardiologist", label: "Cardiologist" },
    { value: "Dentist", label: "Dentist" },
    { value: "Cancer", label: "Cancer" },
    { value: "Dermatologists", label: "Dermatologists" },
    { value: "Gastroenterologists", label: "Gastroenterologists" },
    { value: "Neurologists", label: "Neurologists" },
    { value: "Pathologists", label: "Pathologists" },
    { value: "Psychiatrists", label: "Psychiatrists" },
    { value: "Urologists", label: "Urologists" },
  ];
  const onChangeSpecialist = (event) => {
    setSpecialist(event.value);
  };

  const onSubmit = () => {
    history.push(`/search?specialist=${specialist || options[0].value}`);
  };

  return (
    <div className="search">
      <div className="container">
        <div className="card border-0 shadow">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex">
              <div>
                <Select
                  classNamePrefix="custom-select"
                  styles={customStyles}
                  placeholder={"Select Specialist"}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  options={options}
                  defaultValue={options[0]}
                  onChange={onChangeSpecialist}
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
