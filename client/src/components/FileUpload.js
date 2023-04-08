import { useEffect, useState, useRef } from "react";
import React from "react";

const FileUpload = ({
  name,
  labelText,
  type,
  value: file,
  handleChange,
  accept,
}) => {
  const filePickerRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setPreviewUrl(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handlePickImage = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <input
        ref={filePickerRef}
        style={{ display: "none" }}
        type={type}
        accept={accept}
        name={name}
        onChange={handleChange}
      />
      <div className="image-upload center">
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <button className="btn" type="button" onClick={handlePickImage}>
          pick image
        </button>
      </div>
    </div>
  );
};
// (prevProps, nextProps) => {
//   if (
//     prevProps.name === nextProps.name &&
//     prevProps.labelText === nextProps.labelText &&
//     prevProps.type === nextProps.type &&
//     prevProps.accept === nextProps.accept
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

export default FileUpload;
