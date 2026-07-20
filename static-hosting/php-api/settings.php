<?php
// Public, read-only company settings for the live site.
// The static pages fetch this and swap in any values the owner
// changed from the /admin panel — no rebuild needed.
require_once __DIR__ . '/_lib.php';

header('Content-Type: application/json');
header('Cache-Control: no-store');

$s = fbl_settings();
echo json_encode(array(
    'phone' => $s['phone'],
    'phoneHref' => fbl_phone_href($s['phone']),
    'email' => $s['email'],
    'emailHref' => 'mailto:' . $s['email'],
    'address' => $s['address'],
    'hours' => $s['hours'],
));
