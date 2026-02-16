"use client";

import classes from "./styles/copyright.module.scss";
import React, { useEffect, useState } from "react";

function Copyright() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <p className={classes.root}>
      © {year} The Proof of Luck Community Contributors. Code is Open Source.
    </p>
  );
}

export default Copyright;
