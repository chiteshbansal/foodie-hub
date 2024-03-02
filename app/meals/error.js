"use client";
// to make sure that it catches client side errors as well

import React from "react";

function Error(props) {
  return (
    <main className="error">
      <h1>An Error Occured !</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}

export default Error;
