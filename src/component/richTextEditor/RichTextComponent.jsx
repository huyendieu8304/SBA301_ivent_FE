import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['link', 'image', 'video'],

    [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent

    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'font': []}],
    [{'align': []}],

    ['clean']                                         // remove formatting button
];


const RichTextComponent = forwardRef((props, ref) => {
    const {
        onChangeDebounced,
        value = "",
        isDisabled = false,
    } = props;

    const editorWrapperRef = useRef(null);
    const quillRef = useRef(null);
    const debounceTimerRef = useRef(null);
    const lastExternalValueRef = useRef(""); // để tránh cập nhật lặp lại

    // Khởi tạo Quill
    useEffect(() => {
        if (editorWrapperRef.current && !quillRef.current) {
            editorWrapperRef.current.innerHTML = "";

            // Create a div for Quill to render into
            const editorContainer = document.createElement("div");
            editorWrapperRef.current.appendChild(editorContainer);

            quillRef.current = new Quill(editorContainer, {
                theme: "snow",
                modules: {
                    toolbar: toolbarOptions,
                },
            });

            quillRef.current.enable(!isDisabled); //chạy đúng trạng thái ban đầu, nhỡ isdiable đổi nó cũng không đoỏi

            // Gắn listener
            quillRef.current.on("text-change", () => {
                if (debounceTimerRef.current) {
                    clearTimeout(debounceTimerRef.current);
                }

                debounceTimerRef.current = setTimeout(() => {
                    if (onChangeDebounced) {
                        const html = quillRef.current.root.innerHTML;
                        lastExternalValueRef.current = html; // cập nhật lại cache
                        onChangeDebounced({
                            html,
                            text: quillRef.current.getText(),
                            delta: quillRef.current.getContents(),
                        });
                    }
                }, 500);
            });
        }
    }, []);

    // Cập nhật enable/disable
    useEffect(() => {
        if (quillRef.current) {
            quillRef.current.enable(!isDisabled);
        }
    }, [isDisabled]);

    // Cập nhật nội dung từ prop value (controlled)
    useEffect(() => {
        if (quillRef.current) {
            const editorHTML = quillRef.current.root.innerHTML;
            const isDiff = value !== editorHTML && value !== lastExternalValueRef.current;

            if (isDiff) {
                //thay dổi thì mới cập nhật lại
                quillRef.current.clipboard.dangerouslyPasteHTML(value);
                lastExternalValueRef.current = value;
            }
        }
    }, [value]);

    // expose hàm ra ngoài qua ref
    useImperativeHandle(ref, () => ({
        getHTML: () => quillRef.current?.root?.innerHTML ?? "",
        getText: () => quillRef.current?.getText?.() ?? "",
        getDelta: () => quillRef.current?.getContents?.() ?? null,
        setHTML: (html) => {
            if (quillRef.current) {
                quillRef.current.clipboard.dangerouslyPasteHTML(html ?? "");
                lastExternalValueRef.current = html ?? "";
            }
        }
    }));

    return (
        <div
            ref={editorWrapperRef}
            style={{
                backgroundColor: isDisabled ? "#f5f5f5" : "#fff",
                pointerEvents: isDisabled ? "none" : "auto",
                opacity: isDisabled ? 0.6 : 1,
                borderRadius: 4,
                border: "1px solid #ccc",
                // minHeight: 150,
            }}
        />
    );
});

export default RichTextComponent;


//CÁCH DÙNG
//THÊM MẤY CÁI BÊN DƯỚI VÀO COMPONENT CHỨA RICH TEXT
// const richTextRef = useRef();
//
// const getRichTextData = () => {
//     const htmlContent = richTextRef.current.getHTML();
//     const plainText = richTextRef.current.getText();
//     const delta = richTextRef.current.getDelta();
//
//     console.log("HTML:", htmlContent);
//     console.log("Plain text:", plainText);
//     console.log("Delta:", delta);
// };
//
// <div>
//     <RichTextComponent ref={richTextRef}/>
//     <button onClick={getRichTextData}>Lấy nội dung</button>
// </div>
