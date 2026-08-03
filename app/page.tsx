import { Hero } from '@/components/sections/Hero'
import { Featured } from '@/components/sections/Featured'
import { Credentials } from '@/components/sections/Credentials'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Achievements } from '@/components/sections/Achievements'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Credentials />
      <Projects />
      <Experience />
      <Skills />
      <Achievements />
      <About />
      <Contact />
    </>
  )
}
