const Input = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
  error,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-gray-300">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="
          w-full
          rounded-xl
          border
          border-gray-700
          bg-gray-900
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;