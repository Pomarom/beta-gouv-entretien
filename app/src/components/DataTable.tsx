import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios'


const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 400 },
  { field: 'status', headerName: 'Status', width: 100 }
];


const getMissions = (page: number, size: number) => {
  return axios.get('http://localhost:8080/missions', { params: { page, size }})
}

export default function DataTable() {

  const [missions, setMissions] = React.useState([])
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  })
  React.useEffect(() => {
    getMissions(paginationModel.page, paginationModel.pageSize).then(({data}) => setMissions(data)) 
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={missions}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
