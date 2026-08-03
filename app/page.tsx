import { Hero } from '@/components/sections/Hero'
import { Featured } from '@/components/sections/Featured'
import { Credentials } from '@/components/sections/Credentials'
import { Projects } from '@/components/sections/Projects'

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Credentials />
      <Projects />
    </>
  )
}
