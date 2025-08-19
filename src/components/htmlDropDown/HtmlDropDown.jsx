import { useState } from 'react';
import { 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  FormHelperText,
  Box
} from '@mui/material';

const HtmlDisplayDropdown = ({ 
  data, 
  selectedData, 
  setSelectedData, 
  name, 
  width = '100%', 
  disabled = false,
  disableFlag = false,
  error = false,
  required = false 
}) => {
  const [open, setOpen] = useState(false);
  const isDisabled = disableFlag ? !disabled || disabled.length === 0 : disabled;

  
  return (
    <Box>
      <FormControl
        required={required}
        error={error}
        sx={{ 
          minWidth: width, 
          marginBottom: 2,
          '& .MuiOutlinedInput-root': {
            '& .MuiSelect-select': {
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              '& div': {
                display: 'inline-block',
                maxWidth: '100%'
              }
            },
            '&.Mui-disabled': {
              backgroundColor: 'action.disabledBackground',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'action.disabled'
              }
            }
          }
        }}
        disabled={isDisabled}
      >
        <InputLabel 
          error={error}
          sx={{ 
            '&.Mui-focused': {
              color: '#7451f8',
            },
          }}
        >
          {name}
        </InputLabel>
        <Select
          label={name}
          open={open}
          onOpen={() => !isDisabled && setOpen(true)}
          onClose={() => setOpen(false)}
          value={selectedData?.name || ""}
          name="htmlContent"
          error={error}
          disabled={isDisabled}
          onChange={(e) => {
            const selected = data.find(item => item.name === e.target.value);
            setSelectedData(selected);
          }}
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
          renderValue={(selected) => (
            <div dangerouslySetInnerHTML={{ __html: selected }} />
          )}
        >
          {console.log("DataCheck", data)}
          {data.map((item) => (
            <MenuItem 
              key={item.name} 
              value={item.name}
              sx={{
                '&:hover': {
                  backgroundColor: !isDisabled ? '#f5f0ff' : 'inherit',
                },
                '&.Mui-selected': {
                  backgroundColor: !isDisabled ? '#f0e6ff' : 'inherit',
                }
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: item.name }} />
            </MenuItem>
          ))}
        </Select>
        {isDisabled && (
          <FormHelperText>No options available</FormHelperText>
        )}
        {error && !isDisabled && (
          <FormHelperText error>Please select a valid option</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};


export default HtmlDisplayDropdown;