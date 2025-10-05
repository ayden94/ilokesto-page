export function Textline({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="mt-6 font-normal text-base/8" {...props}>
      {children}
    </p>
  )
}
