import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef } from "react";
import { Box, Paper, Popper, Typography } from "@mui/material";

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            if (nativeEvent.key === "Escape") {
                setShowFullCell(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: "center",
                lineHeight: "24px",
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex",
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: "100%",
                    width,
                    display: "block",
                    position: "absolute",
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width, marginLeft: -17, zIndex: 100 }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

function renderCellExpand(params) {
    return (
        <Box>
            <GridCellExpand
                value={params.value || ""}
                sx={{ width: "100%" }}
                data={params}
            />
        </Box>
    );
}

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
const CommonTable = ({
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
export default CommonTable;