import { Navigate, useLocation, useNavigate } from "react-router-dom"
import ApiService from "./ApiService"


export const ProtectedRoute = ({ element: component}) => {

    const location = useLocation();

   return ApiService.isAuthenticated ? (component)
    :
    (
       <Navigate to={'/Login'} replace state={{from: location}}/>
    )
}