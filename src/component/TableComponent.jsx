import {DataGrid} from "@mui/x-data-grid";
import React from "react";
import renderCellExpand from "./GridCellExpand.jsx";
import {PAGE_SIZE_OPTIONS} from "../common/Constant.jsx";

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
                            rows,
                            handleClickRow,
                            handlePaginationChange,
                            totalRowCount,
                            page,
                            pageSize,
                            hideFooter = false,
                            showCellVerticalBorder = false,
                            showColumnVerticalBorder = false,
                        }) => {
    return (
        <DataGrid
            pagination
            paginationMode="server"
            rowCount={totalRowCount}
            page={page}
            pageSize={pageSize}
            hideFooter={hideFooter}
            showCellVerticalBorder={showCellVerticalBorder}
            showColumnVerticalBorder={showColumnVerticalBorder}
            disableColumnFilter
            disableRowSelectionOnClick
            disableColumnMenu={true}
            unstable_rowSpanning={false}
            columns={translateColumn(columns)}
            //chạy khi ta nhấn chuột vào dòng
            onRowClick={(params, event, details) =>
                handleClickRow(params, event, details)
            }
            //chạy khi ta thay đổi page hoặc pageSize
            onPaginationModelChange={({ page, pageSize }) =>
                handlePaginationChange(page, pageSize)
            }
            rows={rows}
            getRowId={Math.random}
            initialState={{
                pagination: {
                    paginationModel: {pageSize: pageSize},
                },
            }}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            sx={{
                ...dataGridStyle,
            }}
        />
    );
};
export default TableComponent;