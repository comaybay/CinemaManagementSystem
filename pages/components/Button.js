export default function Button({children, ...props}) {
  return (
    <button className="px-20 py-2 text-4xl rounded-md text-white bg-blue-700 hover:bg-blue-800 disabled:bg-slate-700" {...props}>{children}</button>
  )
}