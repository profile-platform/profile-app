// Profile App
// For testing use:
// http://localhost:1234/?profile=winegum.netlify.com

import { h, app } from 'hyperapp'
import { Link, Route, location } from '@hyperapp/router'
import { Picture } from './components/picture'
import { Posts, Post } from './components/post'
import './css/main.css'

export function getProfileURL() {
    const searches = window.location.search
        .slice(1)
        .replace('&', '=')
        .split('=')

    if (searches.indexOf('profile') != -1) {
        const address = searches[searches.indexOf('profile') + 1]
        if (address.endsWith('/')) {
            return 'http://' + address + 'profile.json'
        } else {
            return 'http://' + address + '/profile.json'
        }

        return undefined;
    }
}

const state = {
    location: location.state,
    profile: {}
}

const actions = {
    location: location.actions,
    setProfile: profile => ({ profile }),
    fetchProfile: async (state, actions) => {
        fetch(getProfileURL())
            .then(data => data.json())
            .then(data => state => actions.setProfile)
    }
}

const Header = ({ name, nickname, bio, interests }) => (
    <div class='profile-header'>
        <Picture />

        <div>
            <h2 class='profile-header-name'>{ name }</h2>
            <h3 class='profile-header-nickname'>({ nickname })</h3>
        
            <div class='profile-header-bio'>
                <p>
                    { bio }
                </p>
            </div>

            <div class='profile-header-interests'>
                <ul>
                    {interests.map((i) => (
                        <li>{ i }</li>
                    ))}
                </ul>
            </div>

        </div>
    </div>
)

const Footer = state => (
    <footer class='profile-footer'>
        Powered by <a href='https://github.com/profile-platform/profile'>Profile</a>
    </footer>
)

const view = (state, actions) => {
    let { name, nickname, bio, interests } = state.profile;

    return (
        <div oncreate={() => { actions.fetchProfile() }} >
            <div class='container'>
                <Header
                    name={name}
                    nickname={nickname}
                    bio={bio}
                    interests={interests}
                />
                <Posts />
                <Footer />
            </div>

        </div>
    )
}

export const main = app(state, actions, view, document.body)

const unsubscribe = location.subscribe(main.location)