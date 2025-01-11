import dayjs from 'dayjs'

export function getmonth(month = dayjs().month()) {
    const year = dayjs().year();
    const firstdayofthemonth = dayjs(new Date(year,month,1)).day();
    let currentmonth = 0 - firstdayofthemonth;
    const dayMatrix = new Array(5).fill(null).map(() => {
        return new Array(7).fill(null).map(()=>{
            currentmonth++;
            return new Date(year,month,currentmonth);
        } )
    })

    return dayMatrix;

}


