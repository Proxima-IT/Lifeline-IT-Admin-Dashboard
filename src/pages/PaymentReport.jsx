import React from "react";

const PaymentReport = () => {
  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 ">
        <h2 className="mb-6 text-2xl text-left font-semibold leading-tight">
          Payment Reports
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead className="">
              <tr className="text-center lg:text-base text-sm ">
                <th className="p-3">SID</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Student Email</th>
                <th className="p-3">Date</th>
                <th className="p-3 ">Amount</th>
                <th className="p-3 ">Transaction</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-opacity-20 text-center border-gray-700 ">
                <td className="p-3">
                  <p>SRDON908</p>
                </td>
                <td className="p-3">
                  <p>14,Jan,2022</p>
                </td>
                <td className="p-3">
                  <p>4300.00</p>
                </td>
                <td className="p-3">
                  <p>4400.00</p>
                </td>
                <td className="p-3 ">
                  <p>0.00</p>
                </td>
                <td className="p-3 ">
                  <p>0.00</p>
                </td>
                <td className="p-3 ">
                  <span className="px-3 py-1 font-semibold rounded-md bg-[#0b2a53] text-white">
                    <span>View</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentReport;
