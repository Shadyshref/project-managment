import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage/inedex'
import { Priority } from '@/state/api'



const low = () => {
  return (
   <ReusablePriorityPage priority={Priority.Low}/>
  )
}

export default low 