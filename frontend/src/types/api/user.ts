export type User = {
    id: number
    uid: string
    provider: string
    allowPasswordChange: boolean
    email?: string
    name?: string
    nickname?: string
    image?: string
}