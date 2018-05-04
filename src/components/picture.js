import { h } from 'hyperapp'

export const Picture = ({ small, url }) => (
    <div>
        <img
            src={url}
            class={ small ? 'profile-header-picture-small' : 'profile-header-picture' }
            alt='Profile Picture'
        />
    </div>
)
