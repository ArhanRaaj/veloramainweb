export interface GamePlan {
  id: string
  name: string
  type: string
  ram: string
  cpu: string
  storage: string
  price: number
  priceUSD?: number
  orderLink: string
  backups?: number
  ports?: number
  databases?: number
  icon?: string
}

export interface Game {
  id: string
  name: string
  description: string
  icon: string
  banner: string
  featured: boolean
  startingAt: string
  primaryColor: string
  plans: {
    budget: GamePlan[]
    premium: GamePlan[]
    // extra processor tiers (e.g. "ryzen7") - an empty array shows a "coming soon" state
    [planType: string]: GamePlan[]
  }
}

export interface GameLocation {
  id: string
  name: string
  flag: string
  availablePlanTypes: string[]
}

export interface PlanType {
  id: string
  name: string
  image: string
  // optional: only show this processor for these game ids (omit = show for every game)
  games?: string[]
}

export interface GamesConfig {
  planTypes: PlanType[]
  locations: GameLocation[]
  games: Game[]
}
