import { createContext} from "react";


export const DatabaseContext = createContext({
    analyticsData: [],
    users: [],
    totalUser: 0,
    totalSent: 0,
    totalReceived: 0,
    fetchData: () => {}
})