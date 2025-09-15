'use client'
import dynamic from 'next/dynamic'
export default dynamic(() => import('./data-stream'), { ssr: false })
