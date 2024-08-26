import React from "react";
import Select from "react-select";

export default function Selects({
    placeholder,
    options,
    onChange,
    defaultValue,
}) {
    const handleSelectChange = (selectedOption) => {
        onChange(selectedOption);
    };
    return (
        <Select
            placeholder={placeholder}
            className=""
            options={options}
            onChange={handleSelectChange}
            defaultValue={defaultValue}
        />
    );
}
