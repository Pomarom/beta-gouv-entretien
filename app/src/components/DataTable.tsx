import { useEffect, useState} from 'react';
import { DataGrid, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 400 },
  { field: 'status', headerName: 'Status', width: 100 }
];


const getMissions = () => {
  return axios.get('http://localhost:8080/missions')
}

export default function DataTable() {

  const [missions, setMissions] = useState([])
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  })

  const navigate = useNavigate();
  const handleClick = (params: GridRowParams) => navigate(`/fiche/${params.id}`);

  useEffect(() => {
    getMissions()
    .then(({data}) => setMissions(data)) 
    .catch(() => setMissions([]))
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
        onRowClick={handleClick}
      />
    </div>
  );
}
