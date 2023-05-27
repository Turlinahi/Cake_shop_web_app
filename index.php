<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8">
        <meta name="viewpoint" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="bootstrap.css">
        <title>Login | Cris Cakes</title>
    </head>
    <body>
        <div class="app">
            <h1>CRIS CAKES</h1>
        </div>
         <div class="center">
      <h1>Login</h1>
      <?php if (isset($_GET['error'])) { ?>
     		<p class="error"><?php echo $_GET['error']; ?></p>
     	<?php } ?>
      <form action="log.php" method="post">
        <div class="txt_field">
         <input type="text" name="uname"><br>
          <span></span>
          <label>Username</label>
        </div>
        <div class="txt_field">
          <input type="password" name="password"><br>
          <span></span>
          <label>Password</label>
        </div>
        <button type="submit">Login</button>
        <div class="signup_link">
          Not a member? <a href="signup.php">Signup</a>
        </div>
      </form>
    </div>
    </body>
</html>