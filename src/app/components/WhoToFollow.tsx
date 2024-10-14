import React, { useEffect, useState } from "react";
import UserCardSmall from "./UserCardSmall";
import ErrorCard from "./ErrorCard";

interface iErrorProps{
  title: string,
  description: string
}

interface iFollow{
  id: string;
  name : string;
  username : string;
}

export default async function WhoToFollow() {

  var users : iFollow [] = [];

  var isError : boolean = false;
  var errorProps : iErrorProps = {title : "-", description : "-"}

  try {
    let posts: any[] = [];
    let page = 1;
    let total = 0;

    // Dohvaćanje svih postova (problem s paganation, nije radilo prije)
    do {
      const response = await fetch(`https://dummyjson.com/posts?limit=100&skip=${(page - 1) * 100}`);
      const postData = await response.json();
      posts = [...posts, ...postData.posts];
      total = postData.total;
      page++;
    } while (posts.length < total);

    // Prebrojavanje koliko user ima postova
    const postCountMap: { [userId: number]: number } = {};
    posts.forEach((post: { userId: number }) => {
      postCountMap[post.userId] = (postCountMap[post.userId] || 0) + 1;
    });

    // Sortiranje i top 4
    const sortedUsers = Object.entries(postCountMap)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 4);

    // Dohvaćanje user podataka
    const userPromises = sortedUsers.map(async ([userId]) => {
      const response = await fetch(`https://dummyjson.com/users/${userId}?select=firstName,lastName,username`);
      const userData = await response.json();
      return {
        id: userId,
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
            users.map((user, index) => (
              <UserCardSmall
                key={index}
                userId = {user.id}
                name={user.name}
                username={user.username}
                />
              ))
          }
        </div>
        )
      }
    </div>
  );
}
  
  