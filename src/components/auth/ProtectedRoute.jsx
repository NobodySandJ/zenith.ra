import { Navigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import LoadingScreen from '@components/common/LoadingScreen'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
