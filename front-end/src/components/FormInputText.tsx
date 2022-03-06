import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type FormInputProps = {
  name: string;
  control: any; // eslint-disable-line
  label: string;
  value?: string;
  required?: boolean;
};

export const FormInputText = ({
  name,
  control,
  label,
  required,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    rules={{ required }}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        helperText={error ? error.message : null}
        size="small"
        error={!!error}
        onChange={onChange}
        value={value || ""}
        fullWidth
        label={label}
        variant="outlined"
        required={required}
      />
    )}
  />
);
