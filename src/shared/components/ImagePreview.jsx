import {  useEffect, useState, } from "react";

const ImagePreview = ({
  file,
}) => {
  const [preview, setPreview] =
    useState("");

  useEffect(() => {
    if (!file) return;

    const url =
      URL.createObjectURL(
        file
      );

    setPreview(url);

    return () =>
      URL.revokeObjectURL(
        url
      );
  }, [file]);

  if (!file) return null;

  return (
    <img
      src={preview}
      alt="preview"
      className="
        mt-4
        rounded-xl
        h-52
        object-cover
        w-full
      "
    />
  );
};

export default ImagePreview;