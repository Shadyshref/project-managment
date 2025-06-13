import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage/inedex'
import { Priority } from '@/state/api'



const high = () => {
  return (
   <ReusablePriorityPage priority={Priority.High}/>
  )
}

export default high 