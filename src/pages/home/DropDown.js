import {useEffects, useRef, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SearchableDropDown = ({data, selectedData, setSelectedData }) => {
    return ( 
        <div>
            <FormControl>
                <InputLabel>Chapter</InputLabel>
                    <Select
                        value={selectedData}
                        name="searchTopic"
                        onChange={(e)=> {
                            setSelectedData(e.target.value);
                        }}
                        >
                        {data.map((data)=>{
                            <MenuItem value={data.name}>{data.name}</MenuItem>
                        })}
                    </Select>
            </FormControl>
        </div>
    );
}

export default SearchableDropDown;