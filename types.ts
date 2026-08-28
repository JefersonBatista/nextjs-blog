export type DirectoryName = 'posts' | 'projects'
export const languages = ['en-US', 'pt-BR'] as const
export type Language = typeof languages[number]
