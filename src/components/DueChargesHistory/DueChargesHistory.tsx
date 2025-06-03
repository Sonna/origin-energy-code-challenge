import React from "react";
import { NavLink, useParams } from "react-router";

import { Loader } from "../Loader/Loader";
import { Text } from "../DesignSystem";
import { getTotalColour } from "../utils/getTotalColour";

import { useGetPaymentsHistory } from "./queries.openapi";

export const DueChargesHistory = () => {
  const { accountId = "" } = useParams();
  const { data, isFetching, error } = useGetPaymentsHistory(accountId);

  if (error) return <p>Error loading accounts</p>;

  return (
    <div className="paper container container-lg">
      <NavLink to="/">Back</NavLink>
      {isFetching && <Loader />}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>AccountID</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((payment) => (
              <tr>
                <td>{payment.id}</td>
                <td>{payment.accountId}</td>
                <td>
                  <Text as="span" color={getTotalColour(payment.amount)}>
                    ${payment.amount.toFixed(2)}
                  </Text>
                </td>
                <td>{payment.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No payment history</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
