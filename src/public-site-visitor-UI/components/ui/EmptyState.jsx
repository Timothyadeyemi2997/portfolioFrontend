const EmptyState = ({
  title = "Nothing Found",
  description,
}) => {
  return (
    <div className="text-center py-20">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="text-gray-400 mt-2">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;