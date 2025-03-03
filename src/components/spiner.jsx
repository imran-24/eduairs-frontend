import { Loader2 } from 'lucide-react'
import React from 'react'

const Spiner = () => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <Loader2 className='size-8 animate-spin text-neutral-500' />
    </div>
  )
}

export default Spiner
