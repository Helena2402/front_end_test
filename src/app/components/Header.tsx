import Link from 'next/link';
import React from 'react'

export default function Header(props: any) {
    return (
        <div className="bg-white shadow-md text-center py-4 relative">
          {/* Conditionally render the back arrow if name is "Profile" */}
          {props.name === "Profile" && (
            <Link href="/"><span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl font-bold">
              &lt;
            </span></Link>
          )}
          <h2 className="text-gray-800 text-xl heading">{props.name}</h2>
        </div>
      );
    }