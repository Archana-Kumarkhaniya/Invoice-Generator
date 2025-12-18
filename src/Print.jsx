import React from "react";

const Print = () => {
  const storedData = JSON.parse(localStorage.getItem("invoicedata")) || {};
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  const storedTotals = JSON.parse(localStorage.getItem("totals")) || {};



  return (
    <div className="min-h-screen bg-white p-8 text-gray-800">
      {/* Header */}
      <div className="text-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-blue-700">Invoice</h1>
      </div>

      {/* Customer & Invoice Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="font-semibold text-lg mb-2">Customer Details</h2>
          <p><strong>Name:</strong> {storedData.customername}</p>
          <p><strong>Address:</strong> {storedData.address}</p>
          <p><strong>City:</strong> {storedData.city}</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Invoice Info</h2>
          <p><strong>Invoice No:</strong> {storedData.invnum}</p>
          <p><strong>Date:</strong> {storedData.invdate}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="min-w-full border border-gray-300 mb-6">
        <thead className="bg-blue-50">
          <tr>
            <th className="border px-3 py-2 text-left">Item</th>
            <th className="border px-3 py-2 text-center">Qty</th>
            <th className="border px-3 py-2 text-center">Rate</th>
            <th className="border px-3 py-2 text-center">Discount (%)</th>
            <th className="border px-3 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {storedItems.map((item, index) => {
            const qty = parseFloat(item.itemqty) || 0;
            const rate = parseFloat(item.rate) || 0;
            const discount = parseFloat(item.discount) || 0;
            const total = qty * rate;
            const finalAmt = total - (total * discount) / 100;

            return (
              <tr key={index} className="border-t">
                <td className="border px-3 py-2">{item.itemname}</td>
                <td className="border px-3 py-2 text-center">{item.itemqty}</td>
                <td className="border px-3 py-2 text-center">₹{item.rate}</td>
                <td className="border px-3 py-2 text-center">{item.discount}%</td>
                <td className="border px-3 py-2 text-right font-medium">
                  ₹{finalAmt}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Totals Section */}
      <div className="max-w-sm ml-auto space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-medium">₹{storedTotals.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>GST (18%):</span>
          <span className="font-medium">₹{storedTotals.gst}</span>
        </div>
        <div className="border-t border-gray-300 pt-3 flex justify-between text-base font-semibold">
          <span>Grand Total:</span>
          <span className="text-green-700">₹{storedTotals.grandTotal}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-xs text-gray-500 border-t pt-4">
        Thank you for your business!  
        <br />
        © 2025 | Invoice Print Page
      </div>
    </div>
  );
};

export default Print;
