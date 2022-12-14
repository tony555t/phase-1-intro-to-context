// Your code here

function createEmployeeRecord(obj) {
    const presentArray = {
        firstName: obj[0],
        familyName: obj[1],
        title: obj[2],
        payPerHour: obj[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return presentArray
}

//Converts each nested Array into an employee record 
function createEmployeeRecords(array){
    return array.map((obj) => createEmployeeRecord(obj))
}

function createTimeInEvent(employee,dateStamp){
    const [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: Number(hour),
        date,
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    const [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(hour),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee, timeStamp) {
    const timeIn = employee.timeInEvents.find(event => event.date === timeStamp)

    const timeOut = employee.timeOutEvents.find(event => event.date === timeStamp)

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, hours) {
    const wages = hoursWorkedOnDate(employee, hours)
        * employee.payPerHour
    return Number(wages)
}

function allWagesFor(employee) {
    const createCopy = employee.timeInEvents.map(event => event.date)
    const allWages = createCopy.reduce((record,dates) => record + wagesEarnedOnDate(employee, dates), 0)

    return allWages
}

function calculatePayroll(recordsArray){
    return recordsArray.reduce((employee, record) => employee + allWagesFor(record), 0)

}
