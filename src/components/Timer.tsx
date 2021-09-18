import {useEffect, useState} from "react";
import {SearchUserType} from "./GitHub";

type TimerPropsType = {
    user: SearchUserType | null
    seconds: number
    onChange: (actual: number) => void
}
export const Timer = (props: TimerPropsType) => {

    const [seconds, setSeconds] = useState<number>(props.seconds);

    useEffect(() => {
        setSeconds(props.seconds)
    }, [props.seconds])

    useEffect(() => {

        props.onChange(seconds)

    }, [seconds])

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1);

        }, 1000)
        return () => {clearInterval(interval)}
    } , [props.user])

    return (
        <div>
            {seconds}
        </div>
    )
}