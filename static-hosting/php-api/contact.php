<?php
// General contact message → notifies the company.
require_once __DIR__ . '/_lib.php';

$data = clean(read_json_post());
if (empty($data['name']) || empty($data['email'])) {
    respond(400, array('error' => 'Missing required fields'));
}

$html = email_shell('New Contact Message from the website', rows_table($data));
send_html_mail(NOTIFY_EMAIL, '🚛 New Contact Message, FBL website', $html, $data['email']);

respond(200, array('ok' => true));
