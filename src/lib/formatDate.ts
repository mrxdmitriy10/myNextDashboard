

const date_time = (i:string) => {
    const date = i.split('T')[0]
    const time = i.split('T')[1].split('.')[0]
    return {
        date: date, time: time
    }
}

export default date_time