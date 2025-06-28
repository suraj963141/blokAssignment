'use client';

import Operators from './components/Operators';
import Circuit from './components/Circuit';

import React, { useState } from "react";

export default function Home() {
  const [droppingItem, setDroppingItem] = useState();
  return (
    <>
      <Operators setDroppingItem={setDroppingItem} />
      <div className="font-semibold text-lg px-2">Circuit</div>
      <Circuit droppingItem={droppingItem} />
    </>
  );
}
