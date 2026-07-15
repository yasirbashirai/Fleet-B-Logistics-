<?php
// ================================================================
// FLEET B LOGISTICS — form handler configuration
// ⭐ This is the ONLY file to edit on the server.
// ================================================================

// Where form submissions are delivered:
define('NOTIFY_EMAIL', 'fleetblogistics@gmail.com');

// The From address for outgoing mail.
// ⚠ IMPORTANT: on shared hosting (Hostinger/cPanel) this SHOULD be an
// email address on YOUR OWN DOMAIN (create it in the hosting panel),
// otherwise mail may land in spam or be rejected.
// Example: no-reply@fleetblogistics.com
define('FROM_EMAIL', 'no-reply@' . (isset($_SERVER['HTTP_HOST']) ? preg_replace('/^www\./', '', $_SERVER['HTTP_HOST']) : 'example.com'));
define('FROM_NAME', 'Fleet B Logistics');

// Company details used inside emails:
define('COMPANY_NAME', 'FLEET B LOGISTICS LLC');
define('COMPANY_TAGLINE', 'Honesty is what we stand on!');
define('COMPANY_PHONE', '+1 (561) 460-5739');
define('COMPANY_EMAIL', 'fleetblogistics@gmail.com');
define('COMPANY_ADDRESS', '730 Malibu Bay Dr, Apt 106, West Palm Beach, FL 33401');
define('COMPANY_USDOT', '4109105');
define('COMPANY_MC', '1569108');
define('COMPANY_OWNER', 'Bendy Jean Baptiste');

// Rates referenced in the welcome letter (mirror of src/lib/rates.ts):
define('RATE_SPLIT', '85.5%');
define('RATE_SETTLEMENT_DAYS', '4');
define('RATE_POOL', '20%');
define('RATE_POOL_YEARS', '5');

// Site URL used for links in emails (no trailing slash):
define('SITE_URL', 'https://' . (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'www.fleetblogistics.com'));
