export default function Warning({ children }: { children: React.ReactNode }) {
  return <p className="pl-4 mt-6 italic text-red-500 border-l-2 dark:text-red-400">{children}</p>
}
