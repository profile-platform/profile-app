import { h } from 'hyperapp'
import { getProfileURL } from '../index'
import { Picture } from './picture'
import 'babel-polyfill'

export const Posts = ({ name, nickname, picture, posts }) => (
    <div class='profile-posts'>
        { posts ? posts.map(post => (
            <Post
                name={name}
                nickname={nickname}
                picture={picture}
                post={post}
            />
            ))
            : <div />
        }
    </div>
)

export const Post = ({ name, nickname, picture, post}) => (
    <div class='profile-post'>
        <div class='profile-post-left'>
            <Picture url={ `${getProfileURL()}${picture}`} small/>
        </div>

        <div class='profile-post-right'>
            <h4 class='profile-post-name'>
                { name }
                <span class='profile-post-nickname'>
                    &nbsp;({ nickname })
                </span>
            </h4>
            <p class='profile-post-content'>{ post.content }</p>
        </div>
    </div>
)

