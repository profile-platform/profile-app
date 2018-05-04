// verify.js
// provides verify() which checks for
// errors and invalid Profile.json

Object.prototype.containsField = function(name, type) {
    return (
        this.hasOwnProperty(name) &&
        typeof this[name] == type
    )
}

export function verify(profile) {
    let pass = true;
    if (!profile.containsField('meta', 'object')) {
        console.error('Profile is missing required field `meta`')
        pass = false;
    } else if (!profile.containsField('name', 'string')) {
        console.error('Profile is missing required field `name`')
        pass = false;
    } else if (!profile.containsField('posts', 'object')) {
        console.error('Profile is missing required field `posts`')
        pass = false;
    }

    return pass;
}