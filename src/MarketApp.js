import { AppProvider } from './context/appProvider'
import { AppRouter } from './router/AppRouter'

export const MarketApp = () => {
  return (

    <AppProvider>
      <AppRouter />
    </AppProvider>

  )
}
