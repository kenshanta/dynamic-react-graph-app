import React from "react";
import { Box, Button, Slider, NativeSelect, InputLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getYearlyQuarters, createQuarterToNumberMap } from "../utils/helpers";
import { toast } from "react-toastify";

const quarterToNumberMap = createQuarterToNumberMap(getYearlyQuarters());
const marks = getYearlyQuarters().map((quarter) => ({
  value: quarterToNumberMap[quarter],
  label: quarter,
}));
function valueLabelFormat(value: number) {
  return marks.find((mark) => mark.value === value)?.label;
}

interface SearchFormProps {
  handleRegistration: (data: {
    apartmentType: string;
    quarterly: number[];
  }) => Promise<void>;
}
interface FormDataProps {
  apartmentType: string;
  quarterly: number[];
}
const SearchForm: React.FC<SearchFormProps> = ({ handleRegistration }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();
  const { houseNumber = "", from = "3", to = "7" } = useParams();

  React.useEffect(() => {
    if (errors.apartmentType) {
      toast("Select a housing type", { type: "warning" });
    }
  }, [errors]);
  return (
    <Box>
      <form className="form" onSubmit={handleSubmit(handleRegistration)}>
        <InputLabel>Housing Type</InputLabel>
        <Box paddingBottom={5}>
          <NativeSelect
            size="small"
            defaultValue={houseNumber}
            {...register("apartmentType", { required: true })}
            variant="outlined"
            color="error"
          >
            <option value="" hidden>
              select an option
            </option>
            <option value={"00"}>Housing in total</option>
            <option value={"02"}>Small house</option>
            <option value={"03"}>Block apartments</option>
          </NativeSelect>
        </Box>
        <InputLabel>Quarterly range</InputLabel>
        <Box>
          <Controller
            name="quarterly"
            control={control}
            defaultValue={[parseInt(from), parseInt(to)]}
            render={({ field }) => (
              <Slider
                {...field}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                onChange={(_, newValue) => field.onChange(newValue)}
                marks={marks}
                valueLabelFormat={valueLabelFormat}
                max={marks.length - 2}
                sx={{ color: "rgb(186, 12, 46)" }}
              />
            )}
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"} flexDirection={"row"}>
          <Button size="large" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SearchForm;
