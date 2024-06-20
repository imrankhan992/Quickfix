import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function AvatarPicture({user}) {
    return (
      <Avatar>
        <AvatarImage src={user?.avatar?.url} alt="@shadcn" />
        <AvatarFallback>{user?.firstname}</AvatarFallback>
      </Avatar>
    )
  }
  