const createEmployeeRecord = (array) => {

    const record = {
        "firstName": array[0],
        "familyName": array[1],
        "title": array[2],
        "payPerHour": array[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }

    return record
}

const createEmployeeRecords = (array) => {

    const records = []

    array.forEach(element => {
        records.push(createEmployeeRecord(element))
    })

    return records

}

const createTimeInEvent = (employeeRecord, timeStamp) => {

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: Number(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    })

    return employeeRecord
}

const createTimeOutEvent = (employeeRecord, timeStamp) => {

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    })

    return employeeRecord
}


const hoursWorkedOnDate = (employeeRecord, date) => {
    // console.log(employeeRecord,date)
    const timeIn = employeeRecord["timeInEvents"].find(x => x["date"] === date)["hour"]
    const timeOut = employeeRecord["timeOutEvents"].find(x => x["date"] === date)["hour"]
    return (timeOut - timeIn) / 100
}

const wagesEarnedOnDate = (employeeRecord, date) => {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord["payPerHour"]
}

const allWagesFor = (employeeRecord) => {

    const timeInArr = employeeRecord["timeInEvents"]

    // let allWages = 0

    // for (let i = 0; i < timeInArr.length; i++) {
    //     allWages = allWages + wagesEarnedOnDate(employeeRecord, timeInArr[i]["date"])

    // }
    // return allWages

    return timeInArr.reduce((a, b) => wagesEarnedOnDate(employeeRecord, a["date"]) + wagesEarnedOnDate(employeeRecord, b["date"]))

}

const calculatePayroll = (recordsArray) => {

    let totalPay = 0
    for (let i = 0; i < recordsArray.length; i++) {
        let dates = recordsArray[i]["timeInEvents"]

        for (let j = 0; j < dates.length; j++) {

            totalPay = totalPay + wagesEarnedOnDate(recordsArray[i], dates[j]["date"])

        }
    }

    return totalPay

}

