<?php
// Online onboarding kit submission → full signed kit emailed to the company.
require_once __DIR__ . '/_lib.php';

$data = clean(read_json_post());
if (empty($data['fullLegalName']) || empty($data['email']) || empty($data['signature'])) {
    respond(400, array('error' => 'Missing required fields'));
}

$html = email_shell('SIGNED Onboarding Kit Submission', rows_table($data));
send_html_mail(NOTIFY_EMAIL, '🚛 SIGNED Onboarding Kit, ' . $data['fullLegalName'], $html, $data['email']);

respond(200, array('ok' => true));
