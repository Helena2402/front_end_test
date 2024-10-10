import React from "react";


interface ErrorProps {
    title:string;
    description: string; // Define the type for the description prop
  }

export default function ErrorCard({ title, description }: ErrorProps) {
    return (
    <>
    <div className="errorCard">
        <img src="/images/warning.svg" alt="Warnign error" className="errorPicture" />
        <p className="errorTitle"> {title} </p>
        <p className="errorDescription">{description}</p>
    </div>
        
    </> );
  }