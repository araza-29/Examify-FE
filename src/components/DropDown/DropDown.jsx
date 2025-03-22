import {useEffects, useRef, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SearchableDropDown = ({data, selectedData, setSelectedData, name }) => {
    return ( 
        <div>
            <FormControl sx={{ minWidth: 300, margin: 2 }}>
                <InputLabel sx={{ color: 'primary.main' }}>{name}</InputLabel>
                <Select
                    value={selectedData.name}
                    name="searchTopic"
                    onChange={(e) => data.filter((item)=>{
                        if(item.name === e.target.value) {
                            setSelectedData(item);
                        }
                    })}
                    sx={{ 
                        backgroundColor: 'background.paper', 
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