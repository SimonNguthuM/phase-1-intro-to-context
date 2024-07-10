function createEmployeeRecord(arr){
    const obj = {
        firstName: arr[0], 
        familyName: arr[1], 
        title: arr[2], 
        payPerHour: arr[3], 
        timeInEvents: [], 
        timeOutEvents:[]
    }
    return obj
}

function createEmployeeRecords(arr){
    let records = []
    arr.forEach(arrNested => records.push(createEmployeeRecord(arrNested)))
    return records
}

function createTimeInEvent(obj, str){
    let dt= str.split(' ')[0]
    let hr= str.split(' ')[1]
    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hr),
        date: dt
    })
    return obj
}

function createTimeOutEvent (obj, str){
    let dt= str.split(' ')[0]
    let hr= str.split(' ')[1]
    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hr),
        date: dt
    })
    return obj
}

function hoursWorkedOnDate (obj, str){
    let timeIn = obj.timeInEvents.find(obj => obj.date == str)
    let timeOut = obj.timeOutEvents.find(obj => obj.date == str)
    let hrs = (timeOut.hour - timeIn.hour)/100
    return hrs
}

function wagesEarnedOnDate (obj, str){
    let hrs = hoursWorkedOnDate(obj, str)
    let wages = hrs * obj.payPerHour
    return wages   
}

function allWagesFor (obj){
    let datesWorked = obj.timeInEvents.map(obj => obj.date);

    let wages = datesWorked.reduce((accum, date) => accum + wagesEarnedOnDate(obj, date), 0)
    return wages
}

function calculatePayroll (arr){
    let payRoll = arr.reduce((accum, obj) => accum + allWagesFor (obj), 0)
    return payRoll
}