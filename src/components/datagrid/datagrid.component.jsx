import { DataGrid } from "@mui/x-data-grid";


const columns = [
    {field: 'name', headerName: 'Product Name', flex: 1},
    {field: 'url', headerName: 'Product URL', flex: 1, renderCell: (params) => (
        <a target='_blank' rel="noreferrer" href={params.row.url}>{params.row.url}</a> 
    )},
    {field: 'price', headerName: 'Product Price', flex: 1}
];

const CustomDataGrid = ({similarProducts}) => {
    return (
        <DataGrid 
            autoPageSize
            columns={columns} 
            rows={similarProducts}
            sx={{
                maxHeight: '400px'
            }}
        />
    )
};

export default CustomDataGrid;