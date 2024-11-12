import { auth } from '@/auth'
import SignIn from '@/components/sign-in'
import { SignOut } from '@/components/sign-out'
import { getDatabase as database } from '@/db/database'
import { items } from '@/db/schema'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = async({}) => {
  const session = await auth()
  if(!session) return <SignIn/>
  const user = session.user
  if(!user) return <SignIn/>
  const allItems = await database().query.items.findMany()
  return <main className='container py-12 mx-auto'>
    {session?<SignOut/> : <SignIn/>}
    <form action={async(formData : FormData)=>{
      "use server"
/*       const bid = formData.get('bid') as string
 */      await database().insert(items).values({
         name : formData.get("name") as string, 
         userId : session.user?.id!
 })
    }}>
      <input name='name' placeholder='Bid'/>
      <button type='submit'>Post</button>
    </form>

    {allItems.map((item) => <div key={item.id}>{item.name}</div>)}
  </main>
}

export default page