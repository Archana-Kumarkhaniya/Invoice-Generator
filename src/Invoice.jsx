import React, { useEffect, useState } from "react";
import "./App.css";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const [formData, setFormData] = useState({
    customername: "",
    address: "",
    city: "",
    invnum: "",
    invdate: "",
  });

  const [items, setItems] = useState([
    {
      itemname: "",
      itemqty: "",
      rate: "",
      discount: "",
      amount: 0,
    },
  ]);

  let calculateAmount = (item) => {
    let qty = parseFloat(item.itemqty) || 0;
    let rate = parseFloat(item.rate) || 0;
    let discount = parseFloat(item.discount) || 0;
    let total = qty * rate;
    let finalAmt = total - (total * discount) / 100;
    return parseInt(finalAmt);
  };

  useEffect(() => {
    localStorage.setItem("invoicedata", JSON.stringify(formData));
    localStorage.setItem("items", JSON.stringify(items));
  }, [formData, items]);

  let handleAdd = () => {
    setItems([...items, { itemname: "", itemqty: "", rate: "", discount: "" }]);
  };

  let deleteItem = (index) => {
    let updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  let calculateSubtotal = () => {
    let subtotal = 0;
    for (let i = 0; i < items.length; i++) {
      const qty = parseFloat(items[i].itemqty) || 0;
      const rate = parseFloat(items[i].rate) || 0;
      subtotal += qty * rate;
    }
    return subtotal;
  };

  let calculateGST = () => (calculateSubtotal() * 18) / 100;
  let calculateGrandTotal = () =>
    Math.round(calculateGST() + calculateSubtotal());

  useEffect(() => {
    const subtotal = calculateSubtotal();
    const gst = calculateGST();
    const grandTotal = calculateGrandTotal();
    localStorage.setItem("totals", JSON.stringify({ subtotal, gst, grandTotal }));
  }, [items]);

  let handleReset = () => {
    setFormData({
      customername: "",
      address: "",
      city: "",
      invnum: "",
      invdate: "",
    });
    setItems([{ itemname: "", itemqty: "", rate: "", discount: "" }]);
    localStorage.removeItem("invoicedata");
    localStorage.removeItem("items");
    localStorage.removeItem("totals");
  };

  let navigate = useNavigate();
  let handlePrint = () => {
    navigate("/print");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-3 sm:px-6 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 tracking-tight">
            Invoice Generator
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Create clean and modern invoices easily
          </p>
        </div>

        {/* Invoice Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200 pb-6">
          {/* Customer Details */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
              Customer Details
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Customer Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, customername: e.target.value })
                }
                value={formData.customername}
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                value={formData.address}
              />
              <input
                type="text"
                placeholder="City"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                value={formData.city}
              />
            </div>
          </div>

          {/* Invoice Info */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
              Invoice Info
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Invoice Number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, invnum: e.target.value })
                }
                value={formData.invnum}
              />
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, invdate: e.target.value })
                }
                value={formData.invdate}
              />
            </div>
          </div>
        </div>

        {/* Item Details */}
        <div className="mt-8 overflow-x-auto">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
            Item Details
          </h2>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md text-sm">
              <thead className="bg-blue-50 text-gray-700 text-xs sm:text-sm">
                <tr>
                  <th className="px-2 sm:px-3 py-2 text-left">Item</th>
                  <th className="px-2 sm:px-3 py-2 text-center">Qty</th>
                  <th className="px-2 sm:px-3 py-2 text-center">Rate</th>
                  <th className="px-2 sm:px-3 py-2 text-center">Discount (%)</th>
                  <th className="px-2 sm:px-3 py-2 text-right">Amount</th>
                  <th className="px-2 sm:px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-2 sm:px-3 py-2">
                      <input
                        type="text"
                        name="itemname"
                        placeholder="Item name"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={(e) => {
                          items[index][e.target.name] = e.target.value;
                          setItems([...items]);
                        }}
                        value={item.itemname}
                      />
                    </td>
                    <td className="px-2 sm:px-3 py-2 text-center">
                      <input
                        type="number"
                        name="itemqty"
                        placeholder="0"
                        className="w-12 sm:w-16 text-center border border-gray-300 rounded-md px-1 sm:px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={(e) => {
                          items[index][e.target.name] = e.target.value;
                          setItems([...items]);
                        }}
                        value={item.itemqty}
                      />
                    </td>
                    <td className="px-2 sm:px-3 py-2 text-center">
                      <input
                        type="number"
                        name="rate"
                        placeholder="₹"
                        className="w-14 sm:w-20 text-center border border-gray-300 rounded-md px-1 sm:px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={(e) => {
                          items[index][e.target.name] = e.target.value;
                          setItems([...items]);
                        }}
                        value={item.rate}
                      />
                    </td>
                    <td className="px-2 sm:px-3 py-2 text-center">
                      <input
                        type="number"
                        name="discount"
                        placeholder="%"
                        className="w-12 sm:w-16 text-center border border-gray-300 rounded-md px-1 sm:px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={(e) => {
                          items[index][e.target.name] = e.target.value;
                          setItems([...items]);
                        }}
                        value={item.discount}
                      />
                    </td>

                    <td className="px-2 sm:px-3 py-2 text-right font-medium text-gray-800">
                      ₹{calculateAmount(item)}
                    </td>

                    <td className="px-2 sm:px-3 py-2 text-center">
                      <button
                        className="text-red-500 hover:text-red-700 transition-all"
                        title="Delete Item"
                        onClick={() => deleteItem(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="mt-4 bg-blue-600 text-white text-xs sm:text-sm font-semibold py-2 px-4 sm:px-5 rounded-md hover:bg-blue-700 transition-all"
            onClick={handleAdd}
          >
            + Add Item
          </button>
        </div>

        {/* Totals */}
        <div className="mt-8 max-w-full sm:max-w-sm ml-auto text-xs sm:text-sm space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium">₹{calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span className="font-medium">₹{calculateGST()}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-sm sm:text-base text-gray-800">
            <span>Grand Total</span>
            <span className="text-green-700">₹{calculateGrandTotal()}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button
            className="bg-gray-200 text-gray-700 py-2 px-4 sm:px-5 rounded-md text-xs sm:text-sm font-semibold hover:bg-gray-300 transition-all"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 sm:px-5 rounded-md text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-all"
            onClick={handlePrint}
          >
            Print / Export
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-[10px] sm:text-xs text-gray-500">
          © 2025 | Invoice Template | React + Tailwind CSS
        </div>
      </div>
    </div>
  );
};

export default Invoice;
