

export async function GetPosts(page: number) {
  // Fetch 5 posts at a time based on the page number
  const fetchedPosts = await fetch(`https://dummyjson.com/posts?limit=5&skip=${(page - 1) * 5}&sortBy=likes&order=asc`);
  const postData = await fetchedPosts.json();

  // Map over the posts and fetch user details for each post
  const postPromises = postData.posts.map(async (post: any) => {
    const fetchedUser = await fetch(`https://dummyjson.com/users/filter?key=id&value=${post.userId}`);
    const userData = await fetchedUser.json();
    const user = userData.users[0];

    // Create a new post object with combined post and user details
    const newPost = {
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      body: post.body,
      tags: post.tags,
      likes: post.reactions.likes,
      shares: post.reactions.dislikes,
      views: post.views,
    };

    return newPost;
  });

  // Wait for all user data to be fetched and return the posts with user details
  const postsWithUserDetails = await Promise.all(postPromises);
  return postsWithUserDetails;
}
