import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage/inedex'
import { Priority } from '@/state/api'



const medium = () => {
  return (
   <ReusablePriorityPage priority={Priority.Medium}/>
  )
}

export default  medium