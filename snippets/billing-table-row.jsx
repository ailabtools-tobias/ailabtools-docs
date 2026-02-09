const BillingTableRow = ({
  rowSpan = 0,
  category = "",
  href = "",
  apiName = "",
  credits = 0,
  creditUnitPrice = 0.0027,
}) => {
  const normalizedRowSpan = Number(rowSpan) || 0;
  const normalizedCredits = Number(credits) || 0;
  const costPerRequest = normalizedCredits * creditUnitPrice;

  const formatCurrency = (value, fractionDigits = 4) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });

  return (
    <tr>
      {normalizedRowSpan > 0 ? (
        <td rowSpan={normalizedRowSpan} className="border border-gray-300 p-2 align-middle">
          {category}
        </td>
      ) : null}
      <td className="border border-gray-300 p-2">
        <a href={href}>{apiName}</a>
      </td>
      <td className="border border-gray-300 p-2 text-right">{normalizedCredits}</td>
      <td className="border border-gray-300 p-2 text-right">≈ {formatCurrency(costPerRequest)}</td>
    </tr>
  );
};

export default BillingTableRow;
