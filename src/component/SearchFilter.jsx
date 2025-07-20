import React, {useEffect, useState} from "react";
import {Button, Popover, Stack, Typography} from "@mui/material";
import ValidateSelect from "./validateInput/ValidateSelect.jsx";

function SearchFilter({searchParams, setSearchParams, categories, provinceList}) {

    const [province, setProvince] = useState(searchParams.get("p") || "");
    const [category, setCategory] = useState(searchParams.get("cate") || "");

    const categoryList = categories.map(category => ({
        id: category.id,
        label: category.name,
        value: category.id
    }))

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleResetFilter = () => {
        setProvince(null);
        setCategory(null);
    }

    const handlePickingFilter = () => {
        const newParams = new URLSearchParams(searchParams.toString()); // giữ lại các param khác
        if (province) {
            newParams.set("p", province);
        } else {
            newParams.delete("p");
        }

        if (category) {
            newParams.set("cate", category);
        } else {
            newParams.delete("cate");
        }
        setSearchParams(newParams);
        handleClose();
    }

    return (
        <>
            <Button
                variant="contained"
                sx={{textTransform: "none", borderColor: "white", borderRadius: "20px"}}
                onClick={handleClick}
            >
                <Typography
                    variant="subtitle1"
                    sx={{color: "white", fontFamily: 'Arial', fontSize: "14px"}}
                >
                    Bộ lọc
                </Typography>
            </Button>

            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            width: "90vw",          // gần full màn hình trên thiết bị nhỏ
                            maxWidth: "200px",      // giới hạn ở màn to
                            padding: "10px"
                        },
                    },
                }}
            >
                <Stack spacing={1} mt={1}>
                    <ValidateSelect
                        label={"Địa điểm"}
                        fieldName="province"
                        value={province}
                        error={""}
                        onChange={setProvince}
                        listOptions={provinceList}
                        size={"small"}
                    />

                    <ValidateSelect
                        label={"Thể loại"}
                        fieldName="category"
                        value={category}
                        error={""}
                        onChange={setCategory}
                        listOptions={categoryList}
                        size={"small"}
                    />

                    <Stack direction="row" spacing={1} mt={1} justifyContent={"end"}>
                        <Button onClick={handleResetFilter}>Đặt lại</Button>
                        <Button onClick={handlePickingFilter} variant="contained" sx={{color: "white"}}>Áp dụng</Button>
                    </Stack>
                </Stack>
            </Popover>
        </>
    );
}

export default SearchFilter;