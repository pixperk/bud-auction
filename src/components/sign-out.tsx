import { signOut } from "@/auth"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({
          redirectTo : "/"
        })
      }}
    >
      <Button variant={"ghost"} type="submit" className={`w-full justify-start text-red-600`}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>{'Sign out'}</span></Button>
    </form>
  )
}