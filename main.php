<?php 
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['user_name'])) {

 ?>

<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8">
        <meta name="viewpoint" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="bootstrap.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
        
        <title>Cris Cakes| Every bite a piece of heaven</title>
    </head>
    <body>
        <script type="text/javascript" src="file.js"></script>
        <div class="menu">
        <img src="img/logo.png" id="logo">
        </div>
        <div id="myNav" class="overlay">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <div class="overlay-content">
                 <a href="main.php">Home</a>
                <a href="about.php">About</a>
                <a href="services.php">Order</a>
                <a href="contact.php">Contact</a>
            </div>
        </div>
        <div class="menu">
        <span style="font-size:35px;float:left;cursor:pointer; margin-top:-17px;" onclick="openNav()">&#9776;</span>
        <h2 id="slogan1">CRIS CAKES</h2>
            <p id="user"><?php echo "Hello"." ".$_SESSION['name'];?></p>
            <div class="userImg">
                <a href="index.php"><img src="img/account.png"></a>
                <a href="logout.php" id="logout">Logout</a>
            </div>
        <br>
            <h6 id="slogan2">Every bite tastes like heaven</h6>
        </div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="page">
            <h2>HOME</h2>
        </div>
        <div class="slider">
            <div class="slides">
                <input type="radio" name="radio-btn" id="radio1">
                <input type="radio" name="radio-btn" id="radio2">
                <input type="radio" name="radio-btn" id="radio3">
                <div class="slide first">
                    <img src="img/1.png" alt="">
                </div>
                <div class="slide">
                    <img src="img/2.png" alt="">
                </div>
                <div class="slide">
                    <img src="img/3.png" alt="">
                </div>
                <div class="navigation-auto">
                    <div class="auto-btn1"></div>
                    <div class="auto-btn2"></div>
                    <div class="auto-btn3"></div>
                </div>
            </div>
            
            <div class="navigation-manual">
                <label for="radio1" class="manual-btn"></label>
                <label for="radio2" class="manual-btn"></label>
                <label for="radio3" class="manual-btn"></label>
            </div>
        </div>
    <script type="text/javascript">
    var counter = 1;
    setInterval(function(){
      document.getElementById('radio' + counter).checked = true;
      counter++;
      if(counter > 3){
        counter = 1;
      }
    }, 5000);
    </script>
        <div class="box1">
           
            <a href="Little-Cake-Adventure-master/launcher.html"><h3>Get your the memorable Cake</h3></a>
            <p>Exciting news for all baking lovers and aspiring cooking chefs – with Cris Cakes you can make your own cake. But first you have to get the ingredients. Play the game carefully and have fun serving yummy desserts!
            </p>
             <a href="Little-Cake-Adventure-master/launcher.html"><h2 >Click here and play!</h2>
        </div>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        
       
       <div class="footer-basic">
  <footer>
    <div class="social">
      <a href="#"><i class="icon ion-social-instagram"></i></a>
      <a href="#"><i class="icon ion-social-snapchat"></i></a>
      <a href="#"><i class="icon ion-social-twitter"></i></a>
      <a href="#"><i class="icon ion-social-facebook"></i></a>
    </div>
    <ul class="list-inline">
      <li class="list-inline-item"><a href="main.php">Home</a></li>
      <li class="list-inline-item"><a href="about.php">About</a></li>
      <li class="list-inline-item"><a href="services.php">Order</a></li>
      <li class="list-inline-item"><a href="contact.php">Contact</a></li>
    </ul>
  </footer>
</div>

       
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
    </body>
</html>

<?php 
}else{
     header("Location: index.php");
     exit();
}
 ?>