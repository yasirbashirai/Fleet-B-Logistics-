<?php
// ================================================================
// FLEET B LOGISTICS — owner admin panel  (https://yourdomain.com/admin/)
// One page: form-submissions inbox + editable company settings.
// Password-protected; default password is in php-api/config.php.
// ================================================================
require_once __DIR__ . '/../php-api/_lib.php';

session_set_cookie_params(array(
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => !empty($_SERVER['HTTPS']),
));
session_start();

// ---------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------
function admin_hash() {
    $override = FBL_DATA_DIR . '/admin.json';
    if (file_exists($override)) {
        $j = json_decode(file_get_contents($override), true);
        if (!empty($j['passwordHash'])) return $j['passwordHash'];
    }
    return ADMIN_PASSWORD_HASH;
}

function lock_state() {
    $path = FBL_DATA_DIR . '/login-lock.json';
    $s = file_exists($path) ? json_decode(file_get_contents($path), true) : null;
    return is_array($s) ? $s : array('fails' => 0, 'until' => 0);
}

function save_lock($s) {
    fbl_data_dir();
    file_put_contents(FBL_DATA_DIR . '/login-lock.json', json_encode($s), LOCK_EX);
}

function csrf_token() {
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
    return $_SESSION['csrf'];
}

function check_csrf() {
    if (empty($_POST['csrf']) || !hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'])) {
        http_response_code(403);
        exit('Bad request, refresh the page and try again.');
    }
}

$authed = !empty($_SESSION['fbl_admin']);
$flash = '';
$error = '';

// ---------------------------------------------------------------
// Actions
// ---------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'login') {
        $lock = lock_state();
        if ($lock['until'] > time()) {
            $error = 'Too many failed attempts. Try again in ' . ceil(($lock['until'] - time()) / 60) . ' minutes.';
        } elseif (password_verify($_POST['password'] ?? '', admin_hash())) {
            session_regenerate_id(true);
            $_SESSION['fbl_admin'] = true;
            $authed = true;
            save_lock(array('fails' => 0, 'until' => 0));
        } else {
            $lock['fails']++;
            if ($lock['fails'] >= 8) { $lock['until'] = time() + 15 * 60; $lock['fails'] = 0; }
            save_lock($lock);
            $error = 'Wrong password.';
        }
    } elseif ($authed) {
        check_csrf();
        if ($action === 'logout') {
            session_destroy();
            header('Location: ./'); exit;
        } elseif ($action === 'save_settings') {
            $s = array(
                'phone' => trim($_POST['phone'] ?? ''),
                'email' => trim($_POST['email'] ?? ''),
                'address' => trim($_POST['address'] ?? ''),
                'hours' => trim($_POST['hours'] ?? ''),
                'notifyEmail' => trim($_POST['notifyEmail'] ?? ''),
            );
            if ($s['email'] !== '' && !filter_var($s['email'], FILTER_VALIDATE_EMAIL)) {
                $error = 'The public email address is not valid.';
            } elseif ($s['notifyEmail'] !== '' && !filter_var($s['notifyEmail'], FILTER_VALIDATE_EMAIL)) {
                $error = 'The notification email address is not valid.';
            } else {
                save_fbl_settings($s);
                $flash = 'Settings saved. The live website updates immediately.';
            }
        } elseif ($action === 'change_password') {
            $new = $_POST['newPassword'] ?? '';
            if (strlen($new) < 8) {
                $error = 'New password must be at least 8 characters.';
            } elseif ($new !== ($_POST['confirmPassword'] ?? '')) {
                $error = 'Passwords do not match.';
            } else {
                fbl_data_dir();
                file_put_contents(FBL_DATA_DIR . '/admin.json',
                    json_encode(array('passwordHash' => password_hash($new, PASSWORD_BCRYPT))), LOCK_EX);
                $flash = 'Password changed.';
            }
        } elseif ($action === 'delete_submission') {
            $path = fbl_data_dir('submissions') . '/' . basename($_POST['id'] ?? '') . '.json';
            if (file_exists($path)) { unlink($path); $flash = 'Submission deleted.'; }
        } elseif ($action === 'mark_all_read') {
            foreach (glob(fbl_data_dir('submissions') . '/*.json') as $f) {
                $rec = json_decode(file_get_contents($f), true);
                if (is_array($rec) && empty($rec['seen'])) {
                    $rec['seen'] = true;
                    file_put_contents($f, json_encode($rec, JSON_PRETTY_PRINT), LOCK_EX);
                }
            }
            $flash = 'All submissions marked as read.';
        }
    }
}

// ---------------------------------------------------------------
// Data for rendering
// ---------------------------------------------------------------
$tab = $_GET['tab'] ?? 'inbox';
$openId = $_GET['open'] ?? '';
$submissions = array();
$unseen = 0;

if ($authed) {
    foreach (glob(fbl_data_dir('submissions') . '/*.json') as $f) {
        $rec = json_decode(file_get_contents($f), true);
        if (!is_array($rec)) continue;
        // Opening a submission marks it as read.
        if ($openId !== '' && $rec['id'] === $openId && empty($rec['seen'])) {
            $rec['seen'] = true;
            file_put_contents($f, json_encode($rec, JSON_PRETTY_PRINT), LOCK_EX);
        }
        if (empty($rec['seen'])) $unseen++;
        $submissions[] = $rec;
    }
    usort($submissions, function ($a, $b) {
        return strcmp($b['receivedAt'] ?? '', $a['receivedAt'] ?? '');
    });
    $settings = fbl_settings();
}

$typeMeta = array(
    'contact' => array('label' => 'Contact Message', 'color' => '#29689a'),
    'apply' => array('label' => 'Driver Application', 'color' => '#ed1d26'),
    'onboarding' => array('label' => 'SIGNED Onboarding Kit', 'color' => '#101c2e'),
);

function h($v) { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }

function pretty_label($k) {
    return ucwords(trim(preg_replace('/(?<=[a-z])(?=[A-Z])/', ' ', $k)));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>FBL Admin — Fleet B Logistics</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif; background: #f1f5f9; color: #1a2333; }
  a { color: #29689a; }
  .top { background: #101c2e; color: #fff; padding: 14px 20px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .logo { background: #ed1d26; color: #fff; font-weight: 800; font-size: 18px; letter-spacing: 1px; padding: 4px 10px; border-radius: 4px; }
  .top h1 { font-size: 15px; letter-spacing: 1.5px; font-weight: 700; flex: 1; min-width: 160px; }
  .top form { margin-left: auto; }
  .wrap { max-width: 860px; margin: 24px auto; padding: 0 16px; }
  .tabs { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
  .tabs a { text-decoration: none; font-weight: 700; font-size: 14px; padding: 10px 18px; border-radius: 6px; background: #fff; color: #101c2e; border: 1px solid #e2e8f0; }
  .tabs a.active { background: #101c2e; color: #fff; border-color: #101c2e; }
  .badge { display: inline-block; min-width: 20px; text-align: center; background: #ed1d26; color: #fff; border-radius: 999px; font-size: 12px; padding: 1px 6px; margin-left: 6px; }
  .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
  .flash { background: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 600; }
  .error { background: #fef2f2; border: 1px solid #ed1d26; color: #991b1b; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 600; }
  .sub-row { display: block; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; background: #fff; }
  .sub-row:hover { border-color: #29689a; }
  .sub-link { display: block; text-decoration: none; color: inherit; }
  .sub-row.unseen { border-left: 4px solid #ed1d26; background: #fffbfb; }
  .sub-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .pill { color: #fff; font-size: 11px; font-weight: 800; letter-spacing: .5px; padding: 3px 9px; border-radius: 999px; text-transform: uppercase; }
  .sub-name { font-weight: 800; font-size: 15px; color: #101c2e; }
  .sub-date { margin-left: auto; color: #64748b; font-size: 12px; white-space: nowrap; }
  .sub-meta { color: #475569; font-size: 13px; margin-top: 4px; }
  .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #ed1d26; }
  table.detail { border-collapse: collapse; width: 100%; font-size: 13px; margin-top: 12px; }
  table.detail td { border: 1px solid #e2e8f0; padding: 6px 10px; vertical-align: top; }
  table.detail td:first-child { background: #f8fafc; font-weight: 700; white-space: nowrap; }
  label { display: block; font-weight: 700; font-size: 13px; margin: 14px 0 4px; color: #101c2e; }
  input[type=text], input[type=email], input[type=password] { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }
  .hint { color: #64748b; font-size: 12px; margin-top: 3px; }
  .btn { display: inline-block; background: #ed1d26; color: #fff; font-weight: 800; font-size: 14px; border: 0; border-radius: 6px; padding: 11px 22px; cursor: pointer; margin-top: 16px; }
  .btn.secondary { background: #29689a; }
  .btn.ghost { background: #fff; color: #64748b; border: 1px solid #cbd5e1; font-weight: 600; padding: 7px 14px; margin-top: 0; font-size: 12px; }
  .actions { display: flex; gap: 10px; align-items: center; margin: 4px 0 14px; flex-wrap: wrap; }
  .empty { text-align: center; color: #64748b; padding: 40px 10px; }
  h2 { font-size: 17px; color: #101c2e; margin-bottom: 6px; }
  .note { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; font-size: 13px; padding: 10px 14px; border-radius: 6px; margin-top: 8px; line-height: 1.5; }
  .login-box { max-width: 380px; margin: 60px auto; }
</style>
</head>
<body>
<div class="top">
  <span class="logo">FBL</span>
  <h1>FLEET B LOGISTICS — ADMIN</h1>
  <?php if ($authed): ?>
  <form method="post">
    <input type="hidden" name="action" value="logout">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <button class="btn ghost" type="submit">Log out</button>
  </form>
  <?php endif; ?>
</div>

<?php if (!$authed): ?>
<div class="login-box">
  <div class="card">
    <h2>Owner Login</h2>
    <p class="hint">Enter the admin password to view form submissions and update company info.</p>
    <?php if ($error): ?><div class="error" style="margin-top:12px;"><?= h($error) ?></div><?php endif; ?>
    <form method="post">
      <input type="hidden" name="action" value="login">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" autofocus autocomplete="current-password">
      <button class="btn" type="submit">Log in</button>
    </form>
  </div>
</div>

<?php else: ?>
<div class="wrap">
  <?php if ($flash): ?><div class="flash"><?= h($flash) ?></div><?php endif; ?>
  <?php if ($error): ?><div class="error"><?= h($error) ?></div><?php endif; ?>

  <div class="tabs">
    <a href="./?tab=inbox" class="<?= $tab === 'inbox' ? 'active' : '' ?>">📥 Submissions<?php if ($unseen): ?><span class="badge"><?= $unseen ?></span><?php endif; ?></a>
    <a href="./?tab=settings" class="<?= $tab === 'settings' ? 'active' : '' ?>">⚙️ Company Info</a>
  </div>

  <?php if ($tab === 'settings'): ?>

  <div class="card">
    <h2>Company Info shown on the website</h2>
    <p class="hint">Change a value and hit Save, the live website, forms, and outgoing emails update immediately. No developer needed.</p>
    <form method="post">
      <input type="hidden" name="action" value="save_settings">
      <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
      <label for="phone">Phone number</label>
      <input type="text" id="phone" name="phone" value="<?= h($settings['phone']) ?>">
      <label for="email">Public email (shown on the website)</label>
      <input type="email" id="email" name="email" value="<?= h($settings['email']) ?>">
      <label for="address">Company address</label>
      <input type="text" id="address" name="address" value="<?= h($settings['address']) ?>">
      <label for="hours">Business hours line</label>
      <input type="text" id="hours" name="hours" value="<?= h($settings['hours']) ?>">
      <label for="notifyEmail">Where form submissions are emailed</label>
      <input type="email" id="notifyEmail" name="notifyEmail" value="<?= h($settings['notifyEmail']) ?>">
      <div class="hint">Every contact message, application, and signed kit is emailed here, and always saved in the Submissions tab either way.</div>
      <button class="btn" type="submit">Save Changes</button>
    </form>
  </div>

  <div class="card">
    <h2>Change admin password</h2>
    <form method="post">
      <input type="hidden" name="action" value="change_password">
      <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
      <label for="newPassword">New password (min 8 characters)</label>
      <input type="password" id="newPassword" name="newPassword" autocomplete="new-password">
      <label for="confirmPassword">Confirm new password</label>
      <input type="password" id="confirmPassword" name="confirmPassword" autocomplete="new-password">
      <button class="btn secondary" type="submit">Change Password</button>
    </form>
  </div>

  <?php else: ?>

  <div class="actions">
    <strong><?= count($submissions) ?></strong>&nbsp;total submissions
    <?php if ($unseen): ?>
    <form method="post">
      <input type="hidden" name="action" value="mark_all_read">
      <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
      <button class="btn ghost" type="submit">Mark all as read</button>
    </form>
    <?php endif; ?>
  </div>

  <?php if (!$submissions): ?>
  <div class="card empty">
    No submissions yet.<br>
    Contact messages, driver applications, and signed onboarding kits from the website will appear here.
  </div>
  <?php endif; ?>

  <?php foreach ($submissions as $rec):
      $meta = $typeMeta[$rec['type']] ?? array('label' => $rec['type'], 'color' => '#64748b');
      $d = $rec['data'];
      $who = $d['name'] ?? $d['fullLegalName'] ?? '(no name)';
      $isOpen = ($rec['id'] === $openId);
      $when = date('M j, Y g:i A', strtotime($rec['receivedAt']));
  ?>
  <div class="sub-row <?= empty($rec['seen']) ? 'unseen' : '' ?>">
    <a class="sub-link" href="./?tab=inbox&amp;open=<?= $isOpen ? '' : h(rawurlencode($rec['id'])) ?>">
      <div class="sub-head">
        <?php if (empty($rec['seen'])): ?><span class="dot"></span><?php endif; ?>
        <span class="pill" style="background:<?= h($meta['color']) ?>;"><?= h($meta['label']) ?></span>
        <span class="sub-name"><?= h($who) ?></span>
        <span class="sub-date"><?= h($when) ?></span>
      </div>
      <div class="sub-meta">
        <?= h($d['email'] ?? '') ?><?= !empty($d['phone']) ? ' · ' . h($d['phone']) : '' ?>
        <?php if (empty($rec['emailSent'])): ?> · <span style="color:#b45309;">⚠ email notification did not send, view details here</span><?php endif; ?>
      </div>
    </a>
    <?php if ($isOpen): ?>
    <table class="detail">
      <?php foreach ($d as $k => $v):
          if ($v === '' || $v === null) continue;
          if (is_array($v)) $v = json_encode($v, JSON_PRETTY_PRINT);
      ?>
      <tr><td><?= h(pretty_label($k)) ?></td><td><?= nl2br(h($v)) ?></td></tr>
      <?php endforeach; ?>
    </table>
    <form method="post" style="margin-top:12px;" onsubmit="return confirm('Delete this submission permanently?');">
      <input type="hidden" name="action" value="delete_submission">
      <input type="hidden" name="id" value="<?= h($rec['id']) ?>">
      <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
      <button class="btn ghost" type="submit" style="color:#ed1d26;border-color:#ed1d26;">Delete</button>
    </form>
    <?php endif; ?>
  </div>
  <?php endforeach; ?>

  <?php endif; ?>
</div>
<?php endif; ?>
</body>
</html>
