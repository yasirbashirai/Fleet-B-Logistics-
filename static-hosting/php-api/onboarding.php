<?php
// Online onboarding kit submission → saved to the admin inbox,
// then the full signed kit is emailed to the company.
require_once __DIR__ . '/_lib.php';

$data = clean(read_json_post());
if (empty($data['fullLegalName']) || empty($data['email']) || empty($data['signature'])) {
    respond(400, array('error' => 'Missing required fields'));
}

// Save FIRST so the signed kit is never lost, even if email fails.
$id = save_submission('onboarding', $data);

$html = email_shell('SIGNED Onboarding Kit Submission', rows_table($data));
$sent = send_html_mail(fbl_setting('notifyEmail'), '🚛 SIGNED Onboarding Kit, ' . $data['fullLegalName'], $html, $data['email']);
update_submission($id, array('emailSent' => (bool)$sent));

respond(200, array('ok' => true, 'id' => $id));
