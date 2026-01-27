import React from 'react';
import { Box, TextField, MenuItem, FormControl, InputLabel, Select, Chip, OutlinedInput, SelectChangeEvent } from '@mui/material';

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number | string[];
  onChange: (name: string, value: string | string[]) => void;
  type?: 'text' | 'date' | 'number' | 'select' | 'multiselect' | 'textarea';
  options?: { value: string; label: string }[];
  required?: boolean;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  options = [],
  required = false,
  helperText,
  multiline = false,
  rows = 4,
  fullWidth = true,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(name, e.target.value);
  };

  if (type === 'select') {
    return (
      <TextField
        select
        fullWidth={fullWidth}
        label={label}
        name={name}
        value={value as string}
        onChange={handleTextChange}
        required={required}
        helperText={helperText}
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  if (type === 'multiselect') {
    const selectValue = Array.isArray(value) ? value : [];
    
    const handleMultiChange = (event: SelectChangeEvent<typeof selectValue>) => {
      const val = event.target.value;
      onChange(name, typeof val === 'string' ? val.split(',') : val);
    };
    
    return (
      <FormControl fullWidth={fullWidth} size="small" required={required}>
        <InputLabel>{label}</InputLabel>
        <Select<string[]>
          multiple
          name={name}
          value={selectValue}
          onChange={handleMultiChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((val) => (
                <Chip key={val} label={val} size="small" />
              ))}
            </Box>
          )}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  if (type === 'textarea' || multiline) {
    return (
      <TextField
        fullWidth={fullWidth}
        label={label}
        name={name}
        value={value}
        onChange={handleTextChange}
        required={required}
        helperText={helperText}
        multiline
        rows={rows}
        size="small"
      />
    );
  }

  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      name={name}
      value={value}
      onChange={handleTextChange}
      type={type}
      required={required}
      helperText={helperText}
      size="small"
      InputLabelProps={type === 'date' ? { shrink: true } : undefined}
    />
  );
};

export default FormField;
