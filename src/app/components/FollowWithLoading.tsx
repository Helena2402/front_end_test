// components/PostsWithLoading.tsx (Client Component)
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically load the Server Component to enable client-side loading state
const WhoToFollow = dynamic(() => import('./WhoToFollow'));

export default function PostsWithLoading() {
  const [isLoading, setIsLoading] = useState(true); // Manage loading state

  useEffect(() => {
    // When the component mounts, set loading to false after SuggestedPosts is loaded
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
            <span className="heading text-3xl">Who to follow</span>
            <div className="border shadow-sm mx-auto my-5 bg-white rounded-lg">
                <img className="object-cover mx-auto" src="/images/loading.gif"/>
            </div>
        </div>
      ) : (
        <WhoToFollow />
      )}
    </div>
  );
}

