<?php
// General contact message → saved to the admin inbox, then notifies the company.
require_once __DIR__ . '/_lib.php';

$data = clean(read_json_post());
if (empty($data['name']) || empty($data['email'])) {
    respond(400, array('error' => 'Missing required fields'));
}

// Save FIRST so the message is never lost, even if email fails.
$id = save_submission('contact', $data);

$html = email_shell('New Contact Message from the website', rows_table($data));
$sent = send_html_mail(fbl_setting('notifyEmail'), '🚛 New Contact Message, FBL website', $html, $data['email']);
update_submission($id, array('emailSent' => (bool)$sent));

respond(200, array('ok' => true, 'id' => $id));
