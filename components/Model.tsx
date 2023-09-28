"use client"
import React, { useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Model = ({ children }: { children: React.ReactElement | React.ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const router = useRouter();

  const onDismiss = useCallback(() => router.push('/'),[router])

  const handleClick = useCallback((e:React.MouseEvent) => {
    if((e.target === overlay.current) && onDismiss) onDismiss()
  },[onDismiss, overlay])

  return (
    <section onClick={(e) =>handleClick(e)} ref={overlay} className='model_container '>
      <div>
        <button className='absolute right-10 top-4 outline-none bg-transparent border-none cursor-pointer'
          onClick={() => onDismiss()}>
          <Image src="/close.svg"
            width={20}
            height={20}
            alt='close button'
          />
        </button>
      </div>
      <div className='modal_overlay' ref={wrapper}>
      {children}
      </div>
    </section>
  )
}

export default Model
