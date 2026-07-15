<?php
// Owner-operator application:
// 1) notifies the company with the application details
// 2) AUTOMATICALLY sends the applicant the official welcome letter
//    with the onboarding-kit link (same flow as the Next.js version).
require_once __DIR__ . '/_lib.php';

$data = clean(read_json_post());
if (empty($data['name']) || empty($data['email']) || empty($data['phone'])) {
    respond(400, array('error' => 'Missing required fields'));
}

// 1) internal notification
$notify = email_shell('New Owner-Operator Application from the website', rows_table($data));
send_html_mail(NOTIFY_EMAIL, '🚛 New Owner-Operator Application, FBL website', $notify, $data['email']);

// 2) automated welcome letter to the applicant
$parts = preg_split('/\s+/', trim($data['name']));
$firstName = $parts[0] ? $parts[0] : 'Owner-Operator';
$kitUrl = SITE_URL . '/owner-operators/#onboarding';
$pdfUrl = SITE_URL . '/documents/fbl-owner-operator-onboarding-kit.pdf';
$split = RATE_SPLIT; $days = RATE_SETTLEMENT_DAYS; $pool = RATE_POOL; $poolYears = RATE_POOL_YEARS;
$phone = COMPANY_PHONE; $owner = COMPANY_OWNER; $company = COMPANY_NAME;

$welcome = email_shell('Welcome to Fleet B Logistics!', "
  <p>Dear $firstName,</p>
  <p><strong>Welcome to Fleet B Logistics LLC!</strong> We are thrilled to partner with you as an independent
  contractor. Our mission is to support your business growth by providing consistent, high-paying freight,
  operational independence, and total back-office transparency.</p>
  <p>As a valued partner on our fleet, you can count on us to keep your wheels turning and your revenue growing.
  We take pride in our rapid payment structure, processing your settlements within
  <strong>$days business days</strong> of receiving your delivery paperwork, and you keep
  <strong>$split of gross freight revenue</strong> on every load.</p>
  <p>We are fully committed to long-term success together: we look forward to working with you toward your
  <strong>$poolYears-year milestone</strong>, where you will gain exclusive entry into our
  <strong>$pool monthly net revenue share pool</strong>.</p>

  <div style=\"background:#f8fafc;border:2px dashed #29689a;border-radius:8px;padding:18px 22px;margin:22px 0;\">
    <p style=\"margin:0 0 10px;font-weight:800;color:#101c2e;font-size:15px;\">📋 What happens next, your onboarding process:</p>
    <ol style=\"margin:0;padding-left:20px;\">
      <li><strong>Complete the Onboarding Kit</strong>, fill it out and sign online here:<br/>
        <a href=\"$kitUrl\" style=\"color:#ed1d26;font-weight:700;\">$kitUrl</a><br/>
        (or download the PDF: <a href=\"$pdfUrl\" style=\"color:#29689a;\">Owner-Operator Onboarding Kit</a>)</li>
      <li><strong>Gather your documents</strong>, CDL-A, DOT medical card, truck registration, Form 2290, annual inspection, and insurance certificate.</li>
      <li><strong>Schedule your truck inspection</strong> at our West Palm Beach HQ, call Safety at $phone at least 24 hours ahead.</li>
      <li><strong>First dispatch</strong>, once Safety clears your file, you're rolling.</li>
    </ol>
  </div>

  <p style=\"text-align:center;margin:26px 0;\">
    <a href=\"$kitUrl\" style=\"background:#ed1d26;color:#ffffff;font-weight:800;text-decoration:none;padding:14px 30px;border-radius:6px;display:inline-block;\">FILL OUT &amp; SIGN THE KIT ONLINE →</a>
  </p>

  <p>Welcome aboard, let's achieve massive success together!</p>
  <p>Sincerely,<br/><strong>$owner</strong><br/>Company Owner<br/>$company</p>
");
send_html_mail($data['email'], 'Welcome to Fleet B Logistics, Your Onboarding Kit Inside 🚛', $welcome);

respond(200, array('ok' => true));
