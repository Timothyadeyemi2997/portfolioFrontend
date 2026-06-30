import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const UploadDropzone = ({
  image,
  setImage,
}) => {
  const onDrop =
    useCallback((files) => {
      const file = files[0];

      if (!file) return;

      setImage(file);
    }, [setImage]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2
        border-dashed
        rounded-2xl
        p-10
        text-center
        cursor-pointer
        transition

        ${
          isDragActive
            ? "border-green-500"
            : "border-gray-700"
        }
      `}
    >
      <input
        {...getInputProps()}
      />

      <p>
        Drag & Drop image here
      </p>

      <p className="text-sm text-gray-400 mt-2">
        or click to select
      </p>

      {image && (
        <div className="mt-4">
          {image.name}
        </div>
      )}
    </div>
  );
};

export default UploadDropzone;