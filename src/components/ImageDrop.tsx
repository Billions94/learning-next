import React from 'react';
import { useDropzone } from 'react-dropzone';


const container = {
    border: '1px solid auto',
    borderStyle: 'dotted',
    borderWidth: 1,
    padding: 16,
} as React.CSSProperties;

const dark = {
    border: '4px solid #fff',
    borderStyle: 'dotted',
    borderWidth: 1,
    padding: 16,
} as React.CSSProperties;

// const thumbsContainer = {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 16,
// } as React.CSSProperties;

const thumb = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 8,
    width: '100%',
    height: '100%',
    padding: 4,
    boxSizing: 'border-box'
} as React.CSSProperties;

const thumbInner = {
    display: 'flex',
    minWidth: '0px',
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'center'
} as React.CSSProperties;

const img = {
    display: 'block',
    width: 'auto',
    maxHeight: 320
} as React.CSSProperties;


interface Props {
    file: File
    darkMode: boolean
    setFile: React.Dispatch<React.SetStateAction<File>>
    closePreview?: boolean
    setClosePreview?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ImageDrop({ darkMode, file, setFile, closePreview }: Props) {

    console.log('DrakMode value', darkMode)


    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: 'image/*',
        onDrop: acceptedFiles => {
            // For single file upload
            setFile(acceptedFiles[0])
            // For mutilple file upload

            // if (acceptedFiles.length > 1) {
            //     setFiles(acceptedFiles.map(file => Object.assign(file, {
            //         preview: URL.createObjectURL(file)
            //     })))
            // } else {
            //     const file = acceptedFiles[0];
            //     console.log('The file', file)
            //     setFiles(files.concat({
            //         preview: URL.createObjectURL(file)
            //     }));
            // }
        }
    });

    // File Preview
    // const thumbs = files.map(file => (
    //     <div style={thumb} key={file.name}>
    //         <div style={thumbInner}>
    //             <img
    //                 src={file.preview}
    //                 style={img}
    //             />
    //         </div>
    //     </div>
    // ));


    // useEffect(() => {
    //     // Make sure to revoke the data uris to avoid memory leaks
    //     files.forEach(file => URL.revokeObjectURL(file.preview));
    // }, [files]);

    return (
        <React.Fragment>
            {!file ?
                (<section style={container}>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag and drop the image you want to upload or click to select files</p>
                    </div>
                </section>) :
                <>
                    {closePreview ?
                        (<section style={darkMode === false ? container : dark}>
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Drag and drop the image you want to upload or click to select files</p>
                            </div>
                        </section>) :
                        (<div style={thumb} key={file.name}>
                            <div style={thumbInner}>
                                <React.Fragment>
                                    <h6>Your Image :</h6>
                                </React.Fragment>
                                <React.Fragment>
                                    <img src={URL.createObjectURL(file)} style={img} />
                                </React.Fragment>
                            </div>
                        </div>)
                    }
                </>
            }
        </React.Fragment>
    );
}

