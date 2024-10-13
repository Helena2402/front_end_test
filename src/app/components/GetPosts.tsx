import ErrorCard from "./ErrorCard";

interface iPost{
  name : string;
  username : string;
  body : string;
  tags : Array<string>;
  likes : number;
  shares : number;
  views : number;
}

interface iErrorProps{
  title: string,
  description: string
}

interface GetPostsResult {
  posts: iPost[] | null;
  error: { title: string; description: string } | null;
}

export async function GetPosts(page: number) {

  var isError : boolean = false;
  var errorProps : iErrorProps = {title : "-", description : "-"}

  try{

    // Dohvati 5 postova i pronadi usere
    const fetchedPosts = await fetch(`https://dummyjson.com/posts?limit=5&skip=${(page - 1) * 5}&sortBy=likes&order=asc`);
    const postData = await fetchedPosts.json();
    const postPromises = postData.posts.map(async (post: any) => {
      const fetchedUser = await fetch(`https://dummyjson.com/users/filter?key=id&value=${post.userId}`);
      const userData = await fetchedUser.json();
      const user = userData.users[0];
      
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

    // Wait for all user data to be fetched and return the posts with user details
    const postsWithUserDetails = await Promise.all(postPromises);
    return { posts: postsWithUserDetails, error: null };

  }catch(error:any){
    console.error("Error fetching posts or users:", error);
    isError = true;
    errorProps.title = "Error fetching posts or users";
    errorProps.description = error.toString();

    return { posts: null, error: errorProps }
  }


  
}
