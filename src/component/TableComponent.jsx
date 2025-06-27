import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef } from "react";
import renderCellExpand from "./GridCellExpand.jsx";

//css for table
const dataGridStyle = {
    "& .MuiDataGrid-columnHeaderTitle": {
        whiteSpace: "normal",
        lineHeight: "normal",
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
        display: "flex !important",
        flexDirection: "row !important",
        alignItems: "center !important",
    },
    "& .MuiBox-root": {
        height: "100%",
        alignContent: "center",
    },
};
const baseColumnOptions = {
    sortable: false,
    filterable: false,
    pinnable: false,
    hideable: false,
};
const translateColumn = (listColumn) => {
    return listColumn.map((column) => {
        return {
            ...column,
            ...baseColumnOptions,
            renderCell: column.renderCell || renderCellExpand,
        };
    });
};
const TableComponent = ({
                         columns,
                         data,
                         handleClickRow,
                         pageSizeOptions = [10, 20, 35],
                         hideFooter = false,
                         showCellVerticalBorder = false,
                         showColumnVerticalBorder = false,
                     }) => {
    return (
        <DataGrid
            hideFooter={hideFooter}
            showCellVerticalBorder={showCellVerticalBorder}
            showColumnVerticalBorder={showColumnVerticalBorder}
            disableColumnFilter
            disableRowSelectionOnClick
            disableColumnMenu={true}
            unstable_rowSpanning={false}
            columns={translateColumn(columns)}
            onRowClick={(params, event, details) =>
                handleClickRow(params, event, details)
            }
            rows={data}
            getRowId={Math.random}
            slotProps={{
                pagination: { labelRowsPerPage: "ページあたりの行数" },
            }}
            initialState={{
                ...data.initialState,
                pagination: {
                    paginationModel: { pageSize: pageSizeOptions[0] },
                },
            }}
            pageSizeOptions={pageSizeOptions}
            sx={{
                ...dataGridStyle,
            }}
        />
    );
};
export default TableComponent;