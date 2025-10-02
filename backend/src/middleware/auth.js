const LocalStrategy = require('passport-local').Strategy;

// --- FINAL VERIFICATION LOGS ---
// These lines will run as soon as the server starts.
console.log("\n--- Verifying .env variables loaded into auth.js ---");
console.log(`ADMIN_USER from process.env: "${process.env.ADMIN_USER}"`);
console.log(`ADMIN_PASS from process.env: "${process.env.ADMIN_PASS}"`);
console.log("---------------------------------------------------\n");
// --- END VERIFICATION ---


const configurePassport = (passport) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log(`--- Authentication Attempt ---`);
      console.log(`Username received from form: "${username}"`);
      console.log(`Password received from form: "${password}"`);
      
      const adminUser = process.env.ADMIN_USER;
      const adminPass = process.env.ADMIN_PASS;

      console.log(`Comparing with .env ADMIN_USER: "${adminUser}"`);
      
      if (username === adminUser && password === adminPass) {
        console.log('✅ SUCCESS: Credentials match.');
        return done(null, { username: adminUser });
      } else {
        console.log('❌ FAILURE: Credentials do not match.');
        return done(null, false, { message: 'Invalid credentials' });
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    if (username === process.env.ADMIN_USER) {
      done(null, { username: username });
    } else {
      done(new Error('User not found during deserialization.'));
    }
  });
};

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

module.exports = { configurePassport, ensureAuth };