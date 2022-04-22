const toDateTime = (seconds: number): Date => {
    const time = new Date(1970, 0, 1); // Epoch
    time.setSeconds(seconds);
    return time;
};

const ConvertDate = (date: Date): string => {
    function pad(s: any) {
        return (s < 10) ? '0' + s : s;
    }
    var d = new Date(date)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
};

const Timer = (date: Date): ITimer => {
    const time = new Date(date).getTime();

    // Update the count down every 1 second
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = time - now;

    return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        distance
    }
}

export {
    toDateTime,
    ConvertDate,
    Timer
}