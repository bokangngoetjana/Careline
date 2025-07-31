"use client";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";

interface WithAuthProps{
    allowedRoles?: string[];
}

const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    { allowedRoles = [] }: WithAuthProps = {} 
) : React.FC<P> =>{
 const ComponentWithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const token = sessionStorage.getItem("token");
      const userRole = sessionStorage.getItem("role");  

      if (!token) {
        router.push("/login");
        return;
      }
      // if allowedRoles is given > check if user is allowed
      if(allowedRoles.length > 0 && !allowedRoles.includes(userRole || "")){
        // redirect based on role if not allowed
        switch (userRole) {
          case "Admin":
            router.push("/admin");
            break;
          case "Doctor":
            router.push("/doctor");
            break;
          case "Nurse":
            router.push("/nurse");
            break;
          case "Patient":
            router.push("/patient");
            break;
          default:
            router.push("/login"); // Unknown role
        }
        return;
      }
      setIsAuthorized(true);
    }, [router]);
    return isAuthorized ? <WrappedComponent {...props} /> : null;
};
 ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
 return ComponentWithAuth;
}


export default withAuth;