export function Textline({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="text-base/8 font-normal mt-6" {...props}>
      {children}
    </p>
  )
}
