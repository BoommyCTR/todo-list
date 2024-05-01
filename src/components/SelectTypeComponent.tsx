import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"

function SelectTypeComponent({
  handleChangeSelect,
  type,
}: {
  handleChangeSelect: (e: SelectChangeEvent<string>) => void
  type: string
}) {
  return (
    <>
      <Box>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            id="demo-simple-select-autowidth"
            value={type}
            defaultValue="show all"
            onChange={(e) => handleChangeSelect(e)}
          >
            <MenuItem value={"show all"}>show all</MenuItem>
            <MenuItem value={"completed"}>completed</MenuItem>
            <MenuItem value={"incomplete"}>incomplete</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default SelectTypeComponent
