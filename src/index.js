import { h, app } from 'hyperapp'
import { Link, Route, location } from '@hyperapp/router'
import { Profile } from './components/profile'
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

const ProfilePage = async ({ match }) => (
    <Profile cache={state.profile} />
)

const view = (state, actions) => {
    return (
        <div oncreate={() => { actions.fetchProfile() }} >
            <Route path='/profile' render={ProfilePage} />
        </div>
    )
}

export const main = app(state, actions, view, document.body)

const unsubscribe = location.subscribe(main.location)