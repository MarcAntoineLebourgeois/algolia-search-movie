import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type FormInputProps = {
  name: string;
  control: any; // eslint-disable-line
  label: string;
  value?: string;
};

export const FormInputText = ({ name, control, label }: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        helperText={error ? error.message : null}
        size="small"
        error={!!error}
        onChange={onChange}
        value={value}
        fullWidth
        label={label}
        variant="outlined"
      />
    )}
  />
);
