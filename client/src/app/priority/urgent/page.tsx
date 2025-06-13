import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage/inedex'
import { Priority } from '@/state/api'



const urgent = () => {
  return (
   <ReusablePriorityPage priority={Priority.Urgent}/>
  )
}

export default urgent