const BillingTableRow = ({ rowSpan = 0, category = "", href = "", apiName = "", credits = 0, creditUnitPrice = 0.0027 }) => {
  const normalizedRowSpan = Number(rowSpan) || 0;
  const normalizedCredits = Number(credits) || 0;
  const costPerRequest = normalizedCredits * creditUnitPrice;

  const formatCurrency = (value, fractionDigits = 2) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });

  return (
    <tr>
      {normalizedRowSpan > 0 && (
        <th rowSpan={normalizedRowSpan} className="border p-2 align-middle">
          {category}
        </th>
      )}
      <td className="border p-2 align-middle">
        <a href={href}>{apiName}</a>
      </td>
      <td className="border p-2 text-right align-middle">{normalizedCredits}</td>
      <td className="border p-2 text-right align-middle">
        ≈ {formatCurrency(costPerRequest, 4)}
      </td>
    </tr>
  );
};

const QueryingCreditsTableRow = ({ rowSpan = 0, category = "", href = "", apiName = "", sign = "" }) => {
  const normalizedRowSpan = Number(rowSpan) || 0;

  return (
    <tr>
      {normalizedRowSpan > 0 && (
        <td
          rowSpan={normalizedRowSpan}
          className="border border-gray-300 p-2 align-middle"
        >
          {category}
        </td>
      )}
      <td className="border border-gray-300 p-2 align-middle">
        {href ? <a href={href}>{apiName}</a> : apiName}
      </td>
      <td className="border border-gray-300 p-2 align-middle">{sign}</td>
    </tr>
  );
};

const ExperienceLinks = ({ onlineUrl, apiUrl }) => {
  return (
    <Tip>
      Explore this API through the{" "}<a href={onlineUrl} target="_blank">👉 Online Experience 👈</a>{" "}or integrate it using the{" "}<a href={apiUrl}>👉 Run with API 👈</a>.
    </Tip>
  );
};

const BillingInstructions = ({ creditsPerRequest = 1 }) => {
  const creditUnitPrice = 0.0027;

  const billingTiers = [
    { price: 6, credits: 2000, costPerCredit: 0.003 },
    { price: 30, credits: 10000, costPerCredit: 0.003 },
    { price: 300, credits: 110000, costPerCredit: 0.0027 },
    { price: 1500, credits: 550000, costPerCredit: 0.0027 },
    { price: 2500, credits: 1000000, costPerCredit: 0.0025 },
  ];

  const formatCurrency = (value, fractionDigits = 2) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });

  const formatNumber = (value, fractionDigits = 0) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "right" }}>Price</th>
            <th style={{ textAlign: "right" }}>Requests</th>
            <th style={{ textAlign: "right" }}>Cost / Request</th>
          </tr>
        </thead>
        <tbody>
          {billingTiers.map((tier) => {
            const requests = tier.credits / creditsPerRequest;
            const costPerRequest = tier.costPerCredit * creditsPerRequest;

            return (
              <tr key={tier.credits}>
                <td style={{ textAlign: "right" }}>{formatCurrency(tier.price)}</td>
                <td style={{ textAlign: "right" }}>{formatNumber(requests)}</td>
                <td style={{ textAlign: "right" }}>
                  {formatCurrency(costPerRequest, 4)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Tip>
        Each successful API request consumes{" "}<strong>{creditsPerRequest} credits (≈{" "}{formatCurrency(creditUnitPrice * creditsPerRequest, 4)})</strong>. Failed requests are not billed.

        <ul>
          <li>
            View pricing on the{" "}<a href="/price?tab=api" target="_blank">pricing page</a>{" "}or manage credits in the{" "}<a href="/developer/billing" target="_blank">developer platform</a>.
          </li>
          <li>
            Need more credits or an enterprise plan? Contact{" "}<a href="mailto:business@ailabtools.com">business@ailabtools.com</a>.
          </li>
        </ul>
      </Tip>
    </>
  );
};

const FileStoragePolicy = ({ uploadedFiles, responseType }) => {
  const responseFileData = {
    URL: {
      stored: "Yes",
      retention: "24 Hours",
      deletion: "Automatic",
    },
    BASE64: {
      stored: "No",
      retention: "N/A",
      deletion: "Immediate",
    },
  };

  if (!uploadedFiles && !responseType) return null;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Data Type</th>
            <th>Stored</th>
            <th>Retention</th>
            <th>Training</th>
            <th>Deletion</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles && (
            <tr>
              <td>Uploaded Files</td>
              <td>No</td>
              <td>N/A</td>
              <td>No</td>
              <td>Immediate</td>
            </tr>
          )}
          {responseType && responseFileData?.[responseType] && (
            <tr>
              <td>Response Files ({responseType})</td>
              <td>{responseFileData[responseType]['stored']}</td>
              <td>{responseFileData[responseType]['retention']}</td>
              <td>No</td>
              <td>{responseFileData[responseType]['deletion']}</td>
            </tr>
          )}
        </tbody>
      </table>

      <Tip>
        For more information, see the{" "}<a href="/docs/file-storage-policy">File Storage Policy</a> and{" "}<a href="/privacy-policy" target="_blank">Privacy Policy</a>.
      </Tip>
    </div>
  );
};

export {
  BillingTableRow,
  QueryingCreditsTableRow,
  ExperienceLinks,
  BillingInstructions,
  FileStoragePolicy,
};
