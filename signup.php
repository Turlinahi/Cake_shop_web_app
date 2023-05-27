<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8">
        <meta name="viewpoint" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="bootstrap.css">
        <title>Sign Up | Cris Cakes</title>
    </head>
    <body>
        <div class="app">
            <h1>CRIS CAKES</h1>
        </div>
        
        <div class="center">
      <h1>Sign Up</h1>
            <?php if (isset($_GET['error'])) { ?>
     		<p class="error"><?php echo $_GET['error']; ?></p>
     	<?php } ?>
            
            <?php if (isset($_GET['success'])) { ?>
               <p class="success"><?php echo $_GET['success']; ?></p>
          <?php } ?>
      <form action="signup-check.php" method="post">
        <div class="txt_field">
          <?php if (isset($_GET['name'])) { ?>
               <input type="text" 
                      name="name" 
                      value="<?php echo $_GET['name']; ?>"><br>
          <?php }else{ ?>
               <input type="text" 
                      name="name"><br>
          <?php }?>
          <span></span>
          <label>Name</label>
        </div>
          <div class="txt_field">
          <?php if (isset($_GET['uname'])) { ?>
               <input type="text" name="uname" value="<?php echo $_GET['uname']; ?>"><br>
          <?php }else{ ?>
               <input type="text" name="uname" ><br>
          <?php }?>
          <span></span>
          <label>Username</label>
        </div>
        <div class="txt_field">
          <input type="password" name="password"><br>

          <span></span>
          <label>Password</label>
        </div>
          <div class="txt_field">
           <input type="password" name="re_password"><br>
          <span></span>
          <label>Re Password</label>
        </div>
          <button type="submit">Sign Up</button>
        <div class="signup_link">
          Already have an account? <a href="index.php">Log In</a>
        </div>
      </form>
    </div>
    </body>
</html>