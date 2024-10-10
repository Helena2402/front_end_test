import ErrorCard from "./ErrorCard";
import PostCard from "./PostCard";

interface iPostCard{
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

export default async function SuggestedPosts() {

  var postList : iPostCard[] = []

  var isError : boolean = false;
  var errorProps : iErrorProps = {title : "-", description : "-"}


  try 
  {
    const fetchedPosts = await fetch('https://dummyjson.com/posts?sortBy=likes&order=asc&limit=2');
    const postData = await fetchedPosts.json();
    
    const postPromises = postData.posts.map(async (post: any) => 
      {
        const fetchedUser = await fetch(`https://dummyjson.com/users/filter?key=id&value=${post.userId}`);
        const userData = await fetchedUser.json();
        const user = userData.users[0];
        
        const newPost: iPostCard = {
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
      
      postList = await Promise.all(postPromises);
    } catch (error:any) {
      console.error("Error fetching posts or users:", error);
      isError = true; 
      errorProps.title = "Error fetching posts or users";
      errorProps.description = error.toString();
      
    }

  

  return (
    <div>
      <span className="heading text-3xl">Suggested posts</span>
      {isError ? (
        <ErrorCard title={errorProps.title} description={errorProps.description} />
        
      ) : (
        postList.length > 0 && postList.map((post, index) => (
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
    </div>
  );
}
