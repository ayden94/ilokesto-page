export function Footer() {
  return (
    <footer className="mt-24 py-8 border-t border-black/10 dark:border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} ilokesto. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {/* 다른 소셜 링크가 있다면 여기에 추가하세요. 예: X, LinkedIn */}
          {/* <Link href="https://github.com/ilokesto">
            <GithubIcon />
          </Link> */}
        </div>
      </div>
    </footer>
  )
}
