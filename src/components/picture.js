import { h } from 'hyperapp'

export const Picture = ({ small, url }) => (
    <div class={ small ? 'profile-header-picture-small' : 'profile-header-picture' } />
)
