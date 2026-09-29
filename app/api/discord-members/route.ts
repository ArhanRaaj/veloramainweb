import { NextResponse } from "next/server"

// Public Discord invite code for the VeloraCloud community server
const DISCORD_INVITE_CODE = "tx4YrXjjxc"

export const revalidate = 60 // cache for 60s at the edge/server, avoids hammering Discord's API

export async function GET() {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/invites/${DISCORD_INVITE_CODE}?with_counts=true`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Discord invite data" },
        { status: 502 }
      )
    }

    const data = await res.json()

    return NextResponse.json({
      memberCount: data.approximate_member_count ?? null,
      onlineCount: data.approximate_presence_count ?? null,
      guildName: data.guild?.name ?? null,
      inviteUrl: `https://discord.gg/${DISCORD_INVITE_CODE}`,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to reach Discord" },
      { status: 502 }
    )
  }
}
