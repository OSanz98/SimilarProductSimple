const columns = [
    {field: 'name', headerName: 'Product Name', width: 150},
    {field: 'url', headerName: 'Product URL', width: 150, renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noreferrer">
            {params.value}
        </a>
    )},
    {field: 'price', headerName: 'Product Price', width: 150}
];

export default columns;