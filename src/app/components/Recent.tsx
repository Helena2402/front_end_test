'use client';

import React, { useEffect, useState, useRef } from "react";
import PostCard from "./PostCard";
import { GetPosts } from "./GetPosts";
import ErrorCard from "./ErrorCard";

export default function InfiniteScrollPosts() {
  const [error, setError] = useState<{ title: string; description: string } | null>(null);
  const [posts, setPosts] = useState<any[]>([]); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const loaderRef = useRef(null); 


  useEffect(() => {
    const fetchInitialPosts = async () => {
      setLoading(true);
      const result = await GetPosts(1); 
      if (result.error) {
        setError(result.error); 
      } else if (result.posts) {
        setPosts(result.posts); 
      }
      setLoading(false);
    };
    fetchInitialPosts();
  }, []);

  // Fetch more posts when the page number changes
  const loadMorePosts = async () => {
    setLoading(true);
    const result = await GetPosts(page);
      if (result.error) {
        setError(result.error);
      } else if (result.posts) {
        setPosts((prevPosts) => [...prevPosts, ...result.posts]); 
      } 
    setLoading(false);
  };

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1); 
        }
      },
      {
        root: null, // observe within the viewport
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the loader is visible
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current); // Cleanup observer
      }
    };
  }, [loading]);

  useEffect(() => {
    if (page > 1) {
      loadMorePosts();
    }
  }, [page]);

  return (
    <div>
      <h1 className="heading text-3xl">Recent</h1>
      
      {error ? ( // If error exists, render ErrorCard
        <ErrorCard title={error.title} description={error.description} />
      ) : (
        posts.map((post, index) => (
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
        ))
      )}

      <div ref={loaderRef} className="loading-indicator">
        {loading && <img className="h-40 w-40 mx-auto" src="/images/loading.gif" />}
      </div>
    </div>
  );
}
