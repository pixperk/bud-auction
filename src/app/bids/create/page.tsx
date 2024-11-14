import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import SellItemPage from './sell-item'




const page = async({}) => {
  const session = await auth()
  if(!session || !session.user) redirect("/")
  return <SellItemPage/>
}

export default page