import React from "react";
import CreateUserPost from "./createUserPost";
import CreateMechanicPost from "./createMechanicPost";

import { getUser } from './Helper';

export default function MakePost(props) {
    const [user, setUser] = React.useState(null);

    // run once when component mounts
    React.useEffect(() => {
         getUser().then(user => {
            setUser(user);
        });
    }, []);
    
    if (user?.role === "Mechanic") {
        return <CreateMechanicPost user={user} />;
    } else {
        return <CreateUserPost user={user} />;
    }
}