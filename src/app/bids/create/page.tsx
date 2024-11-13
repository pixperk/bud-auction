import { FC } from 'react'
import SellItemPage from './sell-item'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'


interface pageProps {
  
}


const page: FC<pageProps> = async({}) => {
  const session = await auth()
  if(!session || !session.user) redirect("/")
  return <SellItemPage/>
}

export default page