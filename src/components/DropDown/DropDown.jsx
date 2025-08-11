import {useEffects, useRef, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select,FormHelperText  } from '@mui/material';

const SearchableDropDown = ({data, selectedData,error = false, setSelectedData, name, width, disabled, disableFlag = false,required = false }) => {
    var isDisabled
    if(disableFlag){
        isDisabled = !disabled || disabled.length === 0;
    }
    return ( 
        <div>
            <FormControl r
                required={required} 
                error={error}
                sx={{ 
                    minWidth: width, 
                    marginBottom: 2,
                    '& .MuiOutlinedInput-root': {
                        '& .MuiSelect-select': {
                        whiteSpace: 'normal', // Allow text wrapping
                        wordBreak: 'break-word' // Break long words
                        }
                    }
                }} disabled={isDisabled}>
                <InputLabel error={error} 
                sx={{ 
                    '&.Mui-focused': {
                        color: '#7451f8',
                    },
                }}>{name}</InputLabel>
                <Select
                    label={name}
                    displayEmpty
                    value={selectedData?.name || ""}
                    name="searchTopic"
                    error={error}
                    disabled={isDisabled}
                    onChange={(e) => data.filter((item)=>{
                        if(item.name === e.target.value) {
                            setSelectedData(item);
                        }
                    })}
                    sx={{ 
                        backgroundColor: 'background.paper', 
                        borderRadius: 1,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#7451f8',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#7451f8',
                        },
                        
                    }}
                >
                    {data.map((item) => (
                        <MenuItem key={item.name} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
                {/* {isDisabled && (
                    <FormHelperText>No options available</FormHelperText>
                )} */}
            </FormControl>
        </div>
    );
}

export default SearchableDropDown;