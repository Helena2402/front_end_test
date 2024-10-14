import Link from "next/link";
import ProfileCard from "../components/ProfileCard";
import Recent from "../components/Recent";
import Header from "../components/Header";
import RecentProfile from "../components/RecentProfile";

export default function Profile({ params }: { params: { profileId: string } }) {
    return (
      <>

      <Header name={"Profile"}/>

      <div className="rounded-lg p-6 px-4 md:px-10 lg:px-20 xl:px-40">

        <ProfileCard userId = {params.profileId}/>

        <RecentProfile userId = {params.profileId} />
        
      </div>
      </>
    );
  }


  //