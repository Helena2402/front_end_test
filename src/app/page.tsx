import Link from "next/link";
import Header from "./components/Header";
import PostsWithLoading from "./components/PostsWithLoading";
import FollowWithLoading from "./components/FollowWithLoading";


export default function Home() {
  return (
    <div>
      <Header name={"Feed"}/>
      
        <div className="rounded-lg p-6 px-4 md:px-10 lg:px-20 xl:px-40">
          <PostsWithLoading />

          <FollowWithLoading />
          
        </div>
      
    </div>
  );
}

//<Link href="/profile" >Profil</Link><br/>
