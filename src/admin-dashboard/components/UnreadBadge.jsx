const UnreadBadge = ({ count }) => {
  if (!count || count === 0) return null;
  return (
    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-[#001E2B] bg-[#00ED64] rounded-full">
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default UnreadBadge;