export function codeFormatter() {
  return {
    cd: (chunk: React.ReactNode) => <code className="code">{chunk}</code>,
    br: () => <br />,
  }
}
