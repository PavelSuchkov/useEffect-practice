// import s from 'github.css'
import './github.css';
import axios from 'axios'

import {useState, useEffect} from "react";

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType[]
}
type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: string
}

type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}
export const Search = (props: SearchPropsType) => {

    const [tempSearch, setTempSearch] = useState<string>('');

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])

    return <div>
        <input placeholder={'Search'}
               value={tempSearch}
               onChange={(e) => {
                   setTempSearch(e.currentTarget.value)
               }}/>
        <button onClick={() => props.onSubmit(tempSearch)}>Search</button>
    </div>
}

type UsersListPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}
export const UsersList = (props: UsersListPropsType) => {

    const [users, setUsers] = useState<Array<SearchUserType>>([]);

    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.term])

    return (
        <ul>
            {users
                .map(u => <li key={u.id}
                              className={props.selectedUser === u ? "selected" : ''}
                              onClick={() => {
                                  props.onUserSelect(u)
                              }}>{u.login}</li>)}
        </ul>
    )
}

type TimerPropsType = {
    user: SearchUserType | null
}
export const Timer = (props: TimerPropsType) => {

    const [seconds, setSeconds] = useState<number>(60);

    useEffect(() => {
        setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)

        return clearInterval();
    } , [])

    return (
        <div>
            {seconds}
        </div>
    )
}

type UserDetailsPropsType = {
    user: SearchUserType | null
}
export const UserDetails = (props: UserDetailsPropsType) => {

    useEffect(() => {
        if (!!props.user) {
            axios
                .get<UserType>(`https://api.github.com/users/${props.user.login}`)
                .then(res => {
                    setUserDetails(res.data)
                })
        }
        console.log(userDetails)
    }, [props.user])


    const [userDetails, setUserDetails] = useState<UserType | null>(null);

    return (
        <div>
            {userDetails && <div>
                <Timer user={props.user}/>
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

export const GitHub = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
    const initialSearch = 'it'
    const [searchTerm, setSearchTerm] = useState<string>(initialSearch);

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return (
        <div className={'container'}>
            <div>
                <Search value={searchTerm} onSubmit={(value: string) => {setSearchTerm(value)}}/>
                <button onClick={() => setSearchTerm(initialSearch)}>reset</button>
                <UsersList term={searchTerm}
                           selectedUser={selectedUser}
                           onUserSelect={(user) => setSelectedUser(user)}/>
            </div>
            <UserDetails user={selectedUser}/>
        </div>
    )
}