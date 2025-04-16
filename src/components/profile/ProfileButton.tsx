import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export function ProfileButton() {
  const [profileData, setProfileData] = useState({
    username: sessionStorage.getItem("username") || localStorage.getItem("username") || "Guest",
    avatar: sessionStorage.getItem("avatar") || localStorage.getItem("avatar") || 
      "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?fit=max&w=350"
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setProfileData({
        username: sessionStorage.getItem("username") || localStorage.getItem("username") || "Guest",
        avatar: sessionStorage.getItem("avatar") || localStorage.getItem("avatar") || 
          "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?fit=max&w=350"
      });
    };

    // Listen for custom profileUpdate event
    const handleProfileUpdate = (event: any) => {
      const { username, avatar } = event.detail;
      
      if (username || avatar) {
        setProfileData(prevState => ({
          ...prevState,
          username: username || prevState.username,
          avatar: avatar || prevState.avatar
        }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileUpdate', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdate', handleProfileUpdate);
    };
  }, []);

  return <Button variant="ghost" size="icon" className="rounded-full p-0 h-10 w-10 ring-1 ring-white/20 hover:ring-white/40 transition-all" type="button" aria-label="Open profile menu">
      <Avatar>
        <AvatarImage alt="Profile" src={profileData.avatar} />
        <AvatarFallback>{profileData.username.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </Button>;
}