import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useSelector } from "react-redux"
  
  export function AvatarPicture() {
    const {user} = useSelector((state)=>state.user)
    return (
      <Avatar>
        <AvatarImage src={user?.avatar?.url} alt="@shadcn" />
        <AvatarFallback>{user?.firstname}</AvatarFallback>
      </Avatar>
    )
  }
  