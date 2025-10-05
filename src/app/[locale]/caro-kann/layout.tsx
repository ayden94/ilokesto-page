import { Header } from '@/ui/widgets/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header githubLink="https://github.com/ilokesto/caro-kann" title="caro-kann" />
      {children}
    </>
  )
}
