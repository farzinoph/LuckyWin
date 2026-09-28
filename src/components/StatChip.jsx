export default function StatChip({ label, value }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-3 text-sm text-ice">
      {label}
      <b className="block text-lg text-white">{value}</b>
    </div>
  )
}