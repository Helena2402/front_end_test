'use client'; // Mark this as a Client Component

import React, { useEffect, useState, useRef } from "react";
import PostCard from "./PostCard";
import { GetPosts } from "./GetPosts"; // Import the Server Component

export default function InfiniteScrollPosts() {
  const [posts, setPosts] = useState<any[]>([]); // Store posts
  const [page, setPage] = useState(1); // Track the current page for fetching posts
  const [loading, setLoading] = useState(false); // Loading state
  const loaderRef = useRef(null); // Reference to the loader element

  // Fetch initial set of posts on component mount
  useEffect(() => {
    const fetchInitialPosts = async () => {
      setLoading(true);
      const initialPosts = await GetPosts(1);
      setPosts(initialPosts); // Set initial posts
      setLoading(false);
    };
    fetchInitialPosts();
  }, []);

  // Fetch more posts when the page number changes
  const loadMorePosts = async () => {
    setLoading(true);
    const newPosts = await GetPosts(page);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append the new posts
    setLoading(false);
  };

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1); // Increase page to fetch more posts
        }
      },
      {
        root: null, // observe within the viewport
        rootMargin: "0px",
        threshold: 1.0, // Trigger when 100% of the loader is visible
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current); // Observe the loader element
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current); // Cleanup observer on unmount
      }
    };
  }, [loading]);

  // Load more posts when page number changes
  useEffect(() => {
    if (page > 1) {
      loadMorePosts();
    }
  }, [page]);

  return (
    <div>
      <h1 className="heading text-3xl">Recent</h1>
      
      {/* Render the list of posts */}
      {posts.map((post, index) => (
        <PostCard
          key={index}
          name={post.name}
          username={post.username}
          body={post.body}
          tags={post.tags}
          likes={post.likes}
          shares={post.shares}
          views={post.views}
        />
      ))}

      {/* Loader element for infinite scroll */}
      <div ref={loaderRef} className="loading-indicator">
        {loading && <img className="h-40 w-40 mx-auto" src="/images/loading.gif"/>}
      </div>
    </div>
  );
}
