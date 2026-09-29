"use client"

import { useEffect, useState } from "react"
import { Circle } from "lucide-react"

interface DiscordStats {
  memberCount: number | null
  onlineCount: number | null
}

export default function DiscordLiveMemberCount({ className = "" }: { className?: string }) {
  const [stats, setStats] = useState<DiscordStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchStats() {
      try {
        const res = await fetch("/api/discord-members")
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) {
          setStats({ memberCount: data.memberCount, onlineCount: data.onlineCount })
        }
      } catch {
        // fail silently, badge just won't render
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60_000) // refresh every minute
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  if (loading || !stats?.memberCount) {
    return null
  }

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {stats.onlineCount !== null && (
        <span className="flex items-center gap-1.5">
          <Circle className="w-2 h-2 fill-green-400 text-green-400" />
          <span className="text-white font-medium" style={{ fontSize: "15.4px" }}>{stats.onlineCount.toLocaleString()} online</span>
        </span>
      )}
      <span className="text-white/40">•</span>
      <span className="text-white font-medium" style={{ fontSize: "15.4px" }}>{stats.memberCount.toLocaleString()} members</span>
    </div>
  )
}
