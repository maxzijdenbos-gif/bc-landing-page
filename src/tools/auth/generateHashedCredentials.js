/* eslint-disable no-console */
import crypto from 'crypto';

async function generateCredentials(inputUsername, inputPassword) {
  // Use command line arguments or fallback to defaults
  const username = inputUsername;
  const password = inputPassword;

  if (!username || !password) {
    console.error('Usage: node generateHashedCredentials.js');
    console.error('Please provide both username and password.');
    console.error('npm run generate-hash -- <username> <password>');
    process.exit(1);
  }

  console.log('\nUsing credentials:');
  console.log('Username:', username);
  console.log('Password:', password.replace(/./g, '*'));

  try {
    // Create SHA-256 hashes
    const usernameHash = crypto
      .createHash('sha256')
      .update(username)
      .digest('base64');
    const passwordHash = crypto
      .createHash('sha256')
      .update(password)
      .digest('base64');

    console.log('\nGenerated hashes for .env.local:');
    console.log('----------------------------------------');
    console.log(`ACCESS_RESTRICTED_LOCALE_USERNAME_HASH=${usernameHash}`);
    console.log(`ACCESS_RESTRICTED_LOCALE_PASSWORD_HASH=${passwordHash}`);
    console.log('----------------------------------------');
  } catch (error) {
    console.error('Error generating hashes:', error);
    process.exit(1);
  }
}

// Get command line arguments
const [, , username, password] = process.argv;

// Execute with arguments
generateCredentials(username, password);
