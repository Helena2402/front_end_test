import Link from "next/link";
import Header from "./components/Header";
import SuggestedPosts from "./components/SuggestedPosts";

export default function Home() {
  return (
    <div>
      <Header name={"Feed"}/>
      
        <div className="rounded-lg p-6 px-4 md:px-10 lg:px-20 xl:px-40">
          <SuggestedPosts />
        </div>
      
    </div>
  );
}

//<Link href="/profile" >Profil</Link><br/>