
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

export const GitHub = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
    const [userDetails, setUserDetails] = useState<UserType | null>(null);
    const [users, setUsers] = useState<Array<SearchUserType>>([]);
    const [tempSearch, setTempSearch] = useState<string>('it-kama');
    const [searchTerm, setSearchTerm] = useState<string>('it-kama');

    useEffect(() => {
        if(selectedUser){
            document.title = selectedUser.login
        }
    },[selectedUser])

    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [searchTerm])

    useEffect(() => {
        if(!!selectedUser) {
            axios
                .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDetails(res.data)
                })
        }
        console.log(userDetails)
    }, [selectedUser])


    return (
        <div className={'container'}>
            <div>
                <div>
                    <input placeholder={'Search'} value={tempSearch}
                    onChange={(e) => {setTempSearch(e.currentTarget.value)}}/>
                    <button onClick={ () => setSearchTerm(tempSearch)}>Search</button>
                </div>
                <ul>
                    {users
                        .map(u => <li key={u.id}
                            className={selectedUser === u ? "selected" : ''}
                                      onClick={() => {setSelectedUser(u)}}>{u.login}</li>)}
                </ul>
            </div>
            <div>
                <h2>Username</h2>
                {userDetails && <div>
                    <img src={userDetails.avatar_url} alt=""/>
                    <br/>
                    {userDetails.login}, followers: {userDetails.followers}
                </div>}
            </div>
        </div>
    )
}