import Link from "next/link";

export default function Profile() {
    return (
      <div>
        <Link href="/" >Profil</Link><br/>
        <button className="customButton customPrimaryButton">Feed</button>
        
      </div>
    );
  }