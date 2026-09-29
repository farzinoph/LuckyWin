export default function StatChip({ label, value }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-2 text-xs text-ice">
      {label}
      <b className="block text-base text-white">{value}</b>
    </div>
  )
}