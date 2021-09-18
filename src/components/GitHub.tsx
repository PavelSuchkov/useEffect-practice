// import s from 'github.css'
import './github.css';
import axios from 'axios'

import {useState, useEffect} from "react";
import {UsersList} from "./UsersList";
import {Search} from "./Search";
import { Timer } from './Timer';
import {UserDetails} from "./UserDetails";
import {Preloader} from "./preloader/Preloader";

export type SearchUserType = {
    login: string
    id: number
}
export type SearchResult = {
    items: SearchUserType[]
}
export type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: string
}
export const GitHub = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
    const initialSearch = 'it'
    const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
    const [togglePreloader, setTogglePreloader] = useState<boolean>(false);

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return (
        <div className={'container'}>
            {togglePreloader && <Preloader/>}
            <div>
                <Search value={searchTerm} onSubmit={(value: string) => {setSearchTerm(value)}}/>
                <button onClick={() => setSearchTerm(initialSearch)}>reset</button>
                <UsersList term={searchTerm}
                           selectedUser={selectedUser}
                           onUserSelect={(user) => setSelectedUser(user)}
                           setPreloader={(value) => setTogglePreloader(value)}/>
            </div>
            <UserDetails user={selectedUser}
                         setPreloader={(value) => setTogglePreloader(value)}/>
        </div>
    )
}