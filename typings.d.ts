export interface STATE {
  login: {
    LOGGED: boolean
  }
}

interface ACTION {
  type: string
}

declare module '@tanstack/react-table'
