import AllUsers from "../admin/allUsers"
import Clients from "../admin/Clients"
import Mechanics from "../admin/Mechanics"

export const renderPageContent = (pageType) => {

    switch(pageType) {
        case 'user':
            return (
                <AllUsers />
            )
        case 'mechanic':
            return (
                <Mechanics />
            )
        case 'client':
            return <Clients />
        default:
            return null;
    }

}