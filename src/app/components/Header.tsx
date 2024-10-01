import React from 'react'

export default function Header(props: any) {

    return(
    <>
    <div className="bg-white shadow-md text-center py-4">
        <h2 className="text-gray-800 text-xl heading">{props.name}</h2>
    </div>
    </>);

}