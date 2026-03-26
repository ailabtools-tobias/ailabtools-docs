const QueryingCreditsTableRow = ({
  rowSpan = 0,
  category = "",
  href = "",
  apiName = "",
  sign = "",
}) => {
  const normalizedRowSpan = Number(rowSpan) || 0;

  return (
    <tr>
      {normalizedRowSpan > 0 ? (
        <td rowSpan={normalizedRowSpan} className="border border-gray-300 p-2 align-middle">
          {category}
        </td>
      ) : null}
      <td className="border border-gray-300 p-2 align-middle">
        {href ? (
          <a href={href}>{apiName}</a>
        ) : (
          apiName
        )}
      </td>
      <td className="border border-gray-300 p-2 align-middle">{sign}</td>
    </tr>
  );
};

export default QueryingCreditsTableRow;
