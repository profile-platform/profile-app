import { h } from 'hyperapp'
import { Picture } from './picture'
import 'babel-polyfill'

export const Posts = () => (
    <div class='profile-posts'>
        <Post />
    </div>
)

export const Post = () => (
    <div class='profile-post'>
        <div class='profile-post-left'>
            <Picture small/>
        </div>

        <div class='profile-post-right'>
            <h4 class='profile-post-name'>
                Jesse Sibley
                <span class='profile-post-nickname'>
                    &nbsp;(Winegum)
                </span>
            </h4>
            <p class='profile-post-content'>
            ‘Knowledge comes by taking things apart: analysis.
            But wisdom comes by putting things together.’</p>
        </div>
    </div>
)

