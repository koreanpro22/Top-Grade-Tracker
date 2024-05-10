import { redirect } from "next/navigation";
import React from "react";

export default function errorPage() {

    const handleClick = () => {
        redirect('/');
    }
 return (
    <div>
      <h1>404 Page Not Found</h1>
      <button onClick={handleClick}>Return to Home</button>
    </div>
  );
}
