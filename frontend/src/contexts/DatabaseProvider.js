import { useReducer } from "react";
import { DatabaseContext } from "./DatabaseContext";

const defaultDatabase = {
    analyticsData: [],
    users: [],
    totalUser: 0,
    totalSent: 0,
    totalReceived: 0,
}

const DatabaseReducer = async(state, action) =>{

    if(action.type === "fetchDatabase"){
        var objectLength;
        var analyticsData = [];
        var totalReceived;
        var totalSent;
        var users = [];
        var usersLength;
        const fetchAnalyticsData = async () => {
            const response = await fetch(
              "https://push-notifications-513j.onrender.com/analytics"
            );
            
            if (!response.ok) {
              throw new Error("Found error while fetching data");
            }
    
            var analyticsData = await response.json();
            
            return analyticsData;
          };
        const fetchUsers = async() => {
            const response = await fetch(
                "https://push-notifications-513j.onrender.com/getusers"
              );
          
              if (!response.ok) {
                throw new Error("Found error while fetching data");
              }
      
              var users = await response.json();
           
              return users;
        }
          try{
            const response = await fetchAnalyticsData();
            objectLength = Object.keys(response).length;
            

            for (const key in response.data) {
                if(objectLength===1)
                    break;
                analyticsData.push(response.data[key]);
                objectLength--;
            }
            totalReceived = response.AnalyticsData.totalDelivered;
            totalSent = response.AnalyticsData.totalSent;
            
            const response2 = await fetchUsers();
            usersLength = Object.keys(response2).length;
            
            for (const key in response2.data) {
                users.push(response.data[key]);
            }
          }
         catch (error) {

          console.log(error);
        }
        return{
            analyticsData: analyticsData,
            users: users,
            totalUser: usersLength,
            totalSent: totalSent,
            totalReceived: totalReceived,
        }
    }
    else
    return defaultDatabase;
}
const DatabaseProvider = (props)=>{
    
    const [DatabaseState, dispatchDatabaseAction] = useReducer(DatabaseReducer, defaultDatabase);
    
    const fetchData = () =>{
        dispatchDatabaseAction({type:"fetchDatabase"})
    }
    
    const databaseContext = {
        analyticsData: DatabaseState.analyticsData,
        users: DatabaseState.users,
        totalUser: DatabaseState.totalUser,
        totalSent: DatabaseState.totalSent,
        totalReceived: DatabaseState.totalReceived,
        fetchData: fetchData,
    }
    
        return(
            <DatabaseContext.Provider value={databaseContext}>
                {props.children}
            </DatabaseContext.Provider>
        );
    }

export default DatabaseProvider;
    