import { h } from 'hyperapp'
import { Picture } from './picture'
import { Posts, Post } from './post'
import { getProfileURL } from '../index'

export const Profile = ({ cache }) => {
    console.log(cache)

    return (
        <div class='container'>
            <Header />
            <Posts />
            <Footer />
        </div>
    )
}

const Header = ({ name, nickname, bio, interests }) => (
    <div class='profile-header'>
        <Picture />

        <div>
            <h2 class='profile-header-name'>{ name }</h2>
            <h3 class='profile-header-nickname'>(Winegum)</h3>
        
            <div class='profile-header-bio'>
                <p>
                    Creator of Profile. I love to write code,
                    drink coffee and cycle. Mainly interested
                    in music, hydroponics and the Bible.
                </p>
            </div>

            <div class='profile-header-interests'>
                <ul>
                    <li>Programming</li>
                    <li>Internet</li>
                    <li>Hydroponics</li>
                    <li>Space</li>
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
