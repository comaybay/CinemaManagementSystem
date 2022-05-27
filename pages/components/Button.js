export default function Button({children, ...props}) {
  return (
    <button className="px-20 py-2.5 text-2xl font-semibold rounded-md text-white bg-blue-700 hover:bg-blue-800 disabled:bg-slate-700" {...props}>{children}</button>
  )
}