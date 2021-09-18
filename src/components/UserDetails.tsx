import {useEffect, useState} from "react";
import axios from "axios";
import {Timer} from "./Timer";
import {SearchUserType, UserType} from "./GitHub";

type UserDetailsPropsType = {
    user: SearchUserType | null
    setPreloader: (value: boolean) => void
}
export const UserDetails = (props: UserDetailsPropsType) => {

    const [seconds, setSeconds] = useState<number>(60);
    const [userDetails, setUserDetails] = useState<UserType | null>(null);

    useEffect(() => {
        if (!!props.user) {
            props.setPreloader(true)
            axios
                .get<UserType>(`https://api.github.com/users/${props.user.login}`)
                .then(res => {
                    setSeconds(60);
                    setUserDetails(res.data);
                    props.setPreloader(false);
                })
        }
        console.log(userDetails)
    }, [props.user]);

    useEffect(() => {
        if(seconds < 1) {
            setUserDetails(null)
        }
    }, [seconds])

    return (
        <div>
            {userDetails && <div>
                <Timer  user={userDetails} seconds={seconds} onChange={setSeconds}/>
                <h2>Username: {userDetails?.login}</h2>
                <div>
                    <img src={userDetails.avatar_url} alt=""/>
                    <br/>
                    {userDetails.login}, followers: {userDetails.followers}
                </div>
            </div>}
        </div>
    )

}