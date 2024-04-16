import React from 'react'
import { Badge } from '../ui/badge'

const BadgeOutline = ({status,color}) => {
  return (
    <>
    <Badge variant="outline" className={`text-primarycolor arimo ${color} `}>{status}</Badge>
    </>
  )
}

export default BadgeOutline