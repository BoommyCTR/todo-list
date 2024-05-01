import * as React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

function ListItemComponent({ type }: { type: string }) {
  // console.log(type)

  const [data, setData] = React.useState<
    { title: string | number; description: string | number; check: boolean }[]
  >([])

  function dataListFunc() {
    const dataList = localStorage.getItem("myTodoList")
      ? JSON.parse(localStorage.getItem("myTodoList") as string)
      : []

    setData(dataList)
  }

  React.useEffect(() => {
    return () => dataListFunc()
  }, [localStorage.getItem("myTodoList")])

  // console.log(data)

  const handleToggle = (value: number) => () => {
    const dataNew = dataFilter.filter((_v: any, i: number) => {
      return i == value
    })

    dataNew[0].check = !dataNew[0].check

    localStorage.setItem("myTodoList", JSON.stringify(data))
    dataListFunc()
  }

  const handleDelete = (value: number) => () => {
    const dataNew = dataFilter.filter((_v: any, i: number) => {
      return i != value
    })

    localStorage.setItem("myTodoList", JSON.stringify(dataNew))

    dataListFunc()
    // console.log(dataNew, value)
  }

  const [dataFilter, setDataFilter] =
    React.useState<
      { title: string | number; description: string | number; check: boolean }[]
    >(data)

  function filterFunc(type: string) {
    const dataFilterNew = data.filter(
      (
        v: {
          title: string | number
          description: string | number
          check: boolean
        },
        i: number
      ) => {
        if (type == "completed") {
          return v.check != false
        }
        if (type == "incomplete") {
          return v.check != true
        }
        if (type == "show all") {
          return v
        }
      }
    )

    setDataFilter(dataFilterNew)
    // console.log(dataFilterNew)
  }

  React.useEffect(() => {
    filterFunc(type)
  }, [data, type])

  return (
    <List sx={{ width: "100%" }}>
      {dataFilter.map(
        (
          value: {
            title: string | number
            description: string | number
            check: boolean
          },
          i: number
        ) => {
          if (type == "completed") {
          }
          const labelId = `checkbox-list-label-${i}`

          return (
            <ListItem
              key={i}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={handleDelete(i)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(i)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.check}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={value.title}
                  secondary={value.description}
                />
              </ListItemButton>
            </ListItem>
          )
        }
      )}
    </List>
  )
}

export default ListItemComponent
