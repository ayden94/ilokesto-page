export function Textline({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // use a div instead of p because making <br/> display:block inside a <p> is invalid HTML
    // and browsers may auto-close/restructure the <p>, preventing margins from applying.
    <p className="mt-6 font-normal text-base/8 break-keep`" {...props}>
      {children}
    </p>
  )
}
