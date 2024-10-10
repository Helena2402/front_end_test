import React from "react";


export default function UserCardSmall(props : any) {
    return (
    <>
        <div className="border shadow-sm mx-5 my-1 bg-white rounded-lg width-auto">
            <div className="relative  flex items-center px-4 py-3">
                <img className="h-12 w-12 rounded-full object-cover" src="/images/avatar.png"/>
                <div className="ml-3">
                    <h3 className="text-gray-900 font-semibold">{props.name}</h3>
                    <span className="text-gray-500 text-sm">{props.username}</span> 
                </div>
                <button className="customSecondaryButton absolute right-2">Follow</button>
            </div>
        </div>
    </> );
  }