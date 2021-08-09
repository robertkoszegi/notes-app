
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
    },
    async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in with OAuth...
        try{
            let user = await User.findOne({googleId: profile.id});
            if (user) {
                return cb(null, user);
            } else {
                let newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.avatar,
                    googleId: profile.id
                });

                await newUser.save()
            }

        } catch (err) {
            cb(err);
        } 
        
        // serialize
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
    
        // deserialize
        passport.deserializeUser(function(id, done) {
            Student.findById(id, function(err, user) {
              done(err, user);
            });
        });
    }

));