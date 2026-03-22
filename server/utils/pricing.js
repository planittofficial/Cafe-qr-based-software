/**
 * @param {{ taxPercent?: number, discountType?: string, discountValue?: number }} cafe - lean cafe doc
 * @param {number} lineSubtotal - sum of (unit price × qty) before discount/tax
 */
function computeOrderTotals(cafe, lineSubtotal) {
  const round2 = (n) => Math.round(Number(n) * 100) / 100;

  const subtotalAmount = round2(lineSubtotal);
  const taxPct = Number(cafe?.taxPercent || 0);
  const discType = cafe?.discountType || "percent";
  const discVal = Number(cafe?.discountValue || 0);

  let discountAmount = 0;
  let afterDiscount = subtotalAmount;

  if (discType === "percent") {
    const pct = Math.min(Math.max(discVal, 0), 100);
    discountAmount = round2(subtotalAmount * (pct / 100));
    afterDiscount = round2(subtotalAmount - discountAmount);
  } else {
    discountAmount = round2(Math.min(discVal, subtotalAmount));
    afterDiscount = round2(subtotalAmount - discountAmount);
  }

  const taxAmount = round2(afterDiscount * (taxPct / 100));
  const totalAmount = round2(afterDiscount + taxAmount);

  return { subtotalAmount, discountAmount, taxAmount, totalAmount };
}

module.exports = { computeOrderTotals };
