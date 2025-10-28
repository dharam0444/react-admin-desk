import { useAuth } from "../../../utils/context/AuthContext";

export default function UserDashboard(){
      const { user} = useAuth();
    return <div className="container pt-5">
        <h3>Welcome {user?.name} Dashboard</h3>
    </div>
}