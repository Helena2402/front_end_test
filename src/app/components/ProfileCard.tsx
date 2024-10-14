import Link from "next/link";
import ErrorCard from "./ErrorCard";

interface iProfile{
    id : string,
    name: string,
    username : string,
    address : string,
    department : string,
    posts:number,
    likes : number,
}

interface iErrorProps{
  title: string,
  description: string
}



export default async function ProfileCard(props : any) {
  try{
    const fetchedUser = await fetch(`https://dummyjson.com/users/filter?key=id&value=${props.userId}`);
    const userData = await fetchedUser.json();
    const user = userData.users[0];

    const fetchedPots = await fetch (`https://dummyjson.com/posts/user/${props.userId}`);
    const postData = await fetchedPots.json();
    const posts = postData.posts.length;

    const likes = postData.posts.reduce((totalLikes: number, post: any) => {
      return totalLikes + post.reactions.likes;
    }, 0);

    const profile: iProfile = {
      id : props.userId,
      name: user.firstName + " " + user.lastName,
      username: user.username,
      address : user.address.state + ", " + user.address.country,
      department : user.company.department,
      posts: posts,
      likes : likes
    }

    return (
      <div className="profileCard relative mx-auto lg:mx-0">

        <div className="flex justify-center lg:justify-start w-full -top-12 relative">
          <p className="profileCard_gradient"></p>

          <div className="profileCard_info flex flex-col items-center text-center lg:-mt-16 lg:flex-row lg:text-left">
            <img className="profileCard_picture" src="/images/avatar.png"/>

            <div className="profileCard_nopic ml-5 lg:mt-14">
              <p className="profileCard_name text-gray-900 font-bold">{profile.name}</p>
              
              <div className="lg:grid lg:grid-flow-col lg:auto-cols-auto lg:gap-2 lg:items-center">
                <p className="text-gray-500 text-sm mr-0">@{profile.username}</p>
                <div className="text-gray-600 text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
                  </svg>
                  <span>{profile.address}</span>
                </div>
              </div>
            
              <div className="inline-block text-sm font-semibold text-blue-700 bg-blue-100 mt-2 px-2 py-1 rounded-lg">
                  {profile.department}
              </div>

              <table className="text-center pt-1" >
                <tbody>
                  <tr className="text-lg font-bold"><td>{profile.posts}</td><td>{profile.likes}</td></tr>
                  <tr className="text-gray-500"><td  className="pl-3">POSTS</td><td  className="px-6">LIKES</td></tr>
                </tbody>
              </table> 
            </div>
          </div>    
              
        </div>

          
        
   

        <div className="items-center lg:px-4 w-full py-3 border-t">
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <button className="customPrimaryButton">Follow</button>
            <button className="customSecondaryButton">Message</button>
          </div>
        </div>
        
      </div>


    );


  
  }catch(error:any){

      console.error("Error fetching posts or users:", error);
      return(<ErrorCard title={"Error fetching user"} description={error.toString()} />);
  }
  
  
  
  
  
  
  }