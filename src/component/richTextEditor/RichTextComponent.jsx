import React, {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
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
    const editorWrapperRef = useRef(null);
    const quillRef = useRef(null);

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
        }
    }, []);

    useImperativeHandle(ref, () => ({
        getHTML: () => quillRef.current?.root.innerHTML,
        getText: () => quillRef.current?.getText(),
        getDelta: () => quillRef.current?.getContents()
    }));

    return (
        <div
            ref={editorWrapperRef}
            style={{
                backgroundColor: "#fff",
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
