import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type FormInputProps = {
  name: string;
  control: any; // eslint-disable-line
  label: string;
  value?: string;
  isRequired?: boolean;
};

export const FormInputText = ({
  name,
  control,
  label,
  isRequired,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    rules={{ required: isRequired ? true : false }}
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
        required={isRequired ? true : false}
      />
    )}
  />
);
