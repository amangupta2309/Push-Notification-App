const { db } = require('./utils/admin');

//function to get node formate yyyymmdd
const nodeString = (time)=>
{
  time = new Date(time);
    const day = time.getDate().toString().padStart(2, '0');
    const month = (time.getMonth() + 1).toString().padStart(2, '0');
    const year = time.getFullYear().toString();
  const stringNode= year + month + day;
  return stringNode;
}
// function to get time in string formate dd/mm/yyyy
const dateString = (time)=>{
{
  console.log(time)
   time = new Date(time);
    const day = time.getDate().toString().padStart(2, '0');
    const month = (time.getMonth() + 1).toString().padStart(2, '0');
    const year = time.getFullYear().toString();
  const stringDate = day + '/' + month + '/' + year;
  return stringDate;
}
}

// For Updating the Analytics Node

exports.AnalyticsUpdate = function(response,scheduleTime)
{
    const stringDate = dateString(scheduleTime);
const stringNode = nodeString(scheduleTime);
var sent = response.successCount+response.failureCount;
// var failed = response.failureCount;
var received = response.successCount;
db.ref('/Analytics/'+stringNode).once('value', function(snapshot) {
 // If node not present then creating
 if (!snapshot.exists()) {
   db.ref('/Analytics/'+stringNode).set({
     Received: received,
     Sends: sent,
     Date:stringDate
   });
 }
 else{
   var totalSent = snapshot.val().Sends+sent;
   var totalReceived = snapshot.val().Received+received;
  
   db.ref('/Analytics/'+stringNode).update({
     Received: totalReceived,
     Sends: totalSent,
     Date:stringDate
   });
  
 }
});
// Updating Total Sent

db.ref('Analytics/AnalyticsData').once('value',function(snapshot){
  var Sent = snapshot.val().totalSent+sent;
  var Received = snapshot.val().totalDelivered+received;
  db.ref('Analytics/AnalyticsData').update({
     totalDelivered:Received,
     totalSent: Sent
   });
})
}