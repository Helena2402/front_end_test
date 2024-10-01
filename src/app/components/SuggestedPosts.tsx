import Post from "./Post";
import React, { useEffect, useState } from "react";

interface iPost{
  name : string;
  username : string;
  body : string;
  tags : Array<string>;
  likes : number;
  shares : number;
  views : number;
}

export default async function SuggestedPosts() {

  var postList : iPost [] = [];

  try {

    //dohvati postove
    const fetchedPosts = await fetch('https://dummyjson.com/posts?sortBy=likes&order=asc&limit=2');
    const postData = await fetchedPosts.json();
    
    const postPromises = postData.posts.map(async (post: any) => {
      //dohvati korisnike
      const fetchedUser = await fetch(`https://dummyjson.com/users/filter?key=id&value=${post.userId}`);
      const userData = await fetchedUser.json();
      const user = userData.users[0];

      // Construct iPost object
      const newPost: iPost = {
        name: user.firstName + " " + user.lastName,
        username: user.username,
        body: post.body,
        tags: post.tags,
        likes: post.reactions.likes,
        shares: post.reactions.dislikes,
        views: post.views
      };

      return newPost;
    });

    // pricekaj da se dohvate svi postovi i useri
    postList= await Promise.all(postPromises);
  } catch (error) {
    console.error("Error fetching posts or users:", error);
  }

  return (
    <div>
      <span className="heading text-3xl">Suggested posts</span>
      {postList.length > 0 &&
        postList.map((post, index) => (
          <Post
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
      }
    </div>
  );
}