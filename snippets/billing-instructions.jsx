const BillingInstructions = ({ creditsPerRequest = 1 }) => {
  const creditUnitPrice = 0.0027;

  const tiers = [
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
      <ul>
        <li>
          Each successful API request consumes{" "}
          <strong>
            {creditsPerRequest} credits (≈{" "}
            {formatCurrency(creditUnitPrice * creditsPerRequest, 4)})
          </strong>
          .
        </li>
        <li>
          Failed requests are not billed.
        </li>
      </ul>

      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "right" }}>Price</th>
            <th style={{ textAlign: "right" }}>Requests</th>
            <th style={{ textAlign: "right" }}>Cost / Request</th>
            {/* <th style={{ textAlign: "right" }}>Credits</th> */}
            {/* <th style={{ textAlign: "right" }}>Cost / Credit</th> */}
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => {
            const requests = tier.credits / creditsPerRequest;
            const costPerRequest = tier.costPerCredit * creditsPerRequest;

            return (
              <tr key={tier.credits}>
                <td style={{ textAlign: "right" }}>{formatCurrency(tier.price)}</td>
                <td style={{ textAlign: "right" }}>{formatNumber(requests)}</td>
                <td style={{ textAlign: "right" }}>{formatCurrency(costPerRequest, 4)}</td>
                {/* <td style={{ textAlign: "right" }}>{formatNumber(tier.credits)}</td> */}
                {/* <td style={{ textAlign: "right" }}>{formatCurrency(tier.costPerCredit, 4)}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Tip>
        <strong>Purchase & Access</strong>

        <ul>
          <li>
            <a href="https://www.ailabtools.com/price?tab=developer" target="_blank">
              View Pricing
            </a>
          </li>
          <li>
            <a href="https://www.ailabtools.com/developer-platform" target="_blank">
              Developer Platform
            </a>
          </li>
        </ul>
      </Tip>

      <Tip>
        <strong>Custom Plans</strong>

        <p>
          For higher credit requirements or enterprise plans, please contact us at <a href="mailto:business@ailabtools.com">business@ailabtools.com</a>.
        </p>
      </Tip>
    </>
  );
}

export default BillingInstructions;
