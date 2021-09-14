
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

export const GitHub = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
    const [users, setUsers] = useState<Array<SearchUserType>>([]);

    useEffect(() => {
        if(!!selectedUser){
            document.title = selectedUser.login
        }
    },[selectedUser])

    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=it-kamasutra`)
            .then(res => {
               setUsers(res.data.items)
            })
    }, [])
    return (
        <div className={'container'}>
            <div>
                <div>
                    <input placeholder={'Search'}/> <button>Search</button>
                </div>
                <ul>
                    {users
                        .map(u => <li key={u.id}
                            className={selectedUser === u ? "selected" : ''}
                                      onClick={() => {setSelectedUser(u)}}>{u.login}</li>)}
                </ul>
            </div>
            <div>
                <h2>{selectedUser}</h2>
                <div>Details</div>
            </div>
        </div>
    )
}