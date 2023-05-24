import React, {useState} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowSelectionModel } from '@mui/x-data-grid'; // Add GridSelectionModel
import { serverCalls } from '../../api'; // ADD THIS
import { useGetData } from '../../custom-hooks'; // ADD THIS
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@mui/material'; // ADD THESE
import { NutritionForm } from '../../components/NutritionForm'; // ADD THIS
import { getAuth } from 'firebase/auth';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

interface gridData{
    data:{
      id?:string;
    }
  }

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const DataTable =  () => {
  
  let { NutritionData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridRowSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
  }
  console.log(gridData) // a list of id's from the checked rows
  // Checking Local Storage variable for authenticated user
  const MyAuth = localStorage.getItem('myAuth');
  console.log(MyAuth);

  //Conditional to render DataTable only for authenticated users
if (MyAuth == 'true'){

    return (
        <div style={{ height: 400, width: '100%' }}>
          <h2>Nutrition Facts</h2>
          <DataGrid 
						rows={NutritionData} 
						columns={columns} 
						pageSize={5} 
						checkboxSelection 
						onSelectionModelChange = {(newSelectionModel: any) => {setData(newSelectionModel);}}
						{...NutritionData}  
					/>

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

          {/*Dialog Pop Up begin */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update A Meal</DialogTitle>
          <DialogContent>
            <DialogContentText>Food: {gridData[0]}</DialogContentText>
              <NutritionForm id={`${gridData[0]}`}/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color = "primary">Done</Button> 
          </DialogActions>
        </Dialog>
        </div>
    )  
} else { 
    return( // **new** does not render datatable if user is not authenticated
    <div>
        <h3>Please Sign In</h3>
    </div>
)};

}