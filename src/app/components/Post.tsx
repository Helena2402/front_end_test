import React from "react";


export default function Post(props : any) {
    return (
    <>
        <div className="border shadow-sm mx-auto my-5 bg-white rounded-lg">
            {/* Post header */}
            <div className="flex items-center px-4 py-3">
                <img className="h-12 w-12 rounded-full object-cover" src="/images/avatar.png"/>
                <div className="ml-3">
                    <h3 className="text-gray-900 font-semibold">{props.name}</h3>
                    <span className="text-gray-500 text-sm">@{props.username}</span>
                </div>
            </div>
        
            {/*Post body*/}
            <div className="px-4 py-2">
                <p className="text-gray-800">{props.body}</p>
                
                { props.tags && props.tags.length > 0 && (
                    <div className="flex mt-2">
                        {props.tags.map((prop: string, index: number) => (
                            <a key={index} href="#" className="text-blue-500 hover:underline text-sm">#{prop}&nbsp;</a>
                        ))}
                    </div>
                )}

            </div>
            
            {/*Post footer*/}
            <div className="flex items-center justify-between px-4 py-3 border-t">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <img className="h-5 w-5 object-cover" src="/images/like.png"/>
                        <span className="ml-1 text-gray-600 text-sm">{props.likes}</span>
                    </div>
                
                    <div className="flex items-center">
                        <img className="h-5 w-5 object-cover" src="/images/share.png"/>
                        <span className="ml-1 text-gray-600 text-sm">{props.shares}</span>
                    </div>
                    <div className="flex items-center">
                        <img className="h-5 w-5 object-cover" src="/images/seen.png"/>
                        <span className="ml-1 text-gray-600 text-sm">{props.views}</span>
                    </div>
                </div>
            </div>
        </div>
    </> );
  }