import React, { useEffect, useState } from "react";
import UserCardSmall from "./UserCardSmall";
import ErrorCard from "./ErrorCard";

interface iErrorProps{
  title: string,
  description: string
}

interface iFollow{
  name : string;
  username : string;
}

export default async function WhoToFollow() {

  var users : iFollow [] = [];

  var isError : boolean = false;
  var errorProps : iErrorProps = {title : "-", description : "-"}

  try{

    //dohvati postove
    const response = await fetch('https://dummyjson.com/posts');
    const postData = await response.json();
    const posts = postData.posts;
  
    // Prebrojavanje koliko koji user ima postova
    const postCountMap: { [userId: number]: number } = {};
    posts.forEach((post: { userId: number }) => {
      postCountMap[post.userId] = (postCountMap[post.userId] || 0) + 1;
    });

    //Sortiranje i pronalazenje top 4 usera
    const sortedUsers = Object.entries(postCountMap)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 4);

    const userPromises = sortedUsers.map(async ([userId]) => {
      const response = await fetch(`https://dummyjson.com/users/${userId}?select=firstName,lastName,username`);
      const userData = await response.json();
      return {
        name: `${userData.firstName} ${userData.lastName}`,
        username: userData.username,
      };
    });

    users = await Promise.all(userPromises);

  }catch (error:any) {
      console.error("Error fetching posts or users:", error);
      isError = true; 
      errorProps.title = "Error fetching posts or users";
      errorProps.description = error.toString();
    }

  return (
    <div>
      <span className="heading text-3xl">Who to follow</span>
      {isError ? (
        <ErrorCard title={errorProps.title} description={errorProps.description} />
        
        ) : (
        <div className="grid md:grid-cols-2">
          {users.length > 0 &&
            users.map((post, index) => (
              <UserCardSmall
                key={index}
                name={post.name}
                username={post.username}
                />
              ))
          }
        </div>
        )
      }
    </div>
  );
}
  
  