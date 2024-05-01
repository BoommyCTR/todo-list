import * as React from "react"
import {
  Box,
  Button,
  Divider,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material"
import SelectTypeComponent from "./SelectTypeComponent"
import FilterListIcon from "@mui/icons-material/FilterList"
import ListItemComponent from "./ListItemComponent"

function FormComponent() {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")

  const [type, setType] = React.useState("show all")

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value)
  }

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const itemsArray = localStorage.getItem("myTodoList")
      ? JSON.parse(localStorage.getItem("myTodoList") as string)
      : []
    itemsArray.push({ title, description, check: false })
    localStorage.setItem("myTodoList", JSON.stringify(itemsArray))
    setTitle("")
    setDescription("")
    console.log(title, description)
  }

  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    setType(e.target.value)
    // console.log(e.target.value)
  }

  return (
    <>
      <Box
        height={600}
        width="60%"
        display="grid"
        p={5}
        bgcolor="white"
        borderRadius="1rem"
        boxShadow={3}
      >
        <Box overflow="scroll" width="100%">
          <Typography variant="h3" gutterBottom>
            Todo List
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={3} gap={2} display="grid">
              <Box gap={2} display="flex">
                <TextField
                  required
                  id="outlined-required"
                  label="Title"
                  placeholder="Title"
                  fullWidth
                  onChange={(e) => handleChangeTitle(e)}
                  value={title}
                />
                <Button variant="contained" disableElevation type="submit">
                  Add
                </Button>
              </Box>
              <TextField
                id="outlined-textarea"
                label="Description"
                placeholder="Description"
                onChange={(e) => handleChangeDescription(e)}
                value={description}
              />
            </Box>
          </form>
          <Divider variant="middle" />
          <Box mt={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <FilterListIcon />
              Filters:
              <SelectTypeComponent
                handleChangeSelect={handleChangeSelect}
                type={type}
              />
            </Box>
            <ListItemComponent type={type} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default FormComponent
