/**
 * Created by andreas on 30/12/2015.
 */

var cookieAuthName = 'authenticatedAccount';

var mockUser = function(){
    var obj = {
        id: "567b9a2e8871540f417329e4",
        username: "test",
        email: "test@test.com",
        first_name: "Test",
        last_name: "Account",
        tagline: "my tag"
    };
    return obj
};

var mockUser2 = function(){
    var obj = {
        id: "567b9a2e8871540f417329e5",
        username: "alt-test",
        email: "alt-test@alt-test.com",
        first_name: "Alt",
        last_name: "Test",
        tagline: "alt tag"
    };
    return obj
};

var mockPost = function() {
    var obj = {
        id: "56812300887154364a163385",
        author: {
            id: "567b9a2e8871540f417329e4",
            username: "test",
            first_name: "Test",
            last_name: "Account",
            tagline: "my tag"
        },
        content: "new from test",
        created_at: "2015-12-28T11:54:40.008000",
        updated_at: null
    };
    return obj;
};

var mockSnackbar = {
    errorMessage: [],
    error: function(m){
        this.errorMessage.push(m)
    },
    show: function(m){
        console.log(m);
    }
};

var mockLocation = {
    _path: null,
    path: function(p){
        if(p) this._path = p;
        return this._path;
    },
    url: function(p){
        this._path = p
    }
};

/**
 * Mocking the Authentication service
 * @param auth the return value of isAuthenticted
 * @param cookies the cookies service to use
 * @returns {{isAuthenticated: obj.isAuthenticated, login: obj.login}}
 */
var mockAuthentication = function (auth) {
    var _user = null;
    var obj = {
        getAuthenticatedAccount: getAuthenticatedAccount,
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
        register: register,
        setAuthenticatedAccount: setAuthenticatedAccount,
        unauthenticate: unauthenticate,
        username: getUsername
    };
    return obj;
    ////////////////////
    function getUsername(){
        var user = getAuthenticatedAccount();
        if(user) return user.username;
        else return null;
    }
    function register(email, password, username) {
        login(email, password)
    }

    function login(email, password) {
        _user = new mockUser();
    }

    function logout() {
        _user = null;
    }

    function getAuthenticatedAccount() {
        return _user;
    }

    function isAuthenticated() {
        return auth;
    }

    function setAuthenticatedAccount(account) {
        _user = account;
    }

    function unauthenticate() {
        _user = null;
    }
};

var mockPosts = function () {
    var _posts = [new mockPost()];

    var obj = {
        all: all,
        create: create,
        get: get,
        update: update,
        delete: deletePost,
        getUserPosts: getUserPosts
    };

    return obj;

    ////////////////////

    function all() {
        var obj = {
            then: function(success, fail){
                success({data:_posts});
                return obj;
            },
            finally: function(f){
                return obj;
            }
        };
        return obj;
    }

    function create(content) {
        var obj = {
            then: function(success, fail){
                var p = {
                    id: 'someID',
                    author: new mockUser(),
                    content: content
                };
                _posts.push(p);
                success({data: p});
                return obj;
            }
        };
        return obj;
    }

    function get(id) {
        var obj = {
            then: function(success, fail){
                success({data:_posts[0]});
                return obj;
            }
        };
        return obj;
    }

    function update(id, content) {
        var obj = {
            then: function(success, fail){
                _posts[0].content = content;
                success({data: _posts[0]});
                return obj;
            }
        };
        return obj;
    }

    function deletePost(id) {
        var obj = {
            then: function(success, fail){
                _posts.shift();
                success({});
                return obj;
            }
        };
        return obj;
    }

    function getUserPosts(user_id) {
        var obj = {
            then: function(success, fail){
                success({data:_posts});
                return obj;
            }
        };
        return obj;
    }
};

var mockPostsError = function () {
    var _posts = [new mockPost()];

    var obj = {
        all: all,
        create: create,
        get: get,
        update: update,
        delete: deletePost,
        getUserPosts: getUserPosts
    };

    return obj;

    ////////////////////

    function all() {
        var obj = {
            then: function(success, fail){
                fail({data: {message: "Could not retrieve posts"}});
                return obj;
            },
            finally: function(f){
                return obj;
            }
        };
        return obj;
    }

    function create(content) {
        var obj = {
            then: function(success, fail){
                fail({data: {message: "Could not create post"}});
                return obj;
            }
        };
        return obj;
    }

    function get(id) {
        var obj = {
            then: function(success, fail){
                fail({data: {message: "Could not get post"}});
                return obj;
            }
        };
        return obj;
    }

    function update(id, content) {
        var obj = {
            then: function(success, fail){
                fail({data: {message: "Could not update post"}});
                return obj;
            }
        };
        return obj;
    }

    function deletePost(id) {
        var obj = {
            then: function(success, fail){
                fail({data: {message: "Could not delete post"}});
                return obj;
            }
        };
        return obj;
    }

    function getUserPosts(user_id) {
        var obj = {
            then: function(success, fail){
                fail({data: {message: "Could not get user's posts"}});
                return obj;
            }
        };
        return obj;
    }
};

var mockProfile = function () {

    var obj = {
        destroy: destroy,
        get: get,
        update: update
    };

    return obj;

    /////////////////////

    function destroy(username) {
        var obj = {
            then: function(success, fail){
                success({data: []});
                return obj;
            }
        };
        return obj;

    }

    function get(user_id) {
        var obj = {
            then: function(success, fail){
                success({data: new mockUser()});
                return obj;
            },
            finally: function(f){
                return obj;
            }
        };
        return obj;
    }

    function update(profile) {
        var obj = {
            then: function(success, fail){
                u = new mockUser();
                u.email = profile.email;
                u.username = profile.username;
                u.tagline = profile.tagline;
                success({data: u});
                return obj;
            }
        };
        return obj;
    }
};

var mockProfileError = function () {

    var obj = {
        destroy: destroy,
        get: get,
        update: update
    };

    return obj;

    /////////////////////

    function destroy(username) {
        var obj = {
            then: function(success, fail){
                fail({data: {message: 'Could not delete profile'}});
                return obj;
            }
        };
        return obj;

    }

    function get(user_id) {
        var obj = {
            then: function(success, fail){
                fail({data: {message: 'Could not get profile'}});
                return obj;
            },
            finally: function(f){
                return obj;
            }
        };
        return obj;
    }

    function update(profile) {
        var obj = {
            then: function(success, fail){
                fail({data: {message: 'Could not update profile'}});
                return obj;
            }
        };
        return obj;
    }
};

var mockNgDialog = function(){
    return {
        open: function(o){
            this.opened = o.resolve.postId();
        },
        opened: null
    }
};

var mockWindow = {
    confirm: function(msg) {
        return true;
    }
};

var mockTimeout = function(f, time, digest){
    f();
};