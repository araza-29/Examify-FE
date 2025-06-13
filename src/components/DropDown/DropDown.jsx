import {useEffects, useRef, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SearchableDropDown = ({data, selectedData, setSelectedData, name, width }) => {
    return ( 
        <div>
            <FormControl sx={{ minWidth: width, margin: 1 }}>
                <InputLabel sx={{ color: "#7451f8" }}>{name}</InputLabel>
                <Select
                    value={selectedData?.name || ""}
                    name="searchTopic"
                    onChange={(e) => data.filter((item)=>{
                        if(item.name === e.target.value) {
                            setSelectedData(item);
                        }
                    })}
                    sx={{ 
                        color: "#7451f8", 
                        borderRadius: 1 
                    }}
                >
                    {data.map((item) => (
                        <MenuItem key={item.name} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SearchableDropDown;