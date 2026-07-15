<?php
// Shared helpers for the FBL form handlers.
require_once __DIR__ . '/config.php';

function respond($code, $data) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function read_json_post() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        http_response_code(204);
        exit;
    }
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        respond(405, array('error' => 'POST only'));
    }
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        respond(400, array('error' => 'Invalid JSON'));
    }
    // basic flood guard
    if (strlen($raw) > 200000) {
        respond(413, array('error' => 'Payload too large'));
    }
    return $data;
}

function clean($v) {
    if (is_array($v)) {
        $out = array();
        foreach ($v as $k => $vv) { $out[$k] = clean($vv); }
        return $out;
    }
    return htmlspecialchars(trim((string)$v), ENT_QUOTES, 'UTF-8');
}

function email_shell($title, $inner) {
    $name = COMPANY_NAME; $tag = COMPANY_TAGLINE; $addr = COMPANY_ADDRESS;
    $phone = COMPANY_PHONE; $email = COMPANY_EMAIL; $dot = COMPANY_USDOT; $mc = COMPANY_MC;
    return "
    <div style=\"margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;\">
      <div style=\"max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;\">
        <div style=\"background:#101c2e;padding:20px 28px;\">
          <span style=\"display:inline-block;background:#ed1d26;color:#fff;font-weight:800;font-size:22px;letter-spacing:1px;padding:6px 14px;border-radius:4px;\">FBL</span>
          <span style=\"color:#ffffff;font-weight:700;font-size:14px;letter-spacing:2px;margin-left:10px;\">$name</span>
        </div>
        <div style=\"height:4px;background:linear-gradient(90deg,#ed1d26,#ff4d54);\"></div>
        <div style=\"padding:28px;color:#1a2333;font-size:14px;line-height:1.7;\">
          <h1 style=\"font-size:20px;margin:0 0 16px;color:#101c2e;\">$title</h1>
          $inner
        </div>
        <div style=\"background:#101c2e;color:#94a3b8;padding:18px 28px;font-size:12px;line-height:1.6;\">
          <strong style=\"color:#ffffff;\">$name</strong>, &ldquo;$tag&rdquo;<br/>
          $addr<br/>
          $phone &middot; $email &middot; USDOT #$dot &middot; MC #$mc
        </div>
      </div>
    </div>";
}

function rows_table($data) {
    $rows = '';
    foreach ($data as $k => $v) {
        if ($v === '' || $v === null) continue;
        if (is_array($v)) $v = json_encode($v, JSON_PRETTY_PRINT);
        $label = ucwords(trim(preg_replace('/(?<Lower>[a-z])(?<Upper>[A-Z])/', '$1 $2', $k)));
        $v = nl2br((string)$v);
        $rows .= "<tr><td style=\"padding:6px 10px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:700;white-space:nowrap;\">$label</td><td style=\"padding:6px 10px;border:1px solid #e2e8f0;\">$v</td></tr>";
    }
    return "<table style=\"border-collapse:collapse;width:100%;font-size:13px;\">$rows</table>";
}

function send_html_mail($to, $subject, $html, $replyTo = '') {
    $from = FROM_NAME . ' <' . FROM_EMAIL . '>';
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: $from\r\n";
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: $replyTo\r\n";
    }
    return mail($to, $subject, $html, $headers);
}
