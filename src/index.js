// Profile App
// For testing use:
// http://localhost:1234/?profile=winegum.netlify.com

import { h, app } from 'hyperapp'
import { Link, Route, location } from '@hyperapp/router'
import { Picture } from './components/picture'
import { Posts, Post } from './components/post'
import { verify } from './verify'
import './css/main.css'

export function getProfileURL(ext) {
    const searches = window.location.search
        .slice(1)
        .replace('&', '=')
        .split('=');

    const address = searches[searches.indexOf('profile') + 1]
    if (ext && searches.indexOf('profile') != -1) {
        if (address.endsWith('/')) {
            return 'http://' + address + 'profile.json';
        } else {
            return 'http://' + address + '/profile.json';
        }
        return undefined;
    } else {
        return 'http://' + address;
    }
}

const state = {
    location: location.state,
    profile: {},
    error: false
}

const actions = {
    location: location.actions,
    setProfile: profile => (
        verify(profile) ?  { profile } : { }
    ),
    verifyProfile: profile => (
        { error: verify(profile) }
    )
}

const Error = () => (
    <div class='profile-error'>
        <h1>Oh no!</h1>
        <p>
            Looks like this profile isn't formatted correctly.
            Check the console for details.
        </p>
    </div>
)

const Header = ({ name, picture, nickname, bio, interests }) => (
    <div class='profile-header'>
        <Picture url={ `${getProfileURL()}${picture}`} />

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
                    { interests ? interests.map(interest => <li>{interest}</li>) : <li /> }
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
    let {
        name,
        picture,
        nickname,
        bio,
        interests,
        posts
    } = state.profile;

    return (
        <div oncreate={() => {
            fetch(getProfileURL(true))
                .then(data => data.json())
                .then(actions.setProfile)
                .then(actions.verifyProfile)
            }}
            >
            <div class='container'>
                <Header
                    name={name}
                    picture={picture}
                    nickname={nickname}
                    bio={bio}
                    interests={interests}
                />
                <Posts
                    name={name}
                    picture={picture}
                    nickname={nickname}
                    posts={posts}
                />
                <Footer />
            </div>

        </div>
    )
}

export const main = app(state, actions, view, document.body)

const unsubscribe = location.subscribe(main.location)